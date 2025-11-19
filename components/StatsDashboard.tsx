"use client";

import React from "react";
import { DataStats } from "@/types";
import { CheckCircle2, XCircle, Copy, Smartphone } from "lucide-react";

interface StatsDashboardProps {
  stats: DataStats;
}

export default function StatsDashboard({ stats }: StatsDashboardProps) {
  const validPercentage =
    stats.totalRecords > 0
      ? ((stats.validRecords / stats.totalRecords) * 100).toFixed(1)
      : 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Data Summary</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Total Records</p>
              <p className="text-2xl font-bold text-blue-900">
                {stats.totalRecords}
              </p>
            </div>
            <Smartphone className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">
                Valid Records
              </p>
              <p className="text-2xl font-bold text-green-900">
                {stats.validRecords}
              </p>
              <p className="text-xs text-green-600">{validPercentage}%</p>
            </div>
            <CheckCircle2 className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 font-medium">
                Invalid Records
              </p>
              <p className="text-2xl font-bold text-red-900">
                {stats.invalidRecords}
              </p>
            </div>
            <XCircle className="h-8 w-8 text-red-500" />
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600 font-medium">Duplicates</p>
              <p className="text-2xl font-bold text-yellow-900">
                {stats.duplicateCount}
              </p>
            </div>
            <Copy className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Telco Distribution */}
      <div className="border-t pt-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Network Distribution
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded">
            <span className="text-sm font-medium text-gray-700">Safaricom</span>
            <span className="text-lg font-bold text-green-700">
              {stats.telcoDistribution.Safaricom}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded">
            <span className="text-sm font-medium text-gray-700">Airtel</span>
            <span className="text-lg font-bold text-red-700">
              {stats.telcoDistribution.Airtel}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded">
            <span className="text-sm font-medium text-gray-700">Telkom</span>
            <span className="text-lg font-bold text-blue-700">
              {stats.telcoDistribution.Telkom}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded">
            <span className="text-sm font-medium text-gray-700">Unknown</span>
            <span className="text-lg font-bold text-gray-700">
              {stats.telcoDistribution.Unknown}
            </span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2 italic">
          * Network identification is approximate due to number portability
        </p>
      </div>
    </div>
  );
}
