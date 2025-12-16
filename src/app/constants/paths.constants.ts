export const ROOT_PATHS = {
    home: '',
    about: 'about',
    error404: '404',
};

export const AUTHENTICATION_PATHS = {
  base: 'auth',
  logIn: 'log-in',
  register: 'register',
  myAccount: 'my-account',
};

export const ROOT_URLS = {
  home: `/${ROOT_PATHS.home}`,
  error404: `/${ROOT_PATHS.error404}`,
};

export const AUTH_URLS = {
  logIn: `/${AUTHENTICATION_PATHS.base}/${AUTHENTICATION_PATHS.logIn}`,
  register: `/${AUTHENTICATION_PATHS.base}/${AUTHENTICATION_PATHS.register}`,
  myAccount: `/${AUTHENTICATION_PATHS.base}/${AUTHENTICATION_PATHS.myAccount}`,
};

