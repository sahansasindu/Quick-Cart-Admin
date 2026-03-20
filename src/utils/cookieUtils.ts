import Cookies from 'js-cookie';

export const setCookie = (name: string, value: string, hours: number = 9) => {
  const expires = new Date(new Date().getTime() + hours * 60 * 60 * 1000);
  Cookies.set(name, value, { expires, path: '/' });
};

export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};

export const removeCookie = (name: string) => {
  Cookies.remove(name, { path: '/' });
};

export const clearAllCookies = () => {
  const allCookies = Cookies.get();
  Object.keys(allCookies).forEach(cookieName => {
    Cookies.remove(cookieName, { path: '/' });
  });
};

export const hasCookie = (name: string): boolean => {
  return !!Cookies.get(name);
};
