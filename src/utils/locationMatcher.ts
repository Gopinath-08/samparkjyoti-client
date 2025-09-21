// Location matching utility for frontend
// This mirrors the backend locationMatcher.js functionality

const locationVariations: Record<string, string[]> = {
  // Odisha districts with common misspellings
  'balangir': ['bolangir', 'balangir', 'balangiri', 'bolangiri', 'balangirh', 'bolangirh', 'bongalir', 'bongaliri', 'bongalirh'],
  'bhubaneswar': ['bhubaneshwar', 'bhubaneshvar', 'bhubanesvar'],
  'cuttack': ['kattak', 'cuttak', 'kuttack'],
  'puri': ['puri'],
  'khordha': ['khurda', 'khorda'],
  'gajapati': ['gajapati'],
  'ganjam': ['ganjam'],
  'jagatsinghpur': ['jagatsinghpur', 'jagatsingpur'],
  'jajpur': ['jajpur'],
  'jharsuguda': ['jharsuguda'],
  'kalahandi': ['kalahandi'],
  'kandhamal': ['kandhamal'],
  'kendrapara': ['kendrapara'],
  'kendujhar': ['kendujhar', 'keonjhar'],
  'malkangiri': ['malkangiri'],
  'mayurbhanj': ['mayurbhanj'],
  'nabarangpur': ['nabarangpur'],
  'nuapada': ['nuapada'],
  'rayagada': ['rayagada'],
  'sambalpur': ['sambalpur'],
  'subarnapur': ['subarnapur'],
  'sundargarh': ['sundargarh'],
  
  // States with variations
  'odisha': ['orissa', 'odisha', 'orisa', 'odisa'],
  'west bengal': ['west bengal', 'westbengal', 'wb', 'bengal'],
  'bihar': ['bihar'],
  'jharkhand': ['jharkhand'],
  'chhattisgarh': ['chhattisgarh', 'chhatisgarh', 'chattisgarh'],
  'andhra pradesh': ['andhra pradesh', 'andhra', 'ap'],
  'telangana': ['telangana'],
  
  // Common city variations
  'kolkata': ['calcutta', 'kolkata', 'kolkatta'],
  'mumbai': ['bombay', 'mumbai'],
  'delhi': ['delhi', 'new delhi'],
  'bangalore': ['bengaluru', 'bangalore'],
  'chennai': ['madras', 'chennai'],
  'hyderabad': ['hyderabad'],
  'pune': ['pune'],
  'ahmedabad': ['ahmedabad'],
  'jaipur': ['jaipur'],
  'lucknow': ['lucknow'],
  'kanpur': ['kanpur'],
  'nagpur': ['nagpur'],
  'indore': ['indore'],
  'thane': ['thane'],
  'bhopal': ['bhopal'],
  'visakhapatnam': ['vizag', 'visakhapatnam'],
  'patna': ['patna'],
  'vadodara': ['baroda', 'vadodara'],
  'ludhiana': ['ludhiana'],
  'agra': ['agra'],
  'nashik': ['nashik'],
  'faridabad': ['faridabad'],
  'meerut': ['meerut'],
  'rajkot': ['rajkot'],
  'kalyan': ['kalyan'],
  'vasai': ['vasai'],
  'varanasi': ['banaras', 'varanasi'],
  'srinagar': ['srinagar'],
  'aurangabad': ['aurangabad'],
  'noida': ['noida'],
  'solapur': ['solapur'],
  'hubli': ['hubli'],
  'madurai': ['madurai'],
  'mysore': ['mysuru', 'mysore'],
  'gulbarga': ['kalaburagi', 'gulbarga'],
  'kochi': ['cochin', 'kochi'],
  'gurgaon': ['gurugram', 'gurgaon']
};

// Create reverse mapping for quick lookup
const locationMap: Record<string, string> = {};
Object.keys(locationVariations).forEach(canonical => {
  locationVariations[canonical].forEach(variation => {
    locationMap[variation.toLowerCase()] = canonical;
  });
});

// Debug: Log the location map for balangir variations (only in development)
if (process.env.NODE_ENV === 'development') {
  console.log('🗺️ Location Map for Balangir variations:', {
    'bolangir': locationMap['bolangir'],
    'balangir': locationMap['balangir'],
    'bongalir': locationMap['bongalir']
  });
}

/**
 * Normalize location name to handle common misspellings and variations
 */
export function normalizeLocation(location: string): string {
  if (!location || typeof location !== 'string') {
    return '';
  }
  
  // Convert to lowercase and trim
  const normalized = location.toLowerCase().trim();
  
  // Remove extra spaces and special characters
  const cleaned = normalized.replace(/[^\w\s]/g, '').replace(/\s+/g, ' ');
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`🔍 Normalizing location: "${location}" → "${cleaned}"`);
  }
  
  // Check if we have a mapping for this location
  if (locationMap[cleaned]) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ Exact match found: "${cleaned}" → "${locationMap[cleaned]}"`);
    }
    return locationMap[cleaned];
  }
  
  // If no exact match, try partial matching
  const partialMatch = findPartialMatch(cleaned);
  if (partialMatch) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔗 Partial match found: "${cleaned}" → "${partialMatch}"`);
    }
    return partialMatch;
  }
  
  // If no partial match, try fuzzy matching
  const fuzzyMatch = findFuzzyMatch(cleaned, 60);
  if (fuzzyMatch) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`🎯 Fuzzy match found: "${cleaned}" → "${fuzzyMatch}"`);
    }
    return fuzzyMatch;
  }
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`❌ No match found for: "${cleaned}"`);
  }
  // Return original if no match found
  return cleaned;
}

