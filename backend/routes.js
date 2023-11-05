const {ClerkExpressRequireAuth, clerkClient} = require('@clerk/clerk-sdk-node');
const express = require('express');
const models = require("./models"); 
const NodeRSA = require('node-rsa');
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

const key = new NodeRSA('-----BEGIN OPENSSH PRIVATE KEY-----\n'+
'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' +
'dQECAw==' +
'-----END ENCRYPTED PRIVATE KEY-----', 'openssh-private');

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