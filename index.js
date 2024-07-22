const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const path = require('path');

const employeeRoutes = require('./routes/employeeRoutes');
const skillRoutes = require('./routes/skillRoutes');
const authRoutes = require('./routes/authRoutes');
const jobPositionRoutes = require('./routes/jobPositionRoutes');
dotenv.config();

const app = express();

app.use(cors({
  origin: "https://tunishipfr.onrender.com",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL ,{})
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error(err));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'frontend/build')));

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/job-positions', jobPositionRoutes);

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
