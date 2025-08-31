export const isTokenValid = (): boolean => {
  const token = localStorage.getItem('token');

  if (!token) {
    return false;
  }

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));

    const currentTime = Math.floor(Date.now() / 1000);

    if (payload.exp && payload.exp < currentTime) {
      localStorage.removeItem('token');
      return false;
    }

    return true;
  } catch {
    localStorage.removeItem('token');
    return false;
  }
};