/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = [];
  const len1 = str1.length;
  const len2 = str2.length;

  for (let i = 0; i <= len2; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= len1; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= len2; i++) {
    for (let j = 1; j <= len1; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[len2][len1];
}

/**
 * Calculate similarity percentage between two strings
 */
function calculateSimilarity(str1: string, str2: string): number {
  const distance = levenshteinDistance(str1, str2);
  const maxLength = Math.max(str1.length, str2.length);
  return maxLength === 0 ? 100 : ((maxLength - distance) / maxLength) * 100;
}

/**
 * Find fuzzy match for location names using similarity
 */
function findFuzzyMatch(location: string, threshold: number = 70): string | null {
  const locationKeys = Object.keys(locationMap);
  let bestMatch: string | null = null;
  let bestSimilarity = 0;

  for (const key of locationKeys) {
    const similarity = calculateSimilarity(location, key);
    
    if (similarity >= threshold && similarity > bestSimilarity) {
      bestMatch = key;
      bestSimilarity = similarity;
    }
  }

  return bestMatch ? locationMap[bestMatch] : null;
}

/**
 * Find partial match for location names
 */
function findPartialMatch(location: string): string | null {
  const locationKeys = Object.keys(locationMap);
  
  // Try to find a location that contains the input or vice versa
  for (const key of locationKeys) {
    if (key.includes(location) || location.includes(key)) {
      // Check if the match is significant (at least 3 characters)
      if (Math.min(key.length, location.length) >= 3) {
        return locationMap[key];
      }
    }
  }
  
  return null;
}

/**
 * Check if two locations match (considering variations)
 */
export function locationsMatch(location1: string, location2: string): boolean {
  const norm1 = normalizeLocation(location1);
  const norm2 = normalizeLocation(location2);
  const match = norm1 === norm2 && norm1 !== '';
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`🔗 Location match check:`, {
      location1,
      location2,
      norm1,
      norm2,
      match
    });
  }
  
  return match;
}

/**
 * Get all variations for a given location
 */
export function getLocationVariations(location: string): string[] {
  const normalized = normalizeLocation(location);
  return locationVariations[normalized] || [normalized];
}

/**
 * Find the best matching location from a list
 */
export function findBestMatch(targetLocation: string, locationList: string[]): string | null {
  for (const location of locationList) {
    if (locationsMatch(targetLocation, location)) {
      return location;
    }
  }
  
  return null;
}

/**
 * Filter jobs by location proximity
 */
export function filterJobsByLocation(jobs: any[], userLocation: string): any[] {
  if (!userLocation || !jobs || jobs.length === 0) {
    return jobs;
  }

  const normalizedUserLocation = normalizeLocation(userLocation);
  if (process.env.NODE_ENV === 'development') {
    console.log('🔍 Filtering jobs by location:', {
      userLocation,
      normalizedUserLocation,
      totalJobs: jobs.length
    });
  }
  
  const filteredJobs = jobs.map(job => {
    const jobLocation = job.location || '';
    const normalizedJobLocation = normalizeLocation(jobLocation);
    
    // Calculate location match score
    const locationMatch = locationsMatch(userLocation, jobLocation);
    const locationScore = locationMatch ? 100 : 0;

    if (process.env.NODE_ENV === 'development') {
      console.log(`📍 Job "${job.title}" (${job.id}):`, {
        jobLocation,
        normalizedJobLocation,
        locationMatch,
        locationScore
      });
    }
    
    return {
      ...job,
      locationMatch,
      locationScore,
      normalizedLocation: normalizedJobLocation
    };
  }).sort((a, b) => {
    // Sort by location match first, then by other criteria
    if (a.locationMatch && !b.locationMatch) return -1;
    if (!a.locationMatch && b.locationMatch) return 1;
    
    // If both match or both don't match, sort by other factors
    return b.applications - a.applications; // Sort by popularity
  });
  
  const matchingJobs = filteredJobs.filter(job => job.locationMatch);
  if (process.env.NODE_ENV === 'development') {
    console.log('✅ Location filtering complete:', {
      totalJobs: filteredJobs.length,
      matchingJobs: matchingJobs.length,
      matchingJobTitles: matchingJobs.map(job => job.title)
    });
  }
  
  return filteredJobs;
}

/**
 * Get location-based job recommendations
 */
export function getLocationBasedRecommendations(jobs: any[], userLocation: string, limit: number = 10): any[] {
  const locationFilteredJobs = filterJobsByLocation(jobs, userLocation);
  
  // Return top matching jobs
  return locationFilteredJobs.slice(0, limit);
}


export { locationMap, locationVariations };
