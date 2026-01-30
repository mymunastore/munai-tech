/**
 * Privacy-first user agent parser
 * Extracts only coarse device and browser categories - no fingerprinting
 */

export const parseDeviceCategory = (userAgent: string): string => {
  if (!userAgent) return 'unknown';
  
  const ua = userAgent.toLowerCase();
  
  // Check for mobile devices first
  if (/mobile|android(?!.*tablet)|iphone|ipod|blackberry|opera mini|iemobile/.test(ua)) {
    return 'mobile';
  }
  
  // Check for tablets
  if (/tablet|ipad|playbook|silk|android(?!.*mobile)/.test(ua)) {
    return 'tablet';
  }
  
  // Default to desktop
  return 'desktop';
};

export const parseBrowserCategory = (userAgent: string): string => {
  if (!userAgent) return 'unknown';
  
  const ua = userAgent.toLowerCase();
  
  // Order matters - check more specific patterns first
  if (/edg/.test(ua)) return 'edge';
  if (/opr|opera/.test(ua)) return 'opera';
  if (/firefox|fxios/.test(ua)) return 'firefox';
  if (/safari/.test(ua) && !/chrome|chromium/.test(ua)) return 'safari';
  if (/chrome|chromium|crios/.test(ua)) return 'chrome';
  
  return 'other';
};
