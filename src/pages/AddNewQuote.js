import QuoteFrom from "../components/quotes/QuoteForm";
import { Fragment } from "react";
import useHttp from "../hooks/useHttp";
import { addQuote } from "../lib/api";
import { useHistory } from "react-router";
import { useEffect } from "react";
const AddNewQuote = () => {
  const { sendRequest, state } = useHttp(addQuote);
  const history = useHistory();
  useEffect(() => {
    if (state === "completed") {
      history.push("/quotes");
    }
  }, [state]);
  const addQuoteHandler = (quoteData) => {
    sendRequest(quoteData);
  };
  return (
    <Fragment>
      <QuoteFrom isLoading={state === "pending"} onAddQuote={addQuoteHandler} />
    </Fragment>
  );
};
export default AddNewQuote;
