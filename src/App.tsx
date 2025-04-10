import React, { useState } from 'react';
import { Upload, BarChart3, Home, DollarSign, TrendingUp } from 'lucide-react';
import PropertyList from './components/PropertyList';
import ValuationForm from './components/ValuationForm';
import Analytics from './components/Analytics';
import { Property } from './types';

function App() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [activeTab, setActiveTab] = useState<'list' | 'add' | 'analytics'>('list');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const lines = text.split('\n');
        const headers = lines[0].split(',');
        
        const parsedProperties = lines.slice(1).map((line) => {
          const values = line.split(',');
          return {
            id: Math.random().toString(36).substr(2, 9),
            address: values[0],
            price: parseFloat(values[1]),
            sqft: parseFloat(values[2]),
            bedrooms: parseInt(values[3]),
            bathrooms: parseFloat(values[4]),
            yearBuilt: parseInt(values[5]),
            lotSize: parseFloat(values[6]),
          };
        });
        
        setProperties(parsedProperties);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Home className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">
                Property Valuation Analytics
              </h1>
            </div>
            <div className="flex items-center">
              <label className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md cursor-pointer hover:bg-indigo-700">
                <Upload className="h-5 w-5 mr-2" />
                Upload CSV
                <input
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('list')}
              className={'px-3 py-4 text-sm font-medium ' + 
                (activeTab === 'list'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
                )}
            >
              <div className="flex items-center">
                <Home className="h-5 w-5 mr-2" />
                Properties
              </div>
            </button>
            <button
              onClick={() => setActiveTab('add')}
              className={'px-3 py-4 text-sm font-medium ' + 
                (activeTab === 'add'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
                )}
            >
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Add Property
              </div>
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={'px-3 py-4 text-sm font-medium ' + 
                (activeTab === 'analytics'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
                )}
            >
              <div className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Analytics
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {activeTab === 'list' && <PropertyList properties={properties} />}
        {activeTab === 'add' && (
          <ValuationForm
            onSubmit={(property) => setProperties([...properties, property])}
          />
        )}
        {activeTab === 'analytics' && <Analytics properties={properties} />}
      </main>
    </div>
  );
}

export default App;