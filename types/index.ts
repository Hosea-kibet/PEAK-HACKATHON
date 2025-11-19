import { TelcoProvider, PhoneValidationResult } from '@/lib/phoneUtils';

export interface CSVRowData {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface ValidationState {
  rowId: string;
  columnName: string;
  validationResult: PhoneValidationResult;
}

export interface DataStats {
  totalRecords: number;
  validRecords: number;
  invalidRecords: number;
  duplicateCount: number;
  telcoDistribution: {
    [key in TelcoProvider]: number;
  };
}

export interface BalanceInfo {
  availableUnits: number;
  requiredUnits: number;
  isInsufficient: boolean;
}

export type { TelcoProvider, PhoneValidationResult };
