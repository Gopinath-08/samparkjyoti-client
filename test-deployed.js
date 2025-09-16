// Simple test for deployed backend
const https = require('https');

const API_BASE_URL = 'https://samparkjyoti.onrender.com/api';

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ status: res.statusCode, data: jsonData, headers: res.headers });
        } catch (e) {
          resolve({ status: res.statusCode, data: data, headers: res.headers });
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    if (options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
}

async function testDeployedBackend() {
  console.log('🔍 Testing deployed backend...');
  console.log('URL:', API_BASE_URL);
  console.log('='.repeat(50));
  
  // Test 1: Health check
  console.log('\n1. Testing health endpoint...');
  try {
    const healthResponse = await makeRequest('https://samparkjyoti.onrender.com/health');
    console.log('✅ Health check response:');
    console.log('   Status:', healthResponse.status);
    console.log('   Data:', healthResponse.data);
  } catch (error) {
    console.log('❌ Health check failed:', error.message);
  }
  
  // Test 2: Login endpoint
  console.log('\n2. Testing login endpoint...');
  try {
    const loginResponse = await makeRequest(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      })
    });
    
    console.log('✅ Login response:');
    console.log('   Status:', loginResponse.status);
    console.log('   Data:', JSON.stringify(loginResponse.data, null, 2));
    
    if (loginResponse.data.token) {
      console.log('   ✅ Token found in response');
      console.log('   Token preview:', loginResponse.data.token.substring(0, 20) + '...');
    } else {
      console.log('   ❌ No token in response');
    }
    
    if (loginResponse.data.user) {
      console.log('   ✅ User data found in response');
    } else {
      console.log('   ❌ No user data in response');
    }
    
  } catch (error) {
    console.log('❌ Login test failed:', error.message);
  }
  
  // Test 3: Register endpoint
  console.log('\n3. Testing register endpoint...');
  try {
    const registerResponse = await makeRequest(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123',
        phone: '1234567890',
        isAgent: false
      })
    });
    
    console.log('✅ Register response:');
    console.log('   Status:', registerResponse.status);
    console.log('   Data:', JSON.stringify(registerResponse.data, null, 2));
    
    if (registerResponse.data.token) {
      console.log('   ✅ Token found in response');
      console.log('   Token preview:', registerResponse.data.token.substring(0, 20) + '...');
    } else {
      console.log('   ❌ No token in response');
    }
    
    if (registerResponse.data.user) {
      console.log('   ✅ User data found in response');
    } else {
      console.log('   ❌ No user data in response');
    }
    
  } catch (error) {
    console.log('❌ Register test failed:', error.message);
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('🏁 Backend testing complete!');
}

// Run the test
testDeployedBackend().catch(console.error);




