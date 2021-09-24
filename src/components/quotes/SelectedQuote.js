import classes from "./SelectedQuote.module.css";

const SelectedQuote = (props) => {
  return (
    <figure className={classes.quote}>
        <p>{props.text}</p>
        <figcaption>{props.author}</figcaption>
    </figure>
  );
};

export default SelectedQuote;
