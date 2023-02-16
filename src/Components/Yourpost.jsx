import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Headerdash from "./Headerdash";
import Links from "./Links";
import { toast } from "react-toastify";
import axios from "axios";

const Yourpost = () => {
  const { users_id } = useParams();
  const [myid, setmyId] = useState([]);
  const [p, setProfile] = useState([]);
  const [commentext, setCommentext] = useState({
    text: "",
  });

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
  useEffect(() => {
    async function devprofile() {
      try {
        // setLoading(true);
        let { data } = await axios.get(`posts/${users_id}`);
        setProfile(data);
        toast(data.message, { type: "success" });
      } catch (error) {
        toast(error?.message, { type: "error" });
      }
      //   finally {
      //     setLoading(false);
      //   }
    }
    devprofile();
  }, []);
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

  async function commentCreate(e) {
    e.preventDefault();

    try {
      let { data } = await axios.post(`/posts/comment/${p?._id}`, commentext);
    } catch (error) {}

    e.target.reset();
  }

  async function deleteComment(id) {
    try {
      await axios.delete(`/posts/comment/${p?._id}/${id}`);
      toast("Komment o'chirildi", { type: "success" });
    } catch (error) {
      if (error) return;
    }
  }

  function textInput(e) {
    setCommentext((eski) => ({
      ...eski,
      [e.target.name]: e.target.value,
    }));
  }
  return (
    <div id="yourpost">
      <Headerdash />
      <div className="container">
        <button>
          <Link to={"/posts"} className="backposts">
            Back To Posts
          </Link>
        </button>
        <div className="postbox flex">
          <Link to={`/profile/${p.user}`} className="profilebox">
            <img src={p.avatar} alt="avatar" />
            <h5>{p?.name}</h5>
          </Link>
          <div className="texts">
            <p>{p?.text}</p>
            <p className="posted">Posted on {p?.date?.slice(0, 10)}</p>
            <div className="flex">
              <button className="like" onClick={() => like(p?._id)}>
                <i className="fa-solid fa-thumbs-up"></i>
                <p>{p?.likes?.length}</p>
              </button>
              <button className="dislike" onClick={() => dislike(p?._id)}>
                <i className="fa-solid fa-thumbs-down"></i>
              </button>
              <button className="discussion">
                <Link to={`/posts/${p._id}`}>Discussion</Link>
              </button>
            </div>
          </div>
        </div>
        <form onSubmit={commentCreate}>
          <h4 className="leave">Leave a comment</h4>
          <textarea
            name="text"
            id="comment"
            cols="150"
            rows="4"
            placeholder="Create a post"
            onChange={textInput}
          />
          <button className="submit">Submit</button>
        </form>
        {p?.comments?.map((c, index) => {
          return (
            <div key={index} className="commentbox flex">
              <div>
                <Link to={`/profile/${c?.user}`}>
                  <img src={c?.avatar} alt="profile image" />
                </Link>
                <Link to={`/profile/${c?.user}`}>
                  <h3 className="">{c?.name}</h3>
                </Link>
              </div>
              <div className="commentname">
                <p>{c?.text}</p>
                <p className="posted">Posted on {c?.date?.slice(0, 10)}</p>
                {console.log(c)}
                {myid.user?._id === c.user ? (
                  <button className="x" onClick={() => deleteComment(c?._id)}>
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          );
        })}
        {console.log(p)}
      </div>
    </div>
  );
};

export default Yourpost;
