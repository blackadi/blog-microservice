import axios from "axios";
import { useEffect, useState } from "react";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const res = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    );

    setComments(res.data);
  };

  useEffect(() => {
    fetchComments();
  }, []); //run this fuhction only one time when the component is first displayed

  const renderedComments = Object.values(comments).map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });
  return <ul>{renderedComments}</ul>;
};

export default CommentList;
