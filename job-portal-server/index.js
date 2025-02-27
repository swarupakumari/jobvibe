const express = require('express');
const cors = require('cors'); // Import CORS
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
console.log(process.env);

const { MongoClient, ServerApiVersion ,ObjectId} = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@job-portal-demo.q1cne.mongodb.net/?retryWrites=true&w=majority&appName=job-portal-demo`;

// Apply middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON bodies

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Create database and collection
    const db = client.db("mernJobPortal");
    const jobCollections = db.collection("demoJobs");

    // POST: Create a new job
    app.post("/post-job", async (req, res) => {
      const body = req.body;
      body.createdAt = new Date();
      const result = await jobCollections.insertOne(body);
      if (result.insertedId) {
        return res.status(200).send(result);
      } else {
        return res.status(500).send({
          message: "Cannot insert! Try again later.",
          status: false,
        });
      }
    });

    // GET: Retrieve all jobs
    app.get("/all-jobs", async (req, res) => {
      const jobs = await jobCollections.find({}).toArray();
      res.send(jobs);
    });




    //get single job using id
    app.get("/all-jobs/:id", async (req, res) => {
      const id =req.params.id;
      const job=await jobCollections.findOne({
        _id:new ObjectId(id)
      })
      res.send(job)
    });



    //get jobs by email
    app.get("/myJobs/:email", async(req,res)=>{
      console.log(req.params.email)
      const jobs =await jobCollections.find({postedBy:req.params.email}).toArray();
      res.send(jobs);
    }
    )



    


//delete a job
app.delete("/job/:id" , async(req,res)=>{
  const id=req.params.id;
  const filter={_id:new ObjectId(id)}
  const result=await jobCollections.deleteOne(filter);
  res.send(result)
 })



//update a jobs
app.patch("/update-job/:id",async (req, res) => {
  //console.log(req.params.email)
  const id = req.params.id;
  const jobData=req.body;
  const filter={_id:new ObjectId(id)}
  const options={upsert:true};
  const updateDoc={
    $set:{
      ...jobData
    },
  };
  const result = await jobCollections.updateOne(filter,updateDoc,options);
  res.send(result);
   
    });


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close(); Uncomment this when you are done testing
  }
}
run().catch(console.dir);

// Default route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
