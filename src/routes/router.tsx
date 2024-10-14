import { Suspense, lazy } from 'react';
import { Outlet, RouteObject, createBrowserRouter } from 'react-router-dom';
import paths, { rootPaths } from './paths';

import PageLoader from '../components/loading/PageLoader';
import Splash from '../components/loading/Splash';
import { AuthProvider } from '../context/AuthContext';
import AuthRoute from '../components/AuthRoute';
import ChangePassword from 'pages/authentication/ChangePassword';
import DriversAll from 'pages/home/Drivers/page';
import CreateDriver from 'pages/home/Drivers/creaateDriver/page';
import OffersAll from 'pages/home/offers/page';
import CreateOffer from 'pages/home/offers/createOffer';
import OfferDetails from 'pages/home/offers/details';
import ServicesAll from 'pages/home/services/page';
import CreateService from 'pages/home/services/create-service';
import ServiceDetails from 'pages/home/services/service-details';
import OrdersAll from 'pages/home/orders/page';
import DriversReports from 'pages/home/reports/page';
import ReportsDriver from 'pages/home/reports/reportsDriver';
import ContactInfo from 'pages/home/contact/contact-Info';
import UserMessage from 'pages/home/contact/user-message';
import TaxiAll from 'pages/home/taxi/page';
import CreateTaxi from 'pages/home/taxi/create-taxi';
import Abute from 'pages/home/settings/abute';
import Pprofile from 'pages/home/settings/profile';
import Calculations from 'pages/home/Calculations/page';
const App = lazy(() => import('App'));
const MainLayout = lazy(() => import('layouts/main-layout'));
const AuthLayout = lazy(() => import('layouts/auth-layout'));

const Error404 = lazy(() => import('pages/errors/Error404'));
const Home = lazy(() => import('pages/home/page'));
const Login = lazy(() => import('pages/authentication/Login'));
const SignUp = lazy(() => import('pages/authentication/SignUp'));
const ResetPassword = lazy(() => import('pages/authentication/ResetPassword'));
const ForgotPassword = lazy(() => import('pages/authentication/ForgotPassword'));

const routes: RouteObject[] = [
  {
    element: (
      <AuthProvider>
        <Suspense fallback={<Splash />}>
          <App />
        </Suspense>
      </AuthProvider>
    ),
    children: [
      {
        path: rootPaths.authRoot,
        element: (
          <AuthLayout>
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </AuthLayout>
        ),
        children: [
          { path: paths.login, element: <Login /> },
          { path: paths.signup, element: <SignUp /> },
          { path: paths.resetPassword, element: <ResetPassword /> },
          { path: paths.forgotPassword, element: <ForgotPassword /> },
          { path: paths.changePassword, element: <ChangePassword /> },
        ],
      },
      {
        element: <AuthRoute />, // حماية المسارات المحمية
        children: [
          {
            path: rootPaths.homeRoot,
            element: (
              <MainLayout>
                <Suspense fallback={<PageLoader />}>
                  <Outlet />
                </Suspense>
              </MainLayout>
            ),
            children: [
              { path: paths.home, element: <Home /> },
              { path: paths.drivers, element: <DriversAll /> },
              { path: paths.adddriver, element: <CreateDriver /> },
              { path: paths.taxi, element: <TaxiAll /> },
              { path: paths.about, element: <Abute /> },
              { path: paths.profile, element: <Pprofile /> },
              { path: paths.addtaxi, element: <CreateTaxi /> },
              { path: paths.offers, element: <OffersAll/> },
              { path: paths.createOffer, element: <CreateOffer /> },
              { path: paths.offerDetails, element: <OfferDetails /> },
              { path: paths.services, element: <ServicesAll /> },
              { path: paths.createService, element: <CreateService /> },
              { path: paths.serviceDetails, element: <ServiceDetails /> },
              { path: paths.orders, element: <OrdersAll /> },
              { path: paths.calculations, element: <Calculations /> },
              { path: paths.driversReports, element: <DriversReports /> },
              { path: paths.reportsDriver, element: <ReportsDriver /> },
              { path: paths.contact, element: <ContactInfo /> },
              { path: paths.infoContact, element: <ContactInfo /> },
              { path: paths.userMessage, element: <UserMessage /> },
            ],
          },
        ],
      },
      {
        path: '*',
        element: <Error404 />,
      },
    ],
  },
];
const router = createBrowserRouter(routes, { basename: '/' });

export default router;
