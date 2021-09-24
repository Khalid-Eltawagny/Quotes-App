import classes from "./QuoteForm.module.css";
import { Fragment } from "react";
import Card from "../UI/Card";
import { useRef, useState } from "react";
import { Prompt } from "react-router";
import LoadingSpinner from "../UI/LoadingSpinner" ;
const QuoteForm = (props) => {
  const authorInputRef = useRef();
  const textInputRef = useRef();
  const [isEntering, setIsEntering] = useState(false);
  const [isValid,setIsValid] = useState(true) ; 
  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;
    
    // optional: Could validate here
    if (enteredAuthor.trim().length === 0 || enteredText.trim().length === 0 ){
      setIsValid(false) ; 
      return ; 
    }
    else setIsValid(true) ; 
    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }

  const formFocus = () => {
    setIsEntering(true);
  };

  const submitHandler = () => {
    setIsEntering(false);
  };
  return (
    <Fragment>
      <Prompt
        when={isEntering}
        message={() => "Are you sure you want to leave ?"}
      />
      <Prompt
      when = {!isValid}
      message={() => "The quote and author name musn't be empty"}
      />
      <Card>
        <form
          onSubmit={submitFormHandler}
          className={classes.form}
          onFocus={formFocus}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}
          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" ref={authorInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button onClick={submitHandler} className="btn">
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};
export default QuoteForm;
