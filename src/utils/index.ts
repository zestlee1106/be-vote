export const getCookieByString = (cookieHeader: string) => {
  const cookies = cookieHeader.split('; ').reduce(
    (acc, cookie) => {
      const [key, value] = cookie.split('=');
      acc[key] = value;
      return acc;
    },
    {} as { [key: string]: string },
  );

  return cookies;
};
