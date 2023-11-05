import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
const express = require('express');
const models = require("./models"); 
const postModel = models.Post;
const userModel = models.User;
const commentModel = models.Comment;


const app = express();

//get top posts
app.get('/top-posts', async (req, res) => {
  try {
    const posts = await postModel.find( { 'posts.points': { $gte: '10' } } );
    if (!posts) {
      res.status(404).send('Post not found');
    } else {
      res.status(200).send(posts);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});


// CRUD routes for posts

app.post('/post', async (req, res) => {
  try {
    const post = new postModel(req.body);
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/posts', async (req, res) => {
    let posts = await postModel.find({});
    
    try {
        res.send(posts);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a post by ID
app.get('/posts/:id', async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (!post) {
      res.status(404).send('Post not found');
    } else {
      res.status(200).send(post);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a post by ID
app.put('/post/:id', async (req, res) => {
  try {
    const post = await postModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!post) {
      res.status(404).send('Post not found');
    } else {
      res.status(200).send(post);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a post by ID
app.delete('/post/:id', async (req, res) => {
  try {
    const post = await postModel.findByIdAndDelete(req.params.id);
    if (!post) {
      res.status(404).send('Post not found');
    } else {
      res.status(200).send(post);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// CRUD routes for comments

app.post('/comment', async (req, res) => {
  try {
    const comment = new commentModel(req.body);
    await comment.save();
    res.status(201).send(comment);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/comments', async (req, res) => {
    let comments = await commentModel.find({});
    
    try {
        res.send(comments);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a comment by ID
app.get('/comments/:id', async (req, res) => {
  try {
    const comment = await commentModel.findById(req.params.id);
    if (!comment) {
      res.status(404).send('Comment not found');
    } else {
      res.status(200).send(comment);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a comment by ID
app.put('/comment/:id', async (req, res) => {
  try {
    const comment = await commentModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!comment) {
      res.status(404).send('Comment not found');
    } else {
      res.status(200).send(comment);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a comment by ID
app.delete('/comment/:id', async (req, res) => {
  try {
    const comment = await commentModel.findByIdAndDelete(req.params.id);
    if (!comment) {
      res.status(404).send('Comment not found');
    } else {
      res.status(200).send(comment);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});


// CRUD routes for users

app.post('/user', async (req, res) => {
  try {
    const user = new userModel(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all users
app.get('/users', async (req, res) => {
    let users = await userModel.find({});
    try {
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      res.status(404).send('User not found');
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a user by ID
app.put('/user/:id', async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) {
      res.status(404).send('User not found');
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a user by ID
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).send('User not found');
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;