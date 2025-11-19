'use client';

import React from 'react';
import { CSVRowData, ValidationState } from '@/types';
import { getTelcoColor } from '@/lib/phoneUtils';
import { Trash2, Edit2, Check, X, ArrowUpDown, ArrowUp, ArrowDown, Lightbulb, Download, Sparkles, Search } from 'lucide-react';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
  SortingState,
  ColumnFiltersState,
} from '@tanstack/react-table';

interface DataTableProps {
  headers: string[];
  rows: CSVRowData[];
  validations: ValidationState[];
  duplicateIds: Set<string>;
  selectedRows: Set<string>;
  onUpdateCell: (rowId: string, column: string, value: string) => void;
  onDeleteRow: (rowId: string) => void;
  onAutoFix: (rowId: string, column: string) => void;
  onCleanRecord: (rowId: string) => void;
  onSelectRow: (rowId: string) => void;
  onSelectAll: () => void;
  onSort: (column: string) => void;
  sortColumn: string | null;
  sortDirection: 'asc' | 'desc';
  hideSearch?: boolean; // Hide search until server-side is implemented
}

export default function DataTable({
  headers,
  rows,
  validations,
  duplicateIds,
  selectedRows,
  onUpdateCell,
  onDeleteRow,
  onAutoFix,
  onCleanRecord,
  onSelectRow,
  onSelectAll,
  hideSearch = true, // Hide search by default until server-side is implemented
}: DataTableProps) {
  const [editingCell, setEditingCell] = React.useState<{ rowId: string; column: string } | null>(null);
  const [editValue, setEditValue] = React.useState('');
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');

  const getValidationForCell = React.useCallback((rowId: string, column: string): ValidationState | undefined => {
    return validations.find(v => v.rowId === rowId && v.columnName === column);
  }, [validations]);

  const startEditing = React.useCallback((rowId: string, column: string, currentValue: string) => {
    setEditingCell({ rowId, column });
    setEditValue(currentValue || '');
  }, []);

  const saveEdit = React.useCallback(() => {
    if (editingCell) {
      onUpdateCell(editingCell.rowId, editingCell.column, editValue);
      setEditingCell(null);
      setEditValue('');
    }
  }, [editingCell, editValue, onUpdateCell]);

  const cancelEdit = React.useCallback(() => {
    setEditingCell(null);
    setEditValue('');
  }, []);

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  }, [saveEdit, cancelEdit]);

  const exportToCSV = () => {
    const exportData = rows.map(row => {
      const exportRow: Record<string, string> = {};
      headers.forEach(header => {
        const validation = getValidationForCell(row.id, header);
        exportRow[header] = validation?.validationResult.formatted || row[header] || '';
      });
      return exportRow;
    });

    const csv = Papa.unparse(exportData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const fileName = `cleaned-data-${new Date().toISOString().slice(0, 10)}.csv`;
    saveAs(blob, fileName);
  };

  const columns = React.useMemo<ColumnDef<CSVRowData>[]>(() => [
    {
      id: 'checkbox',
      header: () => (
        <input
          type="checkbox"
          checked={selectedRows.size === rows.length && rows.length > 0}
          onChange={onSelectAll}
          className="cursor-pointer"
          title="Select all"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={selectedRows.has(row.original.id)}
          onChange={() => onSelectRow(row.original.id)}
          className="cursor-pointer"
        />
      ),
      size: 40,
      enableSorting: false,
      enableColumnFilter: false,
    },
    {
      id: 'select',
      header: '#',
      cell: ({ row }) => <div className="text-gray-500">{row.index + 1}</div>,
      size: 50,
      enableSorting: false,
      enableColumnFilter: false,
    },
    ...headers.map((header): ColumnDef<CSVRowData> => ({
      accessorKey: header,
      header: header,
      cell: ({ row }) => {
        const validation = getValidationForCell(row.original.id, header);
        const isEditing = editingCell?.rowId === row.original.id && editingCell?.column === header;
        const cellValue = row.original[header];
        const isInvalid = validation && !validation.validationResult.isValid;

        return (
          <div className={`${isInvalid ? 'bg-red-50' : ''}`}>
            {isEditing ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="border border-gray-300 rounded px-2 py-1 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
                  autoFocus
                />
                <button onClick={saveEdit} className="text-green-600 hover:text-green-800" title="Save">
                  <Check className="h-4 w-4" />
                </button>
                <button onClick={cancelEdit} className="text-red-600 hover:text-red-800" title="Cancel">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  {validation && validation.validationResult.isValid ? (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900">{validation.validationResult.formatted}</span>
                      {validation.validationResult.telco && (
                        <span className={`px-2 py-0.5 text-xs rounded border ${getTelcoColor(validation.validationResult.telco)}`}>
                          {validation.validationResult.telco}
                        </span>
                      )}
                    </div>
                  ) : validation && !validation.validationResult.isValid ? (
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-red-700 line-through">{cellValue}</span>
                        {validation.validationResult.errorType && (
                          <span className={`px-2 py-0.5 text-xs rounded border font-medium ${
                            validation.validationResult.errorType === 'INVALID_CHARACTERS' 
                              ? 'bg-purple-100 text-purple-800 border-purple-300'
                              : validation.validationResult.errorType === 'TOO_SHORT'
                              ? 'bg-orange-100 text-orange-800 border-orange-300'
                              : validation.validationResult.errorType === 'TOO_LONG'
                              ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                              : 'bg-red-100 text-red-800 border-red-300'
                          }`}>
                            {validation.validationResult.errorType === 'INVALID_CHARACTERS' && 'Invalid Chars'}
                            {validation.validationResult.errorType === 'TOO_SHORT' && '📏 Too Short'}
                            {validation.validationResult.errorType === 'TOO_LONG' && '📏 Too Long'}
                            {validation.validationResult.errorType === 'INVALID_FORMAT' && 'Invalid Format'}
                            {validation.validationResult.errorType === 'INVALID_PREFIX' && '🔢 Invalid Prefix'}
                            {validation.validationResult.errorType === 'EMPTY' && '∅ Empty'}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-red-600 mt-1">
                        {validation.validationResult.errors.map((err, i) => (
                          <div key={i}>• {err}</div>
                        ))}
                      </div>
                      {validation.validationResult.suggestions.length > 0 && (
                        <div className="text-xs text-blue-600 mt-1">
                          <div className="flex items-start gap-1">
                            <Lightbulb className="h-3 w-3 mt-0.5 shrink-0" />
                            <div>
                              {validation.validationResult.suggestions.map((sug, i) => (
                                <div key={i}>• {sug}</div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-900">{cellValue}</span>
                  )}
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                  <button onClick={() => startEditing(row.original.id, header, cellValue)} className="text-blue-600 hover:text-blue-800" title="Edit">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  {validation && !validation.validationResult.isValid && validation.validationResult.formatted && (
                    <button onClick={() => onAutoFix(row.original.id, header)} className="text-green-600 hover:text-green-800" title="Auto-fix">
                      <Lightbulb className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      },
    })),
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const isDuplicate = duplicateIds.has(row.original.id);
        const hasInvalidData = validations.some(v => v.rowId === row.original.id && !v.validationResult.isValid);
        
        return (
          <div className="flex items-center gap-2">
            {hasInvalidData && (
              <button
                onClick={() => onCleanRecord(row.original.id)}
                className="flex items-center gap-1 px-2 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700"
                title="Clean this record"
              >
                <Sparkles className="h-3 w-3" />
                Clean
              </button>
            )}
            <button onClick={() => onDeleteRow(row.original.id)} className="text-red-600 hover:text-red-800" title="Delete row">
              <Trash2 className="h-4 w-4" />
            </button>
            {isDuplicate && <span className="text-xs text-yellow-700 font-medium">DUP</span>}
          </div>
        );
      },
      size: 150,
      enableSorting: false,
      enableColumnFilter: false,
    },
  ], [headers, validations, duplicateIds, editingCell, editValue, getValidationForCell, onAutoFix, onDeleteRow, onCleanRecord, saveEdit, cancelEdit, handleKeyDown, startEditing, selectedRows, onSelectRow, onSelectAll, rows.length]);

  const table = useReactTable({
    data: rows,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (rows.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500">No data to display. Upload a CSV file to get started.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4 flex-1">
            {!hideSearch && (
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={globalFilter ?? ''}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  placeholder="Search all columns..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
            {hideSearch && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 text-sm text-blue-700">
                Server-side search coming soon
              </div>
            )}
          </div>
          <button onClick={exportToCSV} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>
        <div className="text-sm text-gray-600">
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
          {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, rows.length)} of {rows.length} rows
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex flex-col gap-2">
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            className={header.column.getCanSort() ? 'cursor-pointer select-none hover:text-gray-700' : ''}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            <div className="flex items-center gap-1">
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {header.column.getCanSort() && (
                                <>
                                  {header.column.getIsSorted() === 'asc' && <ArrowUp className="h-4 w-4 text-blue-600" />}
                                  {header.column.getIsSorted() === 'desc' && <ArrowDown className="h-4 w-4 text-blue-600" />}
                                  {!header.column.getIsSorted() && <ArrowUpDown className="h-4 w-4 opacity-40" />}
                                </>
                              )}
                            </div>
                          </div>
                          {/* Hide column filters until server-side is implemented */}
                          {!hideSearch && header.column.getCanFilter() && (
                            <input
                              type="text"
                              value={(header.column.getFilterValue() as string) ?? ''}
                              onChange={(e) => header.column.setFilterValue(e.target.value)}
                              placeholder="Filter..."
                              className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                          )}
                        </>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map(row => {
              const isDuplicate = duplicateIds.has(row.original.id);
              return (
                <tr key={row.id} className={`${isDuplicate ? 'bg-yellow-50' : ''} hover:bg-gray-50 group`}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Only show pagination if we have more than one page */}
      {table.getPageCount() > 1 && (
        <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="flex gap-2">
            <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-500">
              First
            </button>
            <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-500">
              Previous
            </button>
            <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="px-3 py-1 border border-gray-500 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-500">
              Next
            </button>
            <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()} className="px-3 py-1 border border-gray-500 rounded hover:bg-gray-50 text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed">
              Last
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              {[10, 20, 50, 100].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
