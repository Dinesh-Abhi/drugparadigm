import { Routes, Route } from 'react-router-dom';
import { getSuperTokensRoutesForReactRouterDom } from 'supertokens-auth-react/ui';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';
import * as ReactRouter from 'react-router-dom';
import { lazy, Suspense } from 'react';

import Layout from '../components/Layout/Layout';
import { PreBuiltUIList } from '../config';

// Lazy-loaded components
const Home = lazy(() => import('../Home'));
const Dashboard = lazy(() => import('../Dashboard'));
const DeepProtac = lazy(() => import('../container/ModalityDetail'));
const ModalityDetail = lazy(() => import('../container/ModalityDetail'));
const TryModel = lazy(() => import('../container/TryModel'));
const NotFound = lazy(() => import('../components/Layout/NotFound'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {getSuperTokensRoutesForReactRouterDom(ReactRouter, PreBuiltUIList)}

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="dashboard"
            element={
              <SessionAuth>
                <Dashboard />
              </SessionAuth>
            }
          />
          <Route
            path="deep-protac"
            element={
              <SessionAuth>
                <DeepProtac />
              </SessionAuth>
            }
          />
          <Route path="modal-detail/:id" element={<ModalityDetail />} />
          <Route path="/model/:modelId" element={<SessionAuth><TryModel /></SessionAuth>} />
          {/* <Route
            path="try-model"
            element={
              <SessionAuth>
                <TryModel />
              </SessionAuth>
            }
          /> */}
          {/* 404 Not Found route for unknown paths inside layout */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Optional: catch-all for any unknown paths outside of layout */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
