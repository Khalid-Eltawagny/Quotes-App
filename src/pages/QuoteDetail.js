import { Fragment } from "react";
import { Link } from "react-router-dom";
import SelectedQuote from "../components/quotes/SelectedQuote";
import { useRouteMatch } from "react-router";
import { Route } from "react-router";
import { useParams } from "react-router";
import Comments from "../components/comments/Comments";
import useHttp from "../hooks/useHttp";
import { getSingleQuote } from "../lib/api";
import { useEffect } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuoteDetail = () => {
  const routeMatch = useRouteMatch();
  const params = useParams();
  const quoteId = params.id;
  const {
    sendRequest,
    data: quoteDetail,
    error,
    state,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (state === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!quoteDetail.text) {
    return <p>No quote found!</p>;
  }
  return (
    <Fragment>
      <SelectedQuote text={quoteDetail.text} author={quoteDetail.author} />
      <Route path={`${routeMatch.path}`} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${routeMatch.url}/comments`}>
            Show Comments
          </Link>
        </div>
      </Route>
      <Route path={`${routeMatch.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};
export default QuoteDetail;
