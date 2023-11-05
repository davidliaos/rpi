const {ClerkExpressRequireAuth, clerkClient} = require('@clerk/clerk-sdk-node');
const express = require('express');
const models = require("./models"); 
const postModel = models.Post;
const userModel = models.User;
const commentModel = models.Comment;
const app = express();

// const google = require('@googleapis/healthcare');
// const healthcare = google.healthcare({
//   version: 'v1',
//   auth: new google.auth.GoogleAuth({
//     scopes: ['https://www.googleapis.com/auth/cloud-platform'],
//   }),
// });


//route: user signs up, we wanna store the userID and initiailize points and set verified to false 

app.use(express.json())

//route to set verified true and get if they are verified
app.get('/user-verified', async (req, res) => {
    const {userID} = getAuth(req);
    if (!userID) {
      res.status(404).send('User not authenticated');
    } else {
        const user = await userModel.findOne({ 'userID': userID }, 'verified');
        res.status(200).send(user.verified);
    }     
});


//get top posts
app.get('/top-posts', async (req, res) => {
  try {
    const posts = await postModel.find( {  } ).sort({ points: -1 });
    
      res.status(200).send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/query-by-title', async (req, res) => {
  try {
    console.log((req.body?.title).split("%20").join(" "))
    const post = await postModel.find({})

    const result = post.filter((data) => data.data.title === (req.body?.title).split("%20").join(" "))
    console.log(result)

    res.status(200).send(result[0]);
  } catch (error) {
    console.log(error)
    res.status(400).send(error);
  }
});


// CRUD routes for posts

app.post('/post', async (req, res) => {
  try {
    const post = new postModel({
      data: {
        title: req.body?.title,
        patient: {
          category: req.body?.patient_category,
          ethnicity: req.body?.ethnicity,
          gender: req.body?.gender
        },
        clinical_information: {
          symptoms: req.body?.symptoms,
          family_history: req.body?.family_history,
          patient_history: req.body?.patient_history,
          social_history: req.body?.social_history,
        },
        diagnosis: {
          examination_findings: req.body?.examination_findings,
          diagnosis: req.body?.diagnosis
        }
      },
      points: Math.floor(Math.random() * 31)
    });

    await post.save();
    res.status(201).send(post);
    
  } catch (error) {
    console.log(error)
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

//Using Google Cloud's Healthcare API we de-identify the patient information
//Checks against standards of major health companies for protected health data using AI

// const deidentifyDataset = async () => {
//   const cloudRegion = 'us-east4';
//   const projectId = 'medverse-404202';
//   const sourceDatasetId = 'maindataset';
//   const destinationDatasetId = 'deidentifiedmaindata';
//   const keeplistTags = 'PatientID'
//   const sourceDataset = `projects/${projectId}/locations/${cloudRegion}/datasets/${sourceDatasetId}`;
//   const destinationDataset = `projects/${projectId}/locations/${cloudRegion}/datasets/${destinationDatasetId}`;
//   const request = {
//     //Sending POST request to intially store the data into the database
//     sourceDataset: sourceDataset,
//     //After request is sent its sent to the source dataset, this is deidentified patient info.
//     destinationDataset: destinationDataset,
//     resource: {
//       config: {
//         dicom: {
//           keepList: {
//             tags: [keeplistTags],
//           },
//         },
//       },
//     },
//   };
// //Stores the de-identified data into the db to be pulled from later.
//   await healthcare.projects.locations.datasets.deidentify(request);
//   // print statement to double check that it ran successfully.
//   console.log(
//     `De-identified data written from dataset ${sourceDatasetId} to dataset ${destinationDatasetId}`
//   );
// };

// searches DB for matching info.
// const dicomWebSearchForInstances = async () => {
//   const cloudRegion = 'us-east4';
//   const projectId = 'medverse=404202';
//   const datasetId = 'deidentifiedmaindata';
//   const dicomStoreId = 'maindata';
//   const parent = `projects/${projectId}/locations/${cloudRegion}/datasets/${datasetId}/dicomStores/${dicomStoreId}`;
//   const dicomWebPath = 'instances';
//   const request = {parent, dicomWebPath};

//   const instances =
//     await healthcare.projects.locations.datasets.dicomStores.searchForInstances(
//       request,
//       {
//         headers: {Accept: 'application/dicom+json,multipart/related'},
//       }
//     );
//   console.log(`Found ${instances.data.length} instances:`);
//   console.log(JSON.stringify(instances.data));
// };

// Endpoint to de-identify the dataset and search for instances
// app.post('/deidentify-and-search', ClerkExpressRequireAuth(), async (req, res) => {
//   try {
//     // De-identify the dataset
//     await deidentifyDataset();

//     // Search for instances
//     const instances = await dicomWebSearchForInstances();

//     // Respond with the de-identified data
//     res.status(200).json(instances.data);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// deidentifyDataset();
// dicomWebSearchForInstances();

module.exports = app;