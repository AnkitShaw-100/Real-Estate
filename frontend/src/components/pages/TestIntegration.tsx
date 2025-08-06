import React, { useState } from "react";
import apiClient from "../../services/api.ts";

const TestIntegration: React.FC = () => {
  const [testResult, setTestResult] = useState("");
  const [loading, setLoading] = useState(false);

  const testBackendConnection = async () => {
    setLoading(true);
    setTestResult("");

    try {
      // Test health check
      const healthResponse = await apiClient.healthCheck();
      setTestResult(`✅ Health check successful: ${JSON.stringify(healthResponse, null, 2)}`);
    } catch (error: any) {
      setTestResult(`❌ Health check failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testRegistration = async () => {
    setLoading(true);
    setTestResult("");

    try {
      const testUser = {
        name: "Test User",
        email: `test${Date.now()}@example.com`,
        phone: "1234567890",
        password: "password123",
        role: "buyer"
      };

      const response = await apiClient.register(testUser);
      setTestResult(`✅ Registration successful: ${JSON.stringify(response, null, 2)}`);
    } catch (error: any) {
      setTestResult(`❌ Registration failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testLogin = async () => {
    setLoading(true);
    setTestResult("");

    try {
      const credentials = {
        email: "test@example.com",
        password: "password123"
      };

      const response = await apiClient.login(credentials);
      setTestResult(`✅ Login successful: ${JSON.stringify(response, null, 2)}`);
    } catch (error: any) {
      setTestResult(`❌ Login failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Backend Integration Test</h1>
        
        <div className="space-y-4">
          <button
            onClick={testBackendConnection}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            {loading ? "Testing..." : "Test Backend Connection"}
          </button>

          <button
            onClick={testRegistration}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:bg-gray-400 ml-4"
          >
            {loading ? "Testing..." : "Test Registration"}
          </button>

          <button
            onClick={testLogin}
            disabled={loading}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded disabled:bg-gray-400 ml-4"
          >
            {loading ? "Testing..." : "Test Login"}
          </button>
        </div>

        {testResult && (
          <div className="mt-8 p-4 bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Test Result:</h2>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
              {testResult}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestIntegration; 