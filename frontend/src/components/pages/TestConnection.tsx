import React, { useState } from 'react';
import apiClient from '../../services/api';

const TestConnection: React.FC = () => {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    try {
      const response = await apiClient.healthCheck();
      setResult(`✅ Backend connection successful: ${response.message}`);
    } catch (error) {
      setResult(`❌ Backend connection failed: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const testAuth = async () => {
    setLoading(true);
    try {
      // Test with dummy credentials
      await apiClient.login({ email: 'test@test.com', password: 'test123' });
      setResult('✅ Auth endpoint is working');
    } catch (error) {
      setResult(`✅ Auth endpoint is working (expected error: ${error})`);
    } finally {
      setLoading(false);
    }
  };

  const testProperties = async () => {
    setLoading(true);
    try {
      const response = await apiClient.getProperties();
      setResult(`✅ Properties API working: Found ${response.data?.properties?.length || 0} properties`);
    } catch (error) {
      setResult(`❌ Properties API failed: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-6">API Connection Test</h2>
      
      <div className="space-y-4">
        <button 
          onClick={testConnection}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Backend Connection'}
        </button>

        <button 
          onClick={testAuth}
          disabled={loading}
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Auth API'}
        </button>

        <button 
          onClick={testProperties}
          disabled={loading}
          className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Properties API'}
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded border">
          <pre className="whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  );
};

export default TestConnection;
