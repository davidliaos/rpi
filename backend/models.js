const mongoose = require('mongoose');

// Define a Comment schema
const commentSchema = new mongoose.Schema({
  commentText: String,
  postTitle: String
});

// Define a Post schema
const postSchema = new mongoose.Schema({
    data: {
      title: String,
      patient: {
        category: String,
        gender: String,
        ethnicity: String,
      },
      clinical_information: {
        symptoms: String,
        patient_history: String,
        family_history: String,
        social_history: String
      },
      diagnosis: {
        examination_findings: String,
        diagnosis: String
      }
    },
    points: Number,
    images: [String],
    tags: [String],
  }, { timestamps: true });

// Define a User schema for question data
const userSchema = new mongoose.Schema({
    userID: String,
    points: Number,
    verified: Boolean, //todo: verify
  });

// Create a Mongoose model based on the schema
const User = mongoose.model('User', userSchema);

// Create a Mongoose model based on the schema
const Comment = mongoose.model('Comment', commentSchema);

// Create a Mongoose model based on the schema
const Post = mongoose.model('Post', postSchema);

module.exports = {Post: Post, Comment: Comment, User: User};