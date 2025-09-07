// utils/auth.ts
export interface AuthData {
  code: string;
  timestamp: number;
  expiresAt: number;
}

export const checkAuth = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    const authData = localStorage.getItem('crichow_auth');
    if (!authData) return false;
    
    const parsed: AuthData = JSON.parse(authData);
    const now = Date.now();
    
    // Check if the session has expired
    if (now > parsed.expiresAt) {
      localStorage.removeItem('crichow_auth');
      return false;
    }
    
    return true;
  } catch (error) {
    localStorage.removeItem('crichow_auth');
    return false;
  }
};

export const logout = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('crichow_auth');
  }
};

export const getTimeUntilExpiry = (): string => {
  if (typeof window === 'undefined') return '';
  
  try {
    const authData = localStorage.getItem('crichow_auth');
    if (!authData) return '';
    
    const parsed: AuthData = JSON.parse(authData);
    const now = Date.now();
    const timeLeft = parsed.expiresAt - now;
    
    if (timeLeft <= 0) return 'Expired';
    
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  } catch (error) {
    return '';
  }
};