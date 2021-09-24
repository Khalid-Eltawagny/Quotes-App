import classes from "./QuoteList.module.css";
import QuoteItem from "./QuoteItem";
import { Fragment } from "react";
import { useLocation, useHistory } from "react-router";

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  console.log(props) ; 
  const location = useLocation();
  const history = useHistory();
  const queryParams = new URLSearchParams(location.search);
  const isAscending = queryParams.get("sort") === "asc";
  const changeSortHandler = () => {
    history.push("/quotes?sort=" + (isAscending ? "desc" : "asc"));
  };
  const sortedQuotes = sortQuotes(props.quotes, isAscending);
  const list = sortedQuotes.map((quote) => {
    return (
      <QuoteItem
        text={quote.text}
        author={quote.author}
        id={quote.id}
        key={quote.id}
      />
    );
  });

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortHandler}>
          Sort {isAscending ? "Descending" : "Ascending"}
        </button>
      </div>
      <ul className={classes.list}>{list}</ul>
    </Fragment>
  );
};
export default QuoteList;
