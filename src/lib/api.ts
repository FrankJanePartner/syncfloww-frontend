

// API configuration using environment variables
export const API_CONFIG = {
  BASE_URL: import.meta.env.API_BASE_URL || 'http://localhost:8000/api/',
  ENDPOINTS: {
    USER: 'accounts/auth/user/',
    AUTH: {
      LOGIN: 'accounts/auth/login/',
      SIGNUP: 'accounts/auth/register/',
      FORGOT_PASSWORD: 'accounts/auth/forgot-password/',
      RESET_PASSWORD: 'accounts/auth/reset-password/',
      VERIFY_EMAIL: 'accounts/auth/verify-email/'
    },
    POSTS: {
      CREATE: '/posts',
      LIST: '/posts',
      UPDATE: '/posts/:id',
      DELETE: '/posts/:id',
      SCHEDULE: '/posts/:id/schedule'
    },
    ANALYTICS: {
      DASHBOARD: '/analytics/dashboard',
      PLATFORM_STATS: '/analytics/platforms',
      ENGAGEMENT: '/analytics/engagement'
    },
    CAMPAIGNS: {
      LIST: '/campaigns',
      CREATE: '/campaigns',
      UPDATE: '/campaigns/:id',
      DELETE: '/campaigns/:id',
      STATS: '/campaigns/stats'
    },
    WORKFLOWS: {
      LIST: '/workflows',
      CREATE: '/workflows',
      UPDATE: '/workflows/:id',
      DELETE: '/workflows/:id'
    }
  }
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string, params?: Record<string, string>) => {
  let url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`:${key}`, value);
    });
  }
  
  return url;
};

// Example usage:
// buildApiUrl(API_CONFIG.ENDPOINTS.POSTS.UPDATE, { id: '123' })
// Results in: https://api.syncflow.com/posts/123

