// Detailed test for jobs endpoint
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
    
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    if (options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
}

async function testJobsDetailed() {
  console.log('🔍 Detailed Jobs Testing...');
  console.log('='.repeat(60));
  
  try {
    // Test 1: Get all jobs with detailed response
    console.log('\n1. Fetching all jobs (detailed)...');
    const response = await makeRequest(`${API_BASE_URL}/jobs`);
    
    console.log('✅ Response Status:', response.status);
    console.log('✅ Response Headers:', JSON.stringify(response.headers, null, 2));
    console.log('✅ Full Response Data:');
    console.log(JSON.stringify(response.data, null, 2));
    
    // Check if data is an array or object
    if (response.data) {
      console.log('\n📊 Data Type Analysis:');
      console.log('   Type of data:', typeof response.data);
      console.log('   Is Array:', Array.isArray(response.data));
      
      if (response.data.data) {
        console.log('   Type of data.data:', typeof response.data.data);
        console.log('   Is Array (data.data):', Array.isArray(response.data.data));
        console.log('   Length of data.data:', response.data.data?.length || 'N/A');
      }
      
      if (response.data.jobs) {
        console.log('   Type of data.jobs:', typeof response.data.jobs);
        console.log('   Is Array (data.jobs):', Array.isArray(response.data.jobs));
        console.log('   Length of data.jobs:', response.data.jobs?.length || 'N/A');
      }
    }
    
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
  
  // Test 2: Try different endpoints
  console.log('\n2. Testing different job endpoints...');
  
  const endpoints = [
    '/jobs',
    '/jobs?status=approved',
    '/jobs?status=pending',
    '/jobs?limit=10',
    '/jobs?page=1&limit=10'
  ];
  
  for (const endpoint of endpoints) {
    try {
      console.log(`\n   Testing: ${endpoint}`);
      const response = await makeRequest(`${API_BASE_URL}${endpoint}`);
      console.log(`   Status: ${response.status}`);
      
      if (response.data) {
        if (Array.isArray(response.data)) {
          console.log(`   Jobs count: ${response.data.length}`);
        } else if (response.data.data && Array.isArray(response.data.data)) {
          console.log(`   Jobs count: ${response.data.data.length}`);
        } else if (response.data.jobs && Array.isArray(response.data.jobs)) {
          console.log(`   Jobs count: ${response.data.jobs.length}`);
        } else {
          console.log(`   Data structure: ${JSON.stringify(response.data).substring(0, 200)}...`);
        }
      }
    } catch (error) {
      console.log(`   Error: ${error.message}`);
    }
  }
  
  // Test 3: Check if we need authentication
  console.log('\n3. Testing with authentication...');
  try {
    // First login to get token
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
    
    if (loginResponse.data?.data?.token) {
      const token = loginResponse.data.data.token;
      console.log('   Login successful, token obtained');
      
      // Now try to get jobs with token
      const jobsResponse = await makeRequest(`${API_BASE_URL}/jobs`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('   Jobs with auth - Status:', jobsResponse.status);
      console.log('   Jobs with auth - Data:', JSON.stringify(jobsResponse.data, null, 2));
    } else {
      console.log('   Login failed or no token received');
    }
    
  } catch (error) {
    console.log('   Auth test error:', error.message);
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('🏁 Detailed testing complete!');
}

// Run the test
testJobsDetailed().catch(console.error);
