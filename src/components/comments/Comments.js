import classes from "./Comments.module.css";
import { useCallback, useState } from "react";
import CommentForm from "./CommentForm";
import useHttp from "../../hooks/useHttp";
import { getAllComment } from "../../lib/api";
import { useEffect } from "react";
import { useParams } from "react-router";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentList from "./CommentList" ; 
const Comments = () => {
  const {
    sendRequest,
    data: allComments,
    error,
    state,
  } = useHttp(getAllComment);
  const params = useParams();
  const quoteId = params.id;
  console.log(params);
  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  const onAddedComment = useCallback(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);
  const [isAddingComment, setIsAddingComment] = useState(false);
  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  let comments;
  if (state === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (state === "completed" && allComments && allComments.length !== 0) {
    comments = <CommentList comments={allComments} />;
  }

  if (state === "completed" && (!allComments || allComments.length === 0)) {
    comments = <p className="centered"> No comments were added yet!</p>;
  }
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <CommentForm onAddedComment={onAddedComment} quoteId={quoteId} />
      )}
      {comments}
    </section>
  );
};
export default Comments;
