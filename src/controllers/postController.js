import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  const { title, content, image } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  try {
    const post = await Post.create({
      title,
      content,
      image,
      author: req.user.id,
    });

    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getPublicPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username email")
      .sort({ createdAt: -1 });

    if (posts.length === 0) return res.status(200).json([]);

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSinglePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id).populate("author", "username");
    if (!post) return res.status(404).json({ message: "Post is not found" });
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    await post.deleteOne();

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const editPost = async (req,res) => {
  const { id } = req.params;

  const { title, content, image } = req.body;

  try {
    const post = await Post.findById(id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    if (title) post.title = title;

    if (content) post.content = content;
    if (image) post.image = image;

    res.status(200).json({message: "Post updated successfully", post})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};
