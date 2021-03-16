import { useState } from "react";
import axios from "axios";

const PostCreate = () => {
  const [title, setTitle] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault(); //prevent the from from submitting itself directly we will handle this callback

    // K8s is being used with nginx-ingress srv, CHANGE THIS TO localhost:4000 otherwise
    // Since nginx-ingress does not understand http methods [POST, GET], adding a new path as a workaround as follow {/posts/create} for the post request, CHANGE THIS TO {/posts} otherwise.
    await axios.post("http://posts.com/posts/create", {
      title,
    });

    setTitle("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group" style={{ paddingBottom: "10px" }}>
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default PostCreate;
