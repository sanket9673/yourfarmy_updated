// This normalizer:
// ensures https:// if missing,
// strips trailing slashes from base so ${base}/route becomes https://host/route (no //).


// src/services/api.js
function normalizeBase(url) {
    if (!url) return url;
    // ensure protocol present
    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url;
    }
    // remove trailing slashes
    return url.replace(/\/+$/, '');
  }
  
  const envBase = import.meta.env.VITE_API_URL; // Vite
  const fallback = import.meta.env.DEV ? 'http://localhost:8081' : 'https://yourfarmyupdated-production.up.railway.app';
  
  const API_BASE_URL = normalizeBase(envBase || fallback);
  
  console.log('Using API base URL:', API_BASE_URL); // verify in browser console
  
  export default API_BASE_URL;
  