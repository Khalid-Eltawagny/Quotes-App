import classes from "./CommentForm.module.css";
import { useRef } from "react";
import useHttp from "../../hooks/useHttp";
import { addComment } from "../../lib/api";
import { useEffect } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
const CommentForm = (props) => {
  const commentTextRef = useRef();
  const { sendRequest, error, state } = useHttp(addComment);
  useEffect(() => {
    if (state === "completed" && !error) {
      props.onAddedComment();
    }
  }, [state, error, props.onAddedComment]);

  const submitFormHandler = (event) => {
    event.preventDefault();
    const enteredText = commentTextRef.current.value;
    sendRequest({ quoteId: props.quoteId, text: enteredText });
  };
  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {state === "pending" && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default CommentForm;
