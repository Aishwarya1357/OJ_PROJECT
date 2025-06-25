const mongoose = require('mongoose');

mongoose.set('strictQuery', false); // Optional, avoids warnings

mongoose.connect(process.env.MONGO_CONN, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true, // <== Force SSL
})
.then(() => {
  console.log("✅ Connected to MongoDB Atlas");
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err.message);
});
