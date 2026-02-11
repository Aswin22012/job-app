const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/jobapp";

const sampleJobs = [
    {
        title: "Software Engineer",
        company: "Tech Corp",
        description: "Develop and maintain web applications using React and Node.js."
    },
    {
        title: "Data Scientist",
        company: "Data Solutions",
        description: "Analyze large datasets to extract meaningful insights."
    },
    {
        title: "Product Manager",
        company: "Innovate Inc",
        description: "Lead the product team to build amazing products."
    },
    {
        title: "UX Designer",
        company: "Creative Studio",
        description: "Design user-friendly interfaces for mobile and web apps."
    }
];

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log("MongoDB connected");
        try {
            // clear existing jobs just in case
            // await mongoose.connection.collection("Jobs").deleteMany({}); 
            // check if empty first
            const count = await mongoose.connection.collection("Jobs").countDocuments();
            if (count === 0) {
                const result = await mongoose.connection.collection("Jobs").insertMany(sampleJobs);
                console.log(`${result.insertedCount} jobs inserted successfully.`);
            } else {
                console.log(`Collection already has ${count} jobs. Skipping seed.`);
            }

        } catch (err) {
            console.error("Error seeding jobs:", err);
        } finally {
            mongoose.connection.close();
        }
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
    });
