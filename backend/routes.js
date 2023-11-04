const express = require('express');
const postModel = require("./models"); 
const app = express();

// Create a new post
app.post('/add_post', async (req, res) => {
  try {
    const post = new postModel(req.body);
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/get_posts', async (req, res) => {
    let posts = await postModel.find({});
    
    try {
        res.send(posts);
    } catch (error) {
        res.status(500).send(error);
    }
  /*
  try {
    const Post = mongoose.model('Post', postSchema);
    const p = new Post({ 
        postID: "1",
        title: "My patient died",
        description: "and im sad",
        author: "anon123",
        image: "",
        tags: ["tag1", "tag2"],
    });


    console.log(p.title);
    res.status(200);
  } catch (error) {
    res.status(500).send(error);
  }
  */

});




// CRUD routes for users

// Create a new user
app.post('//user', async (req, res) => {
  try {
    const question = new Questions(req.body);
    await question.save();
    res.status(201).send(question);
  } catch (error) {
    res.status(400).send(error);
  }
});

/*
// Get all questions
app.get('/questions', async (req, res) => {
  try {
    const questions = await Questions.find().lean();
    console.log(questions)
    res.status(200).send(questions);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a question by ID
app.get('/questions/:id', async (req, res) => {
  try {
    const question = await Questions.findById(req.params.id);
    if (!question) {
      res.status(404).send('Question not found');
    } else {
      res.status(200).send(question);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a question by ID
app.put('/questions/:id', async (req, res) => {
  try {
    const question = await Questions.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!question) {
      res.status(404).send('Question not found');
    } else {
      res.status(200).send(question);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a question by ID
app.delete('/questions/:id', async (req, res) => {
  try {
    const question = await Questions.findByIdAndDelete(req.params.id);
    if (!question) {
      res.status(404).send('Question not found');
    } else {
      res.status(200).send(question);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
*/
module.exports = app;