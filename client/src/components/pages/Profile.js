import React, { useState } from 'react';
import { fetchData } from "../../main.js";

const Profile = () => {
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [postContent, setPostContent] = useState('');
  
  var postsArr = [];

  const getPosts = fetchData("/post/getAll", 
      {
        "userId": userId,
      },
      "POST")
      .then((data) => {
        if(!data.message) {
          for (const [key, value] of Object.entries(data)) {
            postsArr.push(value);
          }
          setUser(user);
          setUserId(userId);
        }
      })
      .catch((error) => {
        console.log(`Error! ${error.message}`)
      });

  const [posts, setPosts] = useState(postsArr);

  const onSubmit = (e) => {
    e.preventDefault();
  
    fetchData("/post/create", 
    {
      "userId": userId,
      "postContent": postContent
    },
    "POST")
    .then((data) => {
      if(!data.message) {
        setPosts([...postsArr, data]);
        setUser(user);
        setUserId(userId);
        setPostContent('');
      }
    })
    .catch((error) => {
      console.log(`Error! ${error.message}`)
    });
  };

  return (
    <div className="container-md">
      <div className="container-sm">
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="postContent" className="form-label">Create a new post</label>
            <input 
              type="text" 
              className="form-control" 
              id="postContent"
              name='postContent'
              onChange={(e) => setPostContent(e.target.value)}
              value={postContent}
              required
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Post"/>
        </form>
      </div>
      <h3>{user}'s Posts</h3>
        {posts && posts.length > 0 && (
          <ul>
            {posts.map((post) => (
              <li key={parseInt(post._id)}>
                {post.postContent} | post Likes: {post.postLikes}
              </li>
            ))}
          </ul>
        )}
    </div>
  );
}

export default Profile;