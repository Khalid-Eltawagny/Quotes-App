import classes from "./QuoteItem.module.css";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router";
const QuoteItem = (props) => {
  const routeMatch = useRouteMatch() ;
  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.text}</p>
        </blockquote>
        <figcaption>{props.author}</figcaption>
      </figure>
      <Link className="btn" to = {`${routeMatch.url}/${props.id}`}>View Fullscreen</Link>
    </li>
  );
};
export default QuoteItem;
