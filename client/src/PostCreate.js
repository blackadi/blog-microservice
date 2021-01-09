import { useState } from "react";
import axios from "axios";

const PostCreate = () => {
  const [title, setTitle] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault(); //prevent the from from submitting itself directly we will handle this callback

    //Im connecting to ks8 using ngix-ingress srv, CHANGE THIS TO localhost:4000 if you are not using ks8
    // Since ngix-ingress does not understand http call methods [POST, GET], I created /create path for post request, CHANGE THIS TO /post if running as a localhost
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
