const express = require("express");
const cors = require("cors");
const jwt = require(`jsonwebtoken`);
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://fitness-tracker-d37b8.web.app",
      "https://fitness-tracker-server-ruddy.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.irm8dks.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
// console.log(process.env.DB_USER)
// console.log(process.env.DB_PASS)
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const testimonialCollection = client
      .db(`Fitness_Tracker`)
      .collection(`testimonials`);
    const postCollection = client.db(`Fitness_Tracker`).collection(`posts`);
    const trainerCollection = client
      .db(`Fitness_Tracker`)
      .collection(`trainers`);
    const userCollection = client.db(`Fitness_Tracker`).collection(`users`);
    const classCollection = client.db(`Fitness_Tracker`).collection(`classes`);
    const newsletterUserCollection = client
      .db(`Fitness_Tracker`)
      .collection(`newsletter`);
      
  
    //   get the testimonials from database
    app.get(`/testimonials`, async (req, res) => {
      const result = await testimonialCollection.find().toArray();
      res.send(result);
    });

    //   get the posts from database
    app.get(`/posts`, async (req, res) => {
      const page = parseInt(req.query.page);
      const size = parseInt(req.query.size);
      // console.log(`pagination Query`, page, size);
      const totalPosts = await postCollection.countDocuments();
      const result = await postCollection
        .find()
        .skip(page * size)
        .limit(size)
        .toArray();
      res.send(result);
    });

    app.get(`/postsCount`, async (req, res) => {
      const count = await postCollection.estimatedDocumentCount();
      res.send({ count });
    });
    ////////////////////////////////////////////////////////////////

    // upload a post by trainer or admin
    app.post("/post", async (req, res) => {
      const classInfo = req.body;
      const result = postCollection.insertOne(classInfo);
      res.send(result);
    });
    // Upvote a Post
    app.post("/posts/:id/upvote", async (req, res) => {
      const postId = req.params.id;
      const { userId, previousVote } = req.body;
      
      // If user previously downvoted, remove the downvote
      if (previousVote === "downvote") {
        await postCollection.updateOne(
          { _id: new ObjectId(postId) },
          { $inc: { downvotes: -1 } }
        );
      }
      
      // If user previously upvoted, remove the upvote (toggle off)
      else if (previousVote === "upvote") {
        await postCollection.updateOne(
          { _id: new ObjectId(postId) },
          { $inc: { upvotes: -1 } }
        );
        return res.json({ message: "Upvote removed", action: "removed" });
      }
      
      // Add new upvote
      const result = await postCollection.updateOne(
        { _id: new ObjectId(postId) },
        { $inc: { upvotes: 1 } }
      );
      
      res.json({ message: "Post upvoted", action: "upvoted" });
    });

    // Downvote a Post
    app.post("/posts/:id/downvote", async (req, res) => {
      const postId = req.params.id;
      const { userId, previousVote } = req.body;
      
      // If user previously upvoted, remove the upvote
      if (previousVote === "upvote") {
        await postCollection.updateOne(
          { _id: new ObjectId(postId) },
          { $inc: { upvotes: -1 } }
        );
      }
      
      // If user previously downvoted, remove the downvote (toggle off)
      else if (previousVote === "downvote") {
        await postCollection.updateOne(
          { _id: new ObjectId(postId) },
          { $inc: { downvotes: -1 } }
        );
        return res.json({ message: "Downvote removed", action: "removed" });
      }
      
      // Add new downvote
      await postCollection.updateOne(
        { _id: new ObjectId(postId) },
        { $inc: { downvotes: 1 } }
      );
      
      res.json({ message: "Post downvoted", action: "downvoted" });
    });

    // ///////////////////////////////////////////////////////////////////////

    // get the accepted trainers data from database
    app.get(`/trainers`, async (req, res) => {
      const query = { status: `Accepted` };
      const result = await trainerCollection.find(query).toArray();
      res.send(result);
    });

    // Route to get random classes
    app.get("/recommended-classes", async (req, res) => {
      try {
        const count = await classCollection.countDocuments();
        const random = Math.floor(Math.random() * count);
        const classes = await classCollection
          .aggregate([{ $sample: { size: 3 } }])
          .toArray();
        res.json(classes);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    app.patch("/trainer/update/:email", async (req, res) => {
      const email = req.params.email;
      const user = req.body;

      const trainerQuery = { email };
      const updateDoc = {
        $set: { ...user },
      };

      try {
        // Update the trainer collection
        const trainerUpdateResult = await trainerCollection.updateOne(
          trainerQuery,
          updateDoc
        );

        if (trainerUpdateResult.matchedCount > 0) {
          const userQuery = { email };
          const updateUserRole = {
            $set: { ...user },
          };

          // Update the user collection
          const userUpdateResult = await userCollection.updateOne(
            userQuery,
            updateUserRole
          );

          res.send({
            trainerUpdateResult,
            userUpdateResult,
          });
        } else {
          res.status(404).send({ error: "Trainer not found" });
        }
      } catch (error) {
        res.status(500).send({
          error: "An error occurred while updating the data",
          details: error.message,
        });
      }
    });

    // get real trainers and applied trainers based on status
    app.get(`/trainers/:status`, async (req, res) => {
      const status = req.params.status;
      // console.log(status);

      const result = await trainerCollection.find({ status }).toArray();
      res.send(result);
    });

    // getting trainer with selected id
    app.get(`/trainer/:id`, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await trainerCollection.findOne(query);
      res.send(result);
    });

    // getting trainer with selected email
    app.get(`/trainerr/:email`, async (req, res) => {
      const email = req.params.email;
      const result = await trainerCollection.findOne({ email });
      res.send(result);
    });

    // getting user info with selected email
    app.get("/user/:email", async (req, res) => {
      const email = req.params.email;
      const result = await userCollection.findOne({ email });
      res.send(result);
    });

    // get all users data
    app.get("/users", async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    // get the subscribed newsletter users
    app.get("/newsletter", async (req, res) => {
      const result = await newsletterUserCollection.find().toArray();
      res.send(result);
    });

    // get the class data from db
    app.get("/classes", async (req, res) => {
      const page = parseInt(req.query.page);
      const size = parseInt(req.query.size);
      // console.log(`pagination Query`, page, size);
      const result = await classCollection
        .find()
        .skip(page * size)
        .limit(size)
        .toArray();
      res.send(result);
    });

    // get the count of all classes
    app.get(`/classesCount`, async (req, res) => {
      const count = await classCollection.estimatedDocumentCount();
      res.send({ count });
    });
    //
    // getting teacher info based on category from db
    app.get("/classTrainer/:category", async (req, res) => {
      const category = req.params.category;
      const result = await trainerCollection.find({ category }).toArray();
      // const result = await trainerCollection.find({ category }).toArray();
      res.send(result);
    });
    //

    // Delete trainer from db
    app.delete("/trainer/:id", async (req, res) => {
      const trainerId = req.params.id;
      const query = { _id: new ObjectId(trainerId) };
      const result = await trainerCollection.deleteOne(query);
      res.send(result);
    });

    // delete a trainer slot from database
    app.delete("/trainer/:trainerId/:slot", async (req, res) => {
      const trainerId = req.params.trainerId;
      const { day } = req.body;

      // if-there-is-no-trainer-id-and-slot-day
      if (!trainerId || !day) {
        return res
          .status(400)
          .send({ message: "Trainer ID and day are required." });
      }

      try {
        const query = { _id: new ObjectId(trainerId) };
        const update = { $pull: { availableDay: { value: day } } };

        const result = await trainerCollection.updateOne(query, update);
        res.send(result);
      } catch (error) {
        res.send(error);
      }
    });
    //

    // post trainers to db
    app.post("/trainers", async (req, res) => {
      const trainerInfo = req.body;
      const result = trainerCollection.insertOne(trainerInfo);
      res.send(result);
    });

    // post newsletter users to db
    app.post("/newsletter", async (req, res) => {
      const newsletterUser = req.body;
      const result = newsletterUserCollection.insertOne(newsletterUser);
      res.send(result);
    });

    // post class data by admin to db
    app.post("/classes", async (req, res) => {
      const classInfo = req.body;
      const result = classCollection.insertOne(classInfo);
      res.send(result);
    });

    //
    app.post("/users", async (req, res) => {
      const userInfo = req.body;
      // console.log(userInfo);
      const query = { email: userInfo.email };
      const existingUser = await userCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: `user already exist` });
      }

      const result = await userCollection.insertOne(userInfo);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    app.get("/", (req, res) => {
      res.send(`fitnes tracker server is working!!`);
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`fitnes tracker is working on port ${port}`);
});
