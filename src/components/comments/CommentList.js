import classes from "./CommentList.module.css";
import CommentItem from "./CommentItem";
const CommentList = (props) => {
  const comments = props.comments.map((comment, indx) => (
    <CommentItem text={comment.text} key={indx} />
  ));
  return <ul className={classes.comment}>{comments}</ul>;
};
export default CommentList;
