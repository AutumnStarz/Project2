
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

const getAllPosts = async (req, res) => {
  try {
    const posts = await BotPost.find().sort({ createdAt: -1 }).populate('author', 'username');
    return res.json(posts);  // Make sure this is returning the updated list
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};


// increment beep (like)
const beepPost = async (req, res) => {
  try {
    const post = await BotPost.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    
    post.beeps += 1;
    await post.save();
    
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update beep' });
  }
};

// increment boop (dislike)
const boopPost = async (req, res) => {
  try {
    const post = await BotPost.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    post.boops += 1;
    await post.save();

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update boop' });
  }
};

// delete a post
const deletePost = async (req, res) => {
  try {
    console.log('Attempting to delete post with ID:', req.params.id); // Debugging
    const post = await BotPost.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    await BotPost.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('Error deleting post:', err); // Log the error
    res.status(500).json({ error: 'Failed to delete post' });
  }
};



module.exports = { createPost, getAllPosts, beepPost, boopPost, deletePost };
