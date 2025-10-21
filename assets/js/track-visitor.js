export function initializeVisitorTracking() {
  // Function to parse query parameters
  function getQueryParams() {
    const params = {};
    new URLSearchParams(window.location.search).forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }

  // Calculate load time using Navigation Timing API
  const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;

  fetch('https://x8ki-letl-twmt.n7.xano.io/api:CfCVZiDW/capture_visitor_data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      page_url: window.location.href,
      referrer: document.referrer,
      query_params: getQueryParams(),
      user_agent: navigator.userAgent,
      load_time_ms: loadTime > 0 ? loadTime : 0, // Ensure loadTime is not negative
    }),
  })
  .then(response => {
    if (!response.ok) {
      console.error('Failed to capture visitor data:', response.statusText);
    }
    return response.json();
  })
  .then(data => {
    console.log('Visitor data captured:', data);
  })
  .catch(error => {
    console.error('Error capturing visitor data:', error);
  });
}