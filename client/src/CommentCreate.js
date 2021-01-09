import axios from "axios";
import { useState } from "react";

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    //Im connecting to ks8 using ngix-ingress srv, CHANGE THIS TO localhost:4001 if you are not using ks8
    await axios.post(`http://posts.com/posts/${postId}/comments`, {
      content,
    });

    setContent("");
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group" style={{ paddingBottom: "10px" }}>
          <label>New Comments</label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Sumbit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
