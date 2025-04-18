import { Routes, Route } from 'react-router-dom';
import { getSuperTokensRoutesForReactRouterDom } from 'supertokens-auth-react/ui';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';
import * as ReactRouter from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';
import { lazy, Suspense } from 'react';
import Layout from '../components/Layout/Layout';
import { PreBuiltUIList } from '../config';
import { MutatingDots } from 'react-loader-spinner'; // Import the MutatingDots spinner
import { EmailVerificationPreBuiltUI } from "supertokens-auth-react/recipe/emailverification/prebuiltui";


const Home = lazy(() => import('../Home'));
const Dashboard = lazy(() => import('../Dashboard'));
const DeepProtac = lazy(() => import('../container/ModalityDetail'));
const ModalityDetail = lazy(() => import('../container/ModalityDetail'));
const TryModel = lazy(() => import('../container/TryModel'));
const NotFound = lazy(() => import('../components/Layout/NotFound'));

export default function AppRoutes() {
  return (
    <Suspense
      fallback={
        <MutatingDots
          visible={true}
          height="100"
          width="100"
          color="blue"
          secondaryColor="#00BFFF"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
          wrapperClass=""
        />
      }
    >
      <ScrollToTop />
      <Routes>
        {getSuperTokensRoutesForReactRouterDom(ReactRouter, [...PreBuiltUIList, EmailVerificationPreBuiltUI])}

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<SessionAuth><Dashboard /></SessionAuth>} />
          <Route path="deep-protac" element={<SessionAuth><DeepProtac /></SessionAuth>} />
          <Route path="modal-detail/:id" element={<ModalityDetail />} />
          <Route path="/model/:modelId" element={<SessionAuth><TryModel /></SessionAuth>} />
          {/* <Route path="try-model"element={<SessionAuth><TryModel /></SessionAuth>}/> */}
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* Optional: catch-all for any unknown paths outside of layout */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
