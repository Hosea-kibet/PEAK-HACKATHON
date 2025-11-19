"use client";

import React from "react";
import { BalanceInfo } from "@/types";
import { AlertTriangle, CheckCircle } from "lucide-react";

interface BalanceCheckerProps {
  balanceInfo: BalanceInfo | null;
  isLoading: boolean;
}

export default function BalanceChecker({
  balanceInfo,
  isLoading,
}: BalanceCheckerProps) {
  if (isLoading) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3"></div>
          <p className="text-blue-800">Checking balance...</p>
        </div>
      </div>
    );
  }

  if (!balanceInfo) {
    return null;
  }

  if (balanceInfo.isInsufficient) {
    return (
      <div className="bg-red-50 border border-red-300 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <AlertTriangle className="h-6 w-6 text-red-600 mr-3 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-red-900 mb-1">
              Insufficient Balance
            </h3>
            <p className="text-red-800 mb-2">
              You need <strong>{balanceInfo.requiredUnits}</strong> units but
              only have <strong>{balanceInfo.availableUnits}</strong> units
              available.
            </p>
            <p className="text-sm text-red-700">
              Shortage:{" "}
              <strong>
                {balanceInfo.requiredUnits - balanceInfo.availableUnits}
              </strong>{" "}
              units
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-green-50 border border-green-300 rounded-lg p-4 mb-6">
      <div className="flex items-start">
        <CheckCircle className="h-6 w-6 text-green-600 mr-3 shrink-0 mt-0.5" />
        <div>
          <h3 className="text-lg font-semibold text-green-900 mb-1">
            Sufficient Balance
          </h3>
          <p className="text-green-800 mb-2">
            Available: <strong>{balanceInfo.availableUnits}</strong> units |
            Required: <strong>{balanceInfo.requiredUnits}</strong> units
          </p>
          <p className="text-sm text-green-700">
            Remaining after operation:{" "}
            <strong>
              {balanceInfo.availableUnits - balanceInfo.requiredUnits}
            </strong>{" "}
            units
          </p>
        </div>
      </div>
    </div>
  );
}
