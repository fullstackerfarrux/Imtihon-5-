import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";

const Posts = () => {
  const { user_id } = useParams();
  const [myid, setmyId] = useState([]);
  const [post, setPost] = useState([]);
  const [postc, setPostc] = useState([]);
  const [del, setDel] = useState(true);
  const [comment, setComment] = useState({
    text: "",
  });

  useEffect(() => {
    async function getPosts() {
      try {
        let { data } = await axios.get("/posts");
        setPost(data);
        toast("Postlar tamojniydan otib keldi", { type: "success" });
      } catch (error) {
        toast(error?.response?.data?.errors[0]?.msg, { type: "error" });
      }
    }
    getPosts();
  }, []);
  async function postPost(e) {
    e.preventDefault();

    try {
      let { data } = await axios.post("/posts", comment);
      setPostc(data);
      console.log(data);

      //   getPost;
      toast("Komment jo'natildi", { type: "success" });
    } catch (error) {
      toast(error?.response?.data?.errors[0]?.msg, { type: "error" });
    }
  }

  useEffect(() => {
    async function myProfile() {
      try {
        let { data } = await axios.get(`/profile/me`);
        setmyId(data);
        console.log(data);

        toast("Komment jo'natildi", { type: "success" });
      } catch (error) {
        toast(error?.response?.data?.errors[0]?.msg, { type: "error" });
      }
    }
    myProfile();
  }, []);
  async function deleteComment(id) {
    try {
      let data = await axios.delete(`api/posts/${user_id}`);
      console.log(data);
      setDel(!del);
      toast("Post deleted", { type: "info" });
    } catch (error) {
      if (error) return;
    }
  }
  async function like(id) {
    try {
      let data = await axios.put(`/posts/like/${id}`);
    } catch (error) {}
  }
  async function dislike(id) {
    try {
      await axios.put(`/posts/unlike/${id}`);
    } catch (error) {
      if (error) return;
    }
  }

  async function deleteComment(id) {
    try {
      let {
        data: { msg },
      } = await axios.delete(`/posts/${id}`);
      toast(msg, { type: "info" });
    } catch (error) {
      if (error) return;
    }
  }

  function textInput(e) {
    setComment((eski) => ({
      ...eski,
      [e.target.name]: e.target.value,
    }));
  }
  return (
    <div id="posts">
      {console.log(post)}
      <div className="container">
        <h1>Posts</h1>
        <div className="flex">
          <h3>
            <i className="fa-solid fa-user"></i>
            Welcome to the community
          </h3>
        </div>
        <div className="saybox">
          <h4>Say Something...</h4>
        </div>
        <form onSubmit={postPost}>
          <textarea
            name="text"
            id="comment"
            cols="103"
            rows="4"
            placeholder="Create a post"
            value={comment.text}
            onChange={textInput}
          ></textarea>
          <button>Submit</button>
        </form>
        {post.map((p, index) => (
          <div className="postbox flex" key={index}>
            <Link to={`/profile/${p.user}`} className="profilebox">
              <img src={p.avatar} alt="avatar" />
              <h5>{p?.name}</h5>
            </Link>
            <div className="texts">
              <p>{p?.text}</p>
              <p className="posted">Posted on {p?.date?.slice(0, 10)}</p>
              <div className="flex">
                <button onClick={() => like(p?._id)} className="like">
                  <i className="fa-solid fa-thumbs-up"></i>
                  <p>{p?.likes?.length}</p>
                </button>
                <button onClick={() => dislike(p?._id)} className="dislike">
                  <i className="fa-solid fa-thumbs-down"></i>
                </button>
                <button className="discussion">
                  <Link to={`/posts/${p._id}`}>Discussion</Link>
                </button>
                {myid.user?._id === p.user ? (
                  <button className="x" onClick={() => deleteComment(p?._id)}>
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
