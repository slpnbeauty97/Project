import React, { useState } from 'react';
import { Property } from '../types';

interface ValuationFormProps {
  onSubmit: (property: Property) => void;
}

const ValuationForm: React.FC<ValuationFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    address: '',
    price: '',
    sqft: '',
    bedrooms: '',
    bathrooms: '',
    yearBuilt: '',
    lotSize: '',
  });
  const [prediction, setPrediction] = useState<{ predictedPrice: number; confidence: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const getPrediction = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/predict`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sqft: parseFloat(formData.sqft),
          bedrooms: parseInt(formData.bedrooms),
          bathrooms: parseFloat(formData.bathrooms),
          yearBuilt: parseInt(formData.yearBuilt),
          lotSize: parseFloat(formData.lotSize),
        }),
      });
      
      if (!response.ok) throw new Error('Prediction failed');
      
      const result = await response.json();
      setPrediction(result);
      setFormData(prev => ({ ...prev, price: result.predictedPrice.toString() }));
    } catch (error) {
      console.error('Prediction error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: Math.random().toString(36).substr(2, 9),
      address: formData.address,
      price: parseFloat(formData.price),
      sqft: parseFloat(formData.sqft),
      bedrooms: parseInt(formData.bedrooms),
      bathrooms: parseFloat(formData.bathrooms),
      yearBuilt: parseInt(formData.yearBuilt),
      lotSize: parseFloat(formData.lotSize),
    });
    setFormData({
      address: '',
      price: '',
      sqft: '',
      bedrooms: '',
      bathrooms: '',
      yearBuilt: '',
      lotSize: '',
    });
    setPrediction(null);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Add New Property</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="number"
                  id="price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="sqft" className="block text-sm font-medium text-gray-700">
                Square Feet
              </label>
              <input
                type="number"
                id="sqft"
                value={formData.sqft}
                onChange={(e) => setFormData({ ...formData, sqft: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">
                Bedrooms
              </label>
              <input
                type="number"
                id="bedrooms"
                value={formData.bedrooms}
                onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">
                Bathrooms
              </label>
              <input
                type="number"
                id="bathrooms"
                value={formData.bathrooms}
                onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="yearBuilt" className="block text-sm font-medium text-gray-700">
                Year Built
              </label>
              <input
                type="number"
                id="yearBuilt"
                value={formData.yearBuilt}
                onChange={(e) => setFormData({ ...formData, yearBuilt: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="lotSize" className="block text-sm font-medium text-gray-700">
                Lot Size
              </label>
              <input
                type="number"
                id="lotSize"
                value={formData.lotSize}
                onChange={(e) => setFormData({ ...formData, lotSize: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
          </div>
          
          {/* Prediction Section */}
          {prediction && (
            <div className="mt-4 p-4 bg-blue-50 rounded-md">
              <h3 className="text-sm font-medium text-blue-800">ML Prediction Results</h3>
              <p className="mt-2 text-sm text-blue-700">
                Predicted Price: ${prediction.predictedPrice.toLocaleString()}
              </p>
              <p className="text-sm text-blue-700">
                Confidence: {(prediction.confidence * 100).toFixed(1)}%
              </p>
            </div>
          )}

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={getPrediction}
              disabled={loading || !formData.sqft || !formData.bedrooms || !formData.bathrooms || !formData.yearBuilt || !formData.lotSize}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Calculating...' : 'Get Price Prediction'}
            </button>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ValuationForm;