import React, { useEffect, useState } from 'react';
import Post from './Post';
import ChangePasswordForm from './ChangePasswordForm';

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [isPremium, setIsPremium] = useState(false);

  // check for premium
  useEffect(() => {
    const premiumStatus = localStorage.getItem('isPremium') === 'true';
    setIsPremium(premiumStatus);
    loadPosts();
  }, []);

  const handleBuyPremium = () => {
    alert("You're now a Premium Member!");
    localStorage.setItem('isPremium', 'true');
    setIsPremium(true);
  };

  // load posts from the server
  const loadPosts = async () => {
    try {
      const res = await fetch('/posts');
      if (!res.ok) throw new Error('Failed to fetch posts');
      const data = await res.json();
      console.log("Posts loaded:", data);
      setPosts(data);
    } catch (error) {
      console.error("Error loading posts:", error);
    }
  };

  // create a new post
  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return;

    try {
      await fetch('/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newPostContent }),
      });
      setNewPostContent('');
      loadPosts();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };


  // handle beeping and booping
  const handleBeep = async (postId) => {
    try {
      await fetch(`/post/${postId}/beep`, { method: 'POST' });
      loadPosts();
    } catch (error) {
      console.error("Error beeping post:", error);
    }
  };

  const handleBoop = async (postId) => {
    try {
      await fetch(`/post/${postId}/boop`, { method: 'POST' });
      loadPosts();
    } catch (error) {
      console.error("Error booping post:", error);
    }
  };

  // handle deleting a post
  const handleDeletePost = async (postId) => {
    try {
      await fetch(`/post/${postId}`, { method: 'DELETE' });
      loadPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div>
      <ChangePasswordForm /> 
      
      {!isPremium && (
        <div style={{ marginBottom: '1rem' }}>
          <button
            onClick={handleBuyPremium}
            style={{
              backgroundColor: 'gold',
              color: 'black',
              fontWeight: 'bold',
              border: '2px solid orange',
              borderRadius: '10px',
              padding: '0.5rem 1rem',
              boxShadow: '0 0 10px gold',
              cursor: 'pointer',
            }}
          >
             Buy Premium 
          </button>
        </div>
      )}

      <div>
        <input
          type="text"
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          placeholder="What's Beeping?"
        />
        <button onClick={handleCreatePost}>Create Post</button>
      </div>

      {/* Display posts */}
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            onBeep={() => handleBeep(post._id)}
            onBoop={() => handleBoop(post._id)}
            onDelete={() => handleDeletePost(post._id)}
          />
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default PostFeed;
