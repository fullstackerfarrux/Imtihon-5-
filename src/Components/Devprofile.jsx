import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Devprofile = ({ profile }) => {
  const [git, setGit] = useState([]);

  useEffect(() => {
    async function devprofile() {
      try {
        let { data } = await axios.get(
          `/profile/github/${profile?.githubusername}`
        );
        setGit(data);
      } catch (error) {
        console.log(error);
      }
    }
    devprofile();
  }, []);
  console.log(git);
  return (
    <div id="profile">
      <button>
        <Link to="/profile" className="back">
          Back To Profiles
        </Link>
      </button>
      <div className="box">
        <img src={profile?.user?.avatar} alt="avatar" />
        <h1>{profile?.user?.name}</h1>
        <div className="flex">
          <p>{profile?.status}</p>
          <p className="at">{profile?.company ? "at" : ""}</p>
          <p>{profile?.company}</p>
        </div>
        <div className="flex">
          {profile?.social?.facebook !== "" ? (
            <a target="_blank" href={profile?.social?.facebook}>
              <i className="fa-brands fa-square-facebook"></i>
            </a>
          ) : (
            " "
          )}
          {profile?.social?.instagram !== "" ? (
            <a target="_blank" href={profile?.social?.instagram}>
              <i className="fa-brands fa-instagram"></i>
            </a>
          ) : (
            " "
          )}
          {profile?.social?.linkedin !== "" ? (
            <a target="_blank" href={profile?.social?.linkedin}>
              <i className="fa-brands fa-linkedin"></i>
            </a>
          ) : (
            " "
          )}
          {profile?.social?.twitter !== "" ? (
            <a target="_blank" href={profile?.social?.twitter}>
              <i className="fa-brands fa-twitter"></i>
            </a>
          ) : (
            " "
          )}
          {profile?.social?.youtube !== "" ? (
            <a target="_blank" href={profile?.social?.youtube}>
              <i className="fa-brands fa-youtube youtube"></i>
            </a>
          ) : (
            " "
          )}
        </div>
      </div>
      <div className="box-bio">
        {profile?.bio ? <h2>{profile?.user?.name?.split(" ", 1)}s Bio</h2> : ""}
        {profile?.bio ? <p>{profile?.bio}</p> : ""}
        <div className="skillbox">
          <h2>Skill Set</h2>
          <div className="flex skillsbox">
            {profile?.skills?.map((b, index) => (
              <div key={index} className="flex">
                <i className="fa-solid fa-check"></i>
                <p className="skills">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="experience">
          <h2>Experience</h2>
          {profile.experience?.length ? (
            <p></p>
          ) : (
            <h3>No experience credentials</h3>
          )}
          {profile?.experience?.map((a, i) => (
            <div key={i}>
              {a.company ? <h5 className="company">{a?.company}</h5> : <p></p>}
              {a.from ? (
                <p className="watch">{a?.from?.slice(0, 10)} - Now</p>
              ) : (
                <p></p>
              )}

              {a.title ? (
                <div className="flex">
                  <h5>Position:</h5>
                  <p className="position">{a?.title}</p>
                </div>
              ) : (
                <p></p>
              )}
              {a.location ? (
                <div className="flex">
                  <h5>Location:</h5>
                  <p className="position">{a?.location}</p>
                </div>
              ) : (
                <p></p>
              )}
              {a.description ? (
                <div className="flex">
                  <h5>Description:</h5>
                  <p className="position">{a?.description}</p>
                </div>
              ) : (
                <p></p>
              )}
              <hr />
            </div>
          ))}
        </div>
        <div className="education">
          <h2>Education</h2>
          {profile.education?.length ? (
            <p></p>
          ) : (
            <h3>No experience credentials</h3>
          )}
          {profile?.education?.map((a, i) => (
            <div key={i}>
              {a.school ? <h5 className="company">{a?.school}</h5> : <p></p>}
              {a.from ? (
                <p className="watch">{a?.from?.slice(0, 10)} - Now</p>
              ) : (
                <p></p>
              )}

              {a.degree ? (
                <div className="flex">
                  <h5>Degree:</h5>
                  <p className="position">{a?.degree}</p>
                </div>
              ) : (
                <p></p>
              )}
              {a.fieldofstudy ? (
                <div className="flex">
                  <h5>Field Of Study:</h5>
                  <p className="position">{a?.fieldofstudy}</p>
                </div>
              ) : (
                <p></p>
              )}
              {a.description ? (
                <div className="flex">
                  <h5>Description:</h5>
                  <p className="position">{a?.description}</p>
                </div>
              ) : (
                <p></p>
              )}
              <hr />
            </div>
          ))}
        </div>
      </div>
      {profile?.githubusername !== "" ? (
        <div className="git">
          <h2>Github Repos</h2>
          {git?.map((git, index) => (
            <div key={index} className="gitbox">
              <a
                target={"_blank"}
                href={`https://github.com/${git?.full_name}`}
              >
                {git?.name}
              </a>
              <div className="stars ">
                <span className="starstext">
                  Stars: {git?.stargazers_count}
                </span>
                <span className="watcherstext">
                  Watchers: {git?.watchers_count}
                </span>
                <span className="forkstext">Forks: {git?.forks_count}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Devprofile;
