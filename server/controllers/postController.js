const BotPost = require('../models/BotPost');

// create a new post
const createPost = async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json({ error: 'Not logged in' });

    const { content } = req.body;
    const newPost = await BotPost.create({ author: req.session.userId, content });
    return res.status(201).json({ message: 'Posted!', post: newPost });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to post' });
  }
};

// get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await BotPost.find().sort({ createdAt: -1 }).populate('author', 'username');
    return res.json(posts);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

module.exports = { createPost, getAllPosts };
