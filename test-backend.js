// Test script to check backend login endpoint
const axios = require('axios');

const API_BASE_URL = 'https://samparkjyoti.onrender.com/api';

async function testBackendLogin() {
  console.log('Testing backend login endpoint...');
  console.log('API URL:', `${API_BASE_URL}/auth/login`);
  
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email: 'test@example.com',
      password: 'password123'
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });
    
    console.log('✅ Login successful!');
    console.log('Status:', response.status);
    console.log('Response data:', JSON.stringify(response.data, null, 2));
    
    // Check if response has expected structure
    if (response.data.token) {
      console.log('✅ Token found in response');
    } else {
      console.log('❌ No token in response');
    }
    
    if (response.data.user) {
      console.log('✅ User data found in response');
    } else {
      console.log('❌ No user data in response');
    }
    
  } catch (error) {
    console.log('❌ Login failed!');
    console.log('Error status:', error.response?.status);
    console.log('Error data:', error.response?.data);
    console.log('Error message:', error.message);
    
    if (error.code === 'ECONNABORTED') {
      console.log('❌ Request timeout - backend might be slow to respond');
    }
  }
}

// Test with different credentials
async function testMultipleCredentials() {
  const testCredentials = [
    { email: 'admin@example.com', password: 'admin123' },
    { email: 'user@example.com', password: 'user123' },
    { email: 'test@test.com', password: 'test123' },
    { email: 'demo@demo.com', password: 'demo123' }
  ];
  
  for (const creds of testCredentials) {
    console.log(`\n--- Testing with ${creds.email} ---`);
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, creds, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000
      });
      
      console.log('✅ Success! Status:', response.status);
      console.log('Has token:', !!response.data.token);
      console.log('Has user:', !!response.data.user);
      
      if (response.data.token) {
        console.log('Token preview:', response.data.token.substring(0, 20) + '...');
      }
      
    } catch (error) {
      console.log('❌ Failed:', error.response?.status, error.response?.data?.message || error.message);
    }
  }
}

// Run tests
testBackendLogin().then(() => {
  console.log('\n' + '='.repeat(50));
  console.log('Testing multiple credentials...');
  return testMultipleCredentials();
}).catch(console.error);











