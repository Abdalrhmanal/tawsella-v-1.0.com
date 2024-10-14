export const rootPaths = {
  homeRoot: '',
  pagesRoot: 'pages',

  calculationsRoot: 'calculations',

  applicationsRoot: 'applications',
  ecommerceRoot: 'ecommerce',

  authRoot: 'authentication',
  
  notificationsRoot: 'notifications',
  calendarRoot: 'calendar',
  driversRoot: 'drivers',
  taxiRoot: 'taxi',
  usersRoot: 'users',
  settingRoot: 'setting',
  offersRoot: 'offers',
  servicesRoot: 'services',
  orderRoot: 'orders',
  reportsRoot: 'reports',
  contactRoot: 'contact',
  errorRoot: 'error',
};

export default {
  home: `/${rootPaths.homeRoot}`, /* ---- Path Home Pages ---- */
  
  /* ----------------Start paths Users---------------------- */
  users: `/${rootPaths.usersRoot}`, 
  /* ----------------End paths Users---------------------- */
  
  /* ----------------Start paths Drivers---------------------- */
  drivers: `/${rootPaths.driversRoot}`,
  adddriver: `/${rootPaths.driversRoot}/add-driver`,
  /* ----------------End paths Drivers---------------------- */
  calculations: `/${rootPaths.calculationsRoot}`,
    /* ----------------Start paths Drivers---------------------- */
    taxi: `/${rootPaths.taxiRoot}`,
    addtaxi: `/${rootPaths.taxiRoot}/add-taxi`,
    /* ----------------End paths Drivers---------------------- */

  /* ----------------Start Paths Setting----------------------- */
  about: `/${rootPaths.settingRoot}/about`,
  profile: `/${rootPaths.settingRoot}/profile`,
  /* ----------------End Paths Setting----------------------- */

  /* ----------------Start Paths Offers----------------------- */
  offers: `/${rootPaths.offersRoot}`,
  createOffer: `/${rootPaths.offersRoot}/o-create`,
  offerDetails: `/${rootPaths.offersRoot}/o-detailse`,
  /* ----------------End Paths Offers----------------------- */

  /* ----------------Start Paths Services----------------------- */
  services: `/${rootPaths.servicesRoot}`,
  createService: `/${rootPaths.servicesRoot}/s-create`,
  serviceDetails: `/${rootPaths.servicesRoot}/s-details`,
  /* ----------------End Paths Services----------------------- */

  /* ----------------Start Paths Orders----------------------- */
  orders: `/${rootPaths.orderRoot}`,
  orderNow: `/${rootPaths.orderRoot}/new-order`,
  /* ----------------End Paths Orders----------------------- */

  /* ----------------Start Paths Reports----------------------- */
  driversReports: `/${rootPaths.reportsRoot}`,
  reportsDriver: `/${rootPaths.reportsRoot}/d-reports`,
  /* ----------------End Paths Reports----------------------- */

  /* ----------------Start Paths Contact----------------------- */
  contact: `/${rootPaths.contactRoot}`,
  infoContact: `/${rootPaths.contactRoot}/info`,
  userMessage: `/${rootPaths.contactRoot}/u-message`,
  /* ----------------End Paths Contact----------------------- */

  /* ----------------Start Paths Auth----------------------- */
  login: `/${rootPaths.authRoot}/login`,
  signup: `/${rootPaths.authRoot}/sign-up`,
  resetPassword: `/${rootPaths.authRoot}/reset-password`,
  forgotPassword: `/${rootPaths.authRoot}/forgot-password`,
  changePassword: `/${rootPaths.authRoot}/change-password`,
  /* ----------------End Paths Auth----------------------- */

  404: `/${rootPaths.errorRoot}/404`,
};
