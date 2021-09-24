import { Route, Switch } from "react-router";
import AllQuotes from "./pages/AllQuotes";
import Layout from "./components/layout/Layout";
import { Redirect } from "react-router";
import { Suspense } from "react";
import React from "react";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const AddNewQuote = React.lazy(() => {
  return import("./pages/AddNewQuote");
});

const QuoteDetail = React.lazy(() => {
  return import("./pages/QuoteDetail");
});

const NotFound = React.lazy(() => {
  return import("./pages/NotFound");
});

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes" />
          </Route>
          <Route path="/quotes" exact>
            <AllQuotes />
          </Route>
          <Route path="/quotes/:id">
            <QuoteDetail />
          </Route>
          <Route path="/newQuote">
            <AddNewQuote />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
