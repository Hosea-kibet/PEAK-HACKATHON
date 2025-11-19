'use client';

import React from 'react';
import Papa from 'papaparse';
import { CSVRowData } from '@/types';
import { validateAndFormatPhone } from '@/lib/phoneUtils';
import FileUpload from '@/components/FileUpload';
import StatsDashboard from '@/components/StatsDashboard';
import DataTable from '@/components/DataTable';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Download, RefreshCw, Trash2, Wand2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface ValidationState {
  rowId: string;
  columnName: string;
  validationResult: ReturnType<typeof validateAndFormatPhone>;
}

export default function Home() {
  const [file, setFile] = React.useState<File | null>(null);
  const [fileName, setFileName] = React.useState<string>('');
  const [headers, setHeaders] = React.useState<string[]>([]);
  const [rows, setRows] = React.useState<CSVRowData[]>([]);
  const [validations, setValidations] = React.useState<ValidationState[]>([]);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [isCleaning, setIsCleaning] = React.useState(false);
  const [isLoadingData, setIsLoadingData] = React.useState(false);
  const [uploadComplete, setUploadComplete] = React.useState(false);
  const [uploadResults, setUploadResults] = React.useState<{ saved: number; duplicates: number; duplicatePhones?: string[] } | null>(null);
  const [phoneColumn, setPhoneColumn] = React.useState<string>('');
  const [duplicateIds, setDuplicateIds] = React.useState<Set<string>>(new Set());
  const [sortColumn, setSortColumn] = React.useState<string | null>(null);
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');
  const [balanceInfo, setBalanceInfo] = React.useState<{ availableUnits: number; requiredUnits: number; isInsufficient: boolean } | null>(null);
  const [isCheckingBalance, setIsCheckingBalance] = React.useState(false);
  const [uncleanedFiles, setUncleanedFiles] = React.useState<Array<{ fileName: string; uncleanedCount: number; uploadedAt: string }>>([]);
  const [showUncleanedRecords, setShowUncleanedRecords] = React.useState(false);
  const [availableFiles, setAvailableFiles] = React.useState<Array<{ fileName: string; recordCount: number; uploadedAt: string }>>([]);
  const [recordFilter, setRecordFilter] = React.useState<'all' | 'valid' | 'invalid' | 'duplicates'>('all');
  const [invalidSubFilter, setInvalidSubFilter] = React.useState<'all' | 'invalid_chars' | 'too_short' | 'too_long' | 'other'>('all');
  const [selectedRows, setSelectedRows] = React.useState<Set<string>>(new Set());

  // Validate all phone numbers
  const validateAllPhones = (dataRows: CSVRowData[], column: string) => {
    const results: ValidationState[] = dataRows.map((row) => ({
      rowId: row.id,
      columnName: column,
      validationResult: validateAndFormatPhone(row[column] || ''),
    }));
    setValidations(results);
  };

  // Check balance
  const checkBalance = async (recordCount: number) => {
    setIsCheckingBalance(true);
    try {
      const response = await fetch('/api/balance');
      const data = await response.json();
      setBalanceInfo({
        availableUnits: data.availableUnits || 0,
        requiredUnits: recordCount,
        isInsufficient: (data.availableUnits || 0) < recordCount,
      });
    } catch (error) {
      console.error('Failed to check balance:', error);
    }
    setIsCheckingBalance(false);
  };

  // Detect duplicates
  const detectDuplicates = (dataRows: CSVRowData[], column: string) => {
    const phoneMap = new Map<string, string[]>();
    
    dataRows.forEach((row) => {
      const phone = row[column]?.toString().trim() || '';
      if (phone) {
        const cleaned = phone.replace(/\D/g, '');
        if (!phoneMap.has(cleaned)) {
          phoneMap.set(cleaned, []);
        }
        phoneMap.get(cleaned)!.push(row.id);
      }
    });
    
    const duplicateRowIds = new Set<string>();
    phoneMap.forEach((rowIds) => {
      if (rowIds.length > 1) {
        rowIds.forEach(id => duplicateRowIds.add(id));
      }
    });
    
    setDuplicateIds(duplicateRowIds);
  };

  // Fetch uncleaned records from database
  const fetchUncleanedRecords = async () => {
    try {
      const response = await fetch('/api/upload');
      if (response.ok) {
        const data = await response.json();
        setUncleanedFiles(data.files || []);
        console.log(`Database Stats:
- Total Raw Records: ${data.totalRaw}
- Total Cleaned: ${data.totalCleaned}
- Uncleaned Records: ${data.totalUncleaned}
        `);
      }
    } catch (error) {
      console.error('Error fetching uncleaned records:', error);
    }
  };

  // Fetch available files from database
  const fetchAvailableFiles = async () => {
    try {
      const response = await fetch('/api/files');
      if (response.ok) {
        const data = await response.json();
        setAvailableFiles(data.files || []);
      }
    } catch (error) {
      console.error('Error fetching available files:', error);
    }
  };

  // Load file data from database
  const loadFileFromDatabase = async (name: string) => {
    setIsLoadingData(true);
    try {
      const response = await fetch(`/api/files?fileName=${encodeURIComponent(name)}`);
      if (response.ok) {
        const data = await response.json();
        const records = data.records || [];
        
        if (records.length > 0) {
          const cols = Object.keys(records[0]).filter(k => k !== 'id');
          setHeaders(cols);
          
          // Auto-detect phone column
          const phoneCol = cols.find(col => 
            col.toLowerCase().includes('phone') || 
            col.toLowerCase().includes('mobile') ||
            col.toLowerCase().includes('number')
          ) || cols[0];
          
          setPhoneColumn(phoneCol);
          setFileName(name);
          setRows(records);
          validateAllPhones(records, phoneCol);
          detectDuplicates(records, phoneCol);
          checkBalance(records.length);
        }
      }
    } catch (error) {
      console.error('Error loading file from database:', error);
      alert('Failed to load file from database');
    } finally {
      setIsLoadingData(false);
    }
  };

  // Load uncleaned records and available files on mount
  React.useEffect(() => {
    fetchUncleanedRecords();
    fetchAvailableFiles();
  }, []);

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    setFileName(selectedFile.name);
    setIsProcessing(true);

    Papa.parse(selectedFile, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data as Record<string, string>[];
        
        if (data.length > 0) {
          const cols = Object.keys(data[0]);
          setHeaders(cols);
          
          // Auto-detect phone column
          const phoneCol = cols.find(col => 
            col.toLowerCase().includes('phone') || 
            col.toLowerCase().includes('mobile') ||
            col.toLowerCase().includes('number')
          ) || cols[0];
          
          setPhoneColumn(phoneCol);
          
          // Normalize data: convert scientific notation to normal numbers
          const normalizedData = data.map(row => {
            const normalizedRow: Record<string, string> = {};
            for (const [key, value] of Object.entries(row)) {
              // Convert scientific notation if present
              if (typeof value === 'string' && /^\d+\.?\d*[eE][+\-]?\d+$/.test(value.trim())) {
                try {
                  const num = parseFloat(value);
                  normalizedRow[key] = num.toFixed(0);
                } catch {
                  normalizedRow[key] = value;
                }
              } else {
                normalizedRow[key] = value;
              }
            }
            return normalizedRow;
          });
          
          // Create rows with IDs
          const rowsWithIds: CSVRowData[] = normalizedData.map((row, index) => ({
            ...row,
            id: `row-${index}`,
          }));
          
          setRows(rowsWithIds);
          validateAllPhones(rowsWithIds, phoneCol);
          detectDuplicates(rowsWithIds, phoneCol);
          checkBalance(rowsWithIds.length);
          
          // Save normalized data to database
          saveRawData(selectedFile.name, normalizedData);
        }
        
        setIsProcessing(false);
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
        setIsProcessing(false);
        alert('Error parsing CSV file. Please check the file format.');
      },
    });
  };

  // Save raw data to database
  const saveRawData = async (name: string, data: Record<string, string>[]) => {
    setIsUploading(true);
    setUploadComplete(false);
    setUploadResults(null);
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: name,
          rows: data,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Store upload results
        setUploadResults({
          saved: result.saved,
          duplicates: result.duplicates,
          duplicatePhones: result.duplicatePhones,
        });
        console.log(`${result.saved} new records saved, ${result.duplicates} duplicates skipped`);
        // Refresh uncleaned records list
        fetchUncleanedRecords();
      } else if (response.status === 409) {
        // All duplicates
        setUploadResults({
          saved: 0,
          duplicates: result.duplicates,
          duplicatePhones: result.duplicatePhones,
        });
        console.warn('All records are duplicates:', result);
      } else {
        console.error('Failed to save raw data:', result);
        setUploadResults({
          saved: 0,
          duplicates: 0,
        });
      }
    } catch (error) {
      console.error('Error saving raw data:', error);
      setUploadResults({
        saved: 0,
        duplicates: 0,
      });
    } finally {
      setIsUploading(false);
      setUploadComplete(true);
    }
  };

  // Handle cell update
  const handleUpdateCell = (rowId: string, column: string, value: string) => {
    const updatedRows = rows.map(row =>
      row.id === rowId ? { ...row, [column]: value } : row
    );
    setRows(updatedRows);
    
    if (column === phoneColumn) {
      validateAllPhones(updatedRows, phoneColumn);
      detectDuplicates(updatedRows, phoneColumn);
    }
  };

  // Handle row deletion
  const handleDeleteRow = (rowId: string) => {
    const updatedRows = rows.filter(row => row.id !== rowId);
    setRows(updatedRows);
    validateAllPhones(updatedRows, phoneColumn);
    detectDuplicates(updatedRows, phoneColumn);
  };

  // Auto-fix phone number
  const handleAutoFix = (rowId: string, column: string) => {
    const row = rows.find(r => r.id === rowId);
    if (!row) return;
    
    const validation = validations.find(v => v.rowId === rowId && v.columnName === column);
    if (validation && !validation.validationResult.isValid) {
      // Only auto-fix if the validation result has a valid formatted version
      // This means the validation already determined it CAN be auto-fixed
      if (validation.validationResult.formatted) {
        handleUpdateCell(rowId, column, validation.validationResult.formatted);
      } else {
        // No valid formatted version means it needs manual cleaning
        alert('This number cannot be auto-fixed. Please edit manually.');
      }
    }
  };

  // Auto-fix all invalid numbers
  const handleAutoFixAll = () => {
    const updatedRows = rows.map(row => {
      const validation = validations.find(v => v.rowId === row.id && v.columnName === phoneColumn);
      if (validation && !validation.validationResult.isValid) {
        const phone = row[phoneColumn]?.toString() || '';
        let fixed = phone.replace(/\D/g, '');
        
        if (fixed.startsWith('0')) {
          fixed = '254' + fixed.substring(1);
        } else if (!fixed.startsWith('254')) {
          fixed = '254' + fixed;
        }
        
        if (fixed.length === 12) {
          return { ...row, [phoneColumn]: '+' + fixed };
        }
      }
      return row;
    });
    
    setRows(updatedRows);
    validateAllPhones(updatedRows, phoneColumn);
    detectDuplicates(updatedRows, phoneColumn);
  };

  // Handle row selection
  const handleSelectRow = (rowId: string) => {
    const newSelection = new Set(selectedRows);
    if (newSelection.has(rowId)) {
      newSelection.delete(rowId);
    } else {
      newSelection.add(rowId);
    }
    setSelectedRows(newSelection);
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedRows.size === filteredRows.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(filteredRows.map(r => r.id)));
    }
  };

  // Batch delete selected duplicates
  const handleBatchDelete = () => {
    const selectedDuplicates = Array.from(selectedRows).filter(rowId => duplicateIds.has(rowId));
    
    if (selectedDuplicates.length === 0) {
      toast.error('No duplicate records selected');
      return;
    }

    if (!confirm(`Delete ${selectedDuplicates.length} duplicate record(s)?`)) {
      return;
    }

    const updatedRows = rows.filter(row => !selectedDuplicates.includes(row.id));
    setRows(updatedRows);
    validateAllPhones(updatedRows, phoneColumn);
    detectDuplicates(updatedRows, phoneColumn);
    setSelectedRows(new Set());
    
    toast.success(`Deleted ${selectedDuplicates.length} duplicate record(s)`, {
    });
  };

  // Batch submit valid records to API
  const handleBatchSubmit = async () => {
    const selectedValid = Array.from(selectedRows).filter(rowId => {
      const validation = validations.find(v => v.rowId === rowId && v.columnName === phoneColumn);
      return validation && validation.validationResult.isValid;
    });

    if (selectedValid.length === 0) {
      toast.error('No valid records selected');
      return;
    }

    // Show loading toast
    const loadingToast = toast.loading(`Submitting ${selectedValid.length} records to PEAK...`);

    try {
      const validRecords = selectedValid.map(rowId => rows.find(r => r.id === rowId)).filter(Boolean);

      // Mock API call - simulate submission delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful response
      const mockSuccess = true;

      if (mockSuccess) {
        // Dismiss loading toast
        toast.dismiss(loadingToast);
        
        // Show success toast
        toast.success(`Clean records submitted to PEAK HURRAY! ${validRecords.length} records sent successfully!`, {
          duration: 5000,
          style: {
            background: '#10b981',
            color: '#fff',
            fontWeight: 'bold',
          },
        });
        
        setSelectedRows(new Set());
      } else {
        toast.dismiss(loadingToast);
        toast.error('Submission failed - please try again');
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.dismiss(loadingToast);
      toast.error('Failed to submit data - network error');
    }
  };

  // Remove duplicates
  const handleRemoveDuplicates = () => {
    const seen = new Set<string>();
    const uniqueRows: CSVRowData[] = [];
    
    rows.forEach(row => {
      const phone = row[phoneColumn]?.toString().replace(/\D/g, '') || '';
      if (!seen.has(phone)) {
        seen.add(phone);
        uniqueRows.push(row);
      }
    });
    
    setRows(uniqueRows);
    validateAllPhones(uniqueRows, phoneColumn);
    detectDuplicates(uniqueRows, phoneColumn);
  };

  // Remove invalid rows
  const handleRemoveInvalid = () => {
    const validRows = rows.filter(row => {
      const validation = validations.find(v => v.rowId === row.id && v.columnName === phoneColumn);
      return validation && validation.validationResult.isValid;
    });
    
    setRows(validRows);
    validateAllPhones(validRows, phoneColumn);
    detectDuplicates(validRows, phoneColumn);
  };

  // Clean individual record (save to database)
  const handleCleanRecord = async (rowId: string) => {
    const row = rows.find(r => r.id === rowId);
    if (!row) return;

    const phoneValidation = validations.find(v => v.rowId === rowId && v.columnName === phoneColumn);
    if (!phoneValidation) return;

    // Check if the number is valid before attempting to clean
    const isValid = phoneValidation.validationResult.isValid;
    
    if (!isValid) {
      // If invalid, don't save to DB - flag for manual cleaning
      alert('This number is invalid and cannot be auto-cleaned.\n\nPlease edit it manually or fix the issues first.\n\nError: ' + phoneValidation.validationResult.errors.join(', '));
      return;
    }

    setIsCleaning(true);
    try {
      // Use formatted value (only valid numbers reach here)
      const cleanedPhoneValue = phoneValidation.validationResult.formatted;

      // Try to save to database
      const response = await fetch('/api/clean', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName,
          originalPhone: row[phoneColumn],
          cleanedPhone: cleanedPhoneValue,
          isValid: true, // Only valid numbers are saved
          errorMessage: '',
          rowData: row,
        }),
      });

      if (response.ok || response.status === 409) {
        // If valid, update the phone number in the row and keep it in the table
        const updatedRows = rows.map(r => {
          if (r.id === rowId) {
            return { ...r, [phoneColumn]: cleanedPhoneValue };
          }
          return r;
        });
        setRows(updatedRows);

        // Update the validation to mark it as valid (already valid, just confirm)
        const updatedValidations = validations.map(v => {
          if (v.rowId === rowId && v.columnName === phoneColumn) {
            return {
              ...v,
              validationResult: {
                ...v.validationResult,
                isValid: true,
                formatted: cleanedPhoneValue,
                errors: [],
                errorType: 'VALID' as const,
              }
            };
          }
          return v;
        });
        setValidations(updatedValidations);

        // Remove from duplicates if present
        const updatedDuplicates = new Set(duplicateIds);
        updatedDuplicates.delete(rowId);
        setDuplicateIds(updatedDuplicates);

        // Update balance
        checkBalance(updatedRows.length);
        
        // Refresh uncleaned records list
        fetchUncleanedRecords();

        // Show appropriate message
        if (response.status === 409) {
          alert('Record already in database but updated in table. Now showing in Valid records.');
        } else {
          alert('Record cleaned and saved! Now showing in Valid records.');
        }
      } else {
        alert('Failed to save to database');
      }
    } catch (error) {
      console.error('Error cleaning record:', error);
      alert('Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsCleaning(false);
    }
  };

  // Handle sorting
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
    
    const sorted = [...rows].sort((a, b) => {
      const aVal = a[column]?.toString() || '';
      const bVal = b[column]?.toString() || '';
      
      const numA = parseFloat(aVal);
      const numB = parseFloat(bVal);
      
      if (!isNaN(numA) && !isNaN(numB)) {
        return sortDirection === 'asc' ? numA - numB : numB - numA;
      }
      
      return sortDirection === 'asc' 
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    });
    
    setRows(sorted);
  };



  // Reset
  const handleReset = () => {
    setFile(null);
    setHeaders([]);
    setRows([]);
    setValidations([]);
    setDuplicateIds(new Set());
    setSortColumn(null);
    setSortDirection('asc');
  };

  // Calculate stats
  const totalRecords = rows.length;
  const validCount = validations.filter(v => v.validationResult.isValid).length;
  const invalidCount = validations.filter(v => !v.validationResult.isValid).length;
  const duplicateCount = duplicateIds.size;

  // Filter rows based on selected filter
  const filteredRows = React.useMemo(() => {
    let filtered = rows;
    
    switch (recordFilter) {
      case 'valid':
        filtered = rows.filter(row => {
          const validation = validations.find(v => v.rowId === row.id && v.columnName === phoneColumn);
          return validation && validation.validationResult.isValid;
        });
        break;
      case 'invalid':
        filtered = rows.filter(row => {
          const validation = validations.find(v => v.rowId === row.id && v.columnName === phoneColumn);
          return validation && !validation.validationResult.isValid;
        });
        
        // Apply sub-filter for invalid records
        if (invalidSubFilter !== 'all') {
          filtered = filtered.filter(row => {
            const validation = validations.find(v => v.rowId === row.id && v.columnName === phoneColumn);
            if (!validation) return false;
            
            const errorType = validation.validationResult.errorType;
            switch (invalidSubFilter) {
              case 'invalid_chars':
                return errorType === 'INVALID_CHARACTERS';
              case 'too_short':
                return errorType === 'TOO_SHORT';
              case 'too_long':
                return errorType === 'TOO_LONG';
              case 'other':
                return errorType !== 'INVALID_CHARACTERS' && errorType !== 'TOO_SHORT' && errorType !== 'TOO_LONG';
              default:
                return true;
            }
          });
        }
        break;
      case 'duplicates':
        filtered = rows.filter(row => duplicateIds.has(row.id));
        break;
      default:
        filtered = rows;
    }
    
    return filtered;
  }, [rows, recordFilter, invalidSubFilter, validations, duplicateIds, phoneColumn]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div>
              <h1 className="text-4xl font-bold text-blue-900 mb-2">
                CSV Data Cleaner
              </h1>
              <p className="text-blue-600">
                Upload, validate, and clean your CSV data with ease
              </p>
            </div>
          </div>
        </header>

    
        {/* Available Files from Database */}
        {availableFiles.length > 0 && rows.length === 0 && (
          <div className="mb-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
               Previously Uploaded Files
            </h3>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {availableFiles.map((file, idx) => (
                <button
                  key={idx}
                  onClick={() => loadFileFromDatabase(file.fileName)}
                  disabled={isLoadingData}
                  className="flex flex-col items-start gap-1 text-left bg-white p-3 rounded border border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="font-medium text-blue-900">{file.fileName}</span>
                  <span className="text-sm text-blue-700">{file.recordCount} records</span>
                  <span className="text-xs text-blue-600">
                    {new Date(file.uploadedAt).toLocaleString()}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading Data Indicator */}
        {isLoadingData && (
          <div className="mb-6">
            <LoadingSpinner message="Loading data from database..." />
          </div>
        )}

        {/* File Upload */}
        {rows.length === 0 && !isLoadingData && (
          <FileUpload onFileSelect={handleFileSelect} isLoading={isProcessing} />
        )}

        {/* Main Content */}
        {rows.length > 0 && (
          <>
            {/* Upload in Progress - Show Loading Screen */}
            {isUploading && (
              <div className="mb-6 bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-8">
                <div className="flex flex-col items-center justify-center gap-4">
                  <LoadingSpinner size="lg" message="" />
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">
                      Uploading to Database...
                    </h3>
                    <p className="text-blue-700">
                      Please wait while we save your {rows.length} records
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Upload Complete - Show Results */}
            {!isUploading && uploadComplete && uploadResults && (
              <div className={`mb-6 border-l-4 rounded-lg p-6 ${
                uploadResults.saved === 0 && uploadResults.duplicates > 0
                  ? 'bg-red-50 border-red-500'
                  : uploadResults.duplicates > 0
                  ? 'bg-yellow-50 border-yellow-500'
                  : 'bg-green-50 border-green-500'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold mb-3 ${
                      uploadResults.saved === 0 && uploadResults.duplicates > 0
                        ? 'text-red-900'
                        : uploadResults.duplicates > 0
                        ? 'text-yellow-900'
                        : 'text-green-900'
                    }`}>
                      {uploadResults.saved === 0 && uploadResults.duplicates > 0 ? 'All Records Are Duplicates!' : 
                       uploadResults.duplicates > 0 ? 'Upload Complete with Duplicates' : 
                       'Upload Successful!'}
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className={`p-4 rounded-lg ${
                        uploadResults.saved > 0 ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        <div className="text-2xl font-bold text-green-900">
                          {uploadResults.saved}
                        </div>
                        <div className="text-sm text-green-700">New Records Saved</div>
                      </div>
                      
                      <div className={`p-4 rounded-lg ${
                        uploadResults.duplicates > 0 ? 'bg-red-100' : 'bg-gray-100'
                      }`}>
                        <div className="text-2xl font-bold text-red-900">
                          {uploadResults.duplicates}
                        </div>
                        <div className="text-sm text-red-700">Duplicates Skipped</div>
                      </div>
                    </div>

                    {uploadResults.duplicatePhones && uploadResults.duplicatePhones.length > 0 && (
                      <div className="bg-white border border-gray-200 rounded p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Duplicate Phone Numbers (first 10):
                        </h4>
                        <div className="max-h-32 overflow-y-auto">
                          <ul className="text-sm text-gray-700 space-y-1">
                            {uploadResults.duplicatePhones.slice(0, 10).map((phone, idx) => (
                              <li key={idx} className="font-mono">{phone}</li>
                            ))}
                          </ul>
                        </div>
                        {uploadResults.duplicatePhones.length > 10 && (
                          <p className="text-xs text-gray-500 mt-2">
                            ... and {uploadResults.duplicatePhones.length - 10} more
                          </p>
                        )}
                      </div>
                    )}

                    {uploadResults.saved === 0 && uploadResults.duplicates > 0 && (
                      <p className="mt-4 text-sm text-red-700 bg-red-100 p-3 rounded">
                        <strong>Note:</strong> All records already exist in the database. 
                        You can still work with this data in the current session.
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => setUploadComplete(false)}
                    className="ml-4 text-gray-500 hover:text-gray-700 text-2xl leading-none"
                    title="Dismiss"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

            {/* Upload/Cleaning Status Indicators */}
            {isCleaning && (
              <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <LoadingSpinner size="sm" message="" />
                  <span className="text-blue-700 font-medium">
                    Cleaning record...
                  </span>
                </div>
              </div>
            )}

            {/* Stats Dashboard - Only show when not uploading */}
            {!isUploading && (
              <StatsDashboard
                stats={{
                  totalRecords,
                  validRecords: validCount,
                  invalidRecords: invalidCount,
                  duplicateCount,
                  telcoDistribution: {
                    Safaricom: validations.filter(v => v.validationResult.telco === 'Safaricom').length,
                    Airtel: validations.filter(v => v.validationResult.telco === 'Airtel').length,
                    Telkom: validations.filter(v => v.validationResult.telco === 'Telkom').length,
                    Unknown: validations.filter(v => v.validationResult.telco === 'Unknown').length,
                  },
                }}
              />
            )}

            {/* Action Buttons - Only show when not uploading */}
            {!isUploading && (
              <>
                {/* Filter Buttons */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-4 border-t-4 border-blue-900">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-blue-900">Show:</span>
                    <button
                      onClick={() => setRecordFilter('all')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        recordFilter === 'all'
                          ? 'bg-blue-900 text-white'
                          : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                      }`}
                    >
                      All ({totalRecords})
                    </button>
                    <button
                      onClick={() => setRecordFilter('valid')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        recordFilter === 'valid'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                      }`}
                    >
                      Valid ({validCount})
                    </button>
                    <button
                      onClick={() => setRecordFilter('invalid')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        recordFilter === 'invalid'
                          ? 'bg-red-600 text-white'
                          : 'bg-red-50 text-red-700 hover:bg-red-100'
                      }`}
                    >
                      Invalid ({invalidCount})
                    </button>
                    <button
                      onClick={() => setRecordFilter('duplicates')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        recordFilter === 'duplicates'
                          ? 'bg-orange-500 text-white'
                          : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                      }`}
                    >
                      Duplicates ({duplicateCount})
                    </button>
                  </div>

                  {/* Sub-filters for Invalid records */}
                  {recordFilter === 'invalid' && (
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200">
                      <span className="text-xs font-medium text-gray-600">Filter by:</span>
                      <button
                        onClick={() => setInvalidSubFilter('all')}
                        className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                          invalidSubFilter === 'all'
                            ? 'bg-red-500 text-white'
                            : 'bg-red-50 text-red-700 hover:bg-red-100'
                        }`}
                      >
                        All Invalid
                      </button>
                      <button
                        onClick={() => setInvalidSubFilter('invalid_chars')}
                        className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                          invalidSubFilter === 'invalid_chars'
                            ? 'bg-purple-500 text-white'
                            : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                        }`}
                      >
                        Invalid Characters
                      </button>
                      <button
                        onClick={() => setInvalidSubFilter('too_short')}
                        className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                          invalidSubFilter === 'too_short'
                            ? 'bg-orange-500 text-white'
                            : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                        }`}
                      >
                        📏 Too Short
                      </button>
                      <button
                        onClick={() => setInvalidSubFilter('too_long')}
                        className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                          invalidSubFilter === 'too_long'
                            ? 'bg-yellow-500 text-white'
                            : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                        }`}
                      >
                        📏 Too Long
                      </button>
                      <button
                        onClick={() => setInvalidSubFilter('other')}
                        className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                          invalidSubFilter === 'other'
                            ? 'bg-gray-500 text-white'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Other Errors
                      </button>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                  <div className="flex flex-wrap gap-3 items-center">
                    {/* Selection info */}
                    {selectedRows.size > 0 && (
                      <span className="text-sm font-medium text-blue-900 bg-blue-100 px-3 py-1 rounded-lg">
                        {selectedRows.size} selected
                      </span>
                    )}

                    {selectedRows.size > 0 && recordFilter === 'valid' && (
                      <button
                        onClick={handleBatchSubmit}
                        className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold shadow-md"
                      >
                        <Download className="h-4 w-4" />
                        Submit Selected ({selectedRows.size})
                      </button>
                    )}

                    {selectedRows.size > 0 && recordFilter === 'duplicates' && (
                      <button
                        onClick={handleBatchDelete}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold shadow-md"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete Selected ({selectedRows.size})
                      </button>
                    )}

                    {/* Global actions */}
                  <button
                    onClick={handleAutoFixAll}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-semibold shadow-md"
                  >
                    <Wand2 className="h-4 w-4" />
                    Auto-Fix All
                  </button>
                  <button
                    onClick={handleRemoveDuplicates}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={duplicateCount === 0}
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove All Duplicates ({duplicateCount})
                  </button>
                  <button
                    onClick={handleRemoveInvalid}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={invalidCount === 0}
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove All Invalid ({invalidCount})
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors font-semibold shadow-md"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Reset
                  </button>
                </div>
              </div>
              </>
            )}

            {/* Data Table - Only show when not uploading */}
            {!isUploading && (
              <DataTable
                headers={headers}
                rows={filteredRows}
                validations={validations}
                duplicateIds={duplicateIds}
                selectedRows={selectedRows}
                onUpdateCell={handleUpdateCell}
                onDeleteRow={handleDeleteRow}
                onAutoFix={handleAutoFix}
                onCleanRecord={handleCleanRecord}
                onSelectRow={handleSelectRow}
                onSelectAll={handleSelectAll}
                onSort={handleSort}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           