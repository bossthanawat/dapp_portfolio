import React, { lazy } from "react";
import "./App.css";
import { Router, Route, Switch } from "react-router-dom";
import history from "./routerHistory";
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import PageLoader from './components/PageLoader'

// import Home from "./views/Home"
// import Dashboard from "./views/Dashboard"
const Home = lazy(() => import("./views/Home"));
const Dashboard = lazy(() => import("./views/Dashboard"));

const App = () => {
  return (
    <>
      <SuspenseWithChunkError fallback={<PageLoader />}>
        <Router history={history}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/dashboard/:accountId">
              <Dashboard />
            </Route>
          </Switch>
        </Router>
      </SuspenseWithChunkError>
    </>
  );
};

export default React.memo(App);
