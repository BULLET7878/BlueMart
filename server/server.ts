import app from './app.js';
import connectDB from './configs/db.js';
import connectCloudinary from './configs/cloudinary.js';

const port = process.env.PORT || 4000;

// Initialize critical server connections
await connectDB();
await connectCloudinary();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});