const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/jobapp";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("MongoDB connected");
    try {
      const count = await mongoose.connection.collection("Jobs").countDocuments();
      console.log(`Number of documents in 'Jobs' collection: ${count}`);
      
      if (count > 0) {
        const jobs = await mongoose.connection.collection("Jobs").find().limit(1).toArray();
        console.log("Sample job:", jobs[0]);
      } else {
        console.log("Collection is empty.");
      }
    } catch (err) {
      console.error("Error querying collection:", err);
    } finally {
      mongoose.connection.close();
    }
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });
