// Test script to check approved jobs from backend
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

async function testApprovedJobs() {
  console.log('🔍 Testing approved jobs from backend...');
  console.log('URL:', `${API_BASE_URL}/jobs`);
  console.log('='.repeat(60));
  
  try {
    // Test 1: Get all jobs
    console.log('\n1. Fetching all jobs...');
    const allJobsResponse = await makeRequest(`${API_BASE_URL}/jobs`);
    
    console.log('✅ All jobs response:');
    console.log('   Status:', allJobsResponse.status);
    console.log('   Total jobs:', allJobsResponse.data?.data?.length || 0);
    
    if (allJobsResponse.data?.data) {
      const jobs = allJobsResponse.data.data;
      console.log('\n📊 Job Status Breakdown:');
      
      const statusCounts = jobs.reduce((acc, job) => {
        acc[job.status] = (acc[job.status] || 0) + 1;
        return acc;
      }, {});
      
      Object.entries(statusCounts).forEach(([status, count]) => {
        console.log(`   ${status}: ${count} jobs`);
      });
      
      // Show approved jobs details
      const approvedJobs = jobs.filter(job => job.status === 'approved');
      console.log(`\n✅ Approved Jobs (${approvedJobs.length}):`);
      
      approvedJobs.forEach((job, index) => {
        console.log(`\n   Job ${index + 1}:`);
        console.log(`   - ID: ${job._id || job.id}`);
        console.log(`   - Title: ${job.title}`);
        console.log(`   - Location: ${job.location}, ${job.state}`);
        console.log(`   - Category: ${job.category}`);
        console.log(`   - Work Type: ${job.workType}`);
        console.log(`   - Salary: ₹${job.salary}/${job.salaryType}`);
        console.log(`   - Employer: ${job.employer?.name || 'N/A'}`);
        console.log(`   - Posted: ${job.postedAt ? new Date(job.postedAt).toLocaleDateString() : 'N/A'}`);
        console.log(`   - Validated By: ${job.validatedBy ? 'Agent' : 'Not validated'}`);
      });
      
      // Test location matching
      console.log('\n🌍 Location Matching Test:');
      const userLocation = 'Mumbai, Maharashtra';
      console.log(`   User Location: ${userLocation}`);
      
      const locationMatchedJobs = approvedJobs.filter(job => {
        const jobLocation = job.location?.toLowerCase() || '';
        const userLocationLower = userLocation.toLowerCase();
        
        return jobLocation.includes(userLocationLower) || 
               userLocationLower.includes(jobLocation) ||
               jobLocation.includes('mumbai') ||
               jobLocation.includes('maharashtra');
      });
      
      console.log(`   Location Matched Jobs: ${locationMatchedJobs.length}`);
      locationMatchedJobs.forEach((job, index) => {
        console.log(`   ${index + 1}. ${job.title} - ${job.location}, ${job.state}`);
      });
    }
    
  } catch (error) {
    console.log('❌ Error fetching jobs:', error.message);
  }
  
  // Test 2: Get jobs with status filter
  console.log('\n2. Fetching jobs with status=approved filter...');
  try {
    const approvedJobsResponse = await makeRequest(`${API_BASE_URL}/jobs?status=approved`);
    
    console.log('✅ Approved jobs filter response:');
    console.log('   Status:', approvedJobsResponse.status);
    console.log('   Approved jobs count:', approvedJobsResponse.data?.data?.length || 0);
    
    if (approvedJobsResponse.data?.data) {
      const approvedJobs = approvedJobsResponse.data.data;
      console.log('\n📋 Approved Jobs List:');
      approvedJobs.forEach((job, index) => {
        console.log(`   ${index + 1}. ${job.title} - ${job.location}, ${job.state} - ₹${job.salary}/${job.salaryType}`);
      });
    }
    
  } catch (error) {
    console.log('❌ Error fetching approved jobs:', error.message);
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('🏁 Approved jobs testing complete!');
}

// Run the test
testApprovedJobs().catch(console.error);
