import React from 'react';
import { Property } from '../types';
import { calculateStats } from '../utils/analytics';

interface AnalyticsProps {
  properties: Property[];
}

const Analytics: React.FC<AnalyticsProps> = ({ properties }) => {
  const stats = calculateStats(properties);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Market Overview</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-gray-50 rounded-lg p-5">
              <h3 className="text-sm font-medium text-gray-500">Average Price</h3>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                ${stats.averagePrice.toLocaleString()}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-5">
              <h3 className="text-sm font-medium text-gray-500">Average Price/Sqft</h3>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                ${stats.pricePerSqft.toLocaleString()}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-5">
              <h3 className="text-sm font-medium text-gray-500">Average Size</h3>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {stats.averageSqft.toLocaleString()} sqft
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-5">
              <h3 className="text-sm font-medium text-gray-500">Total Properties</h3>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {properties.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Property Distribution</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="bg-gray-50 rounded-lg p-5">
              <h3 className="text-sm font-medium text-gray-500">Bedroom Distribution</h3>
              <div className="mt-4 space-y-2">
                {Object.entries(stats.bedroomDistribution).map(([beds, count]) => (
                  <div key={beds} className="flex items-center">
                    <span className="w-20 text-sm text-gray-500">{beds} beds:</span>
                    <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-600"
                        style={{
                          width: `${(count / properties.length) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="ml-2 text-sm text-gray-500">{count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-5">
              <h3 className="text-sm font-medium text-gray-500">Price Range Distribution</h3>
              <div className="mt-4 space-y-2">
                {Object.entries(stats.priceRangeDistribution).map(([range, count]) => (
                  <div key={range} className="flex items-center">
                    <span className="w-32 text-sm text-gray-500">{range}:</span>
                    <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-600"
                        style={{
                          width: `${(count / properties.length) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="ml-2 text-sm text-gray-500">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
