const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");

const employeeRoutes = require('./routes/employeeRoutes');
const evaluationRoutes = require('./routes/evaluationRoutes');

const skillRoutes = require('./routes/skillRoutes');
const authRoutes = require('./routes/authRoutes');
const jobPositionRoutes = require('./routes/jobPositionRoutes')
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

app.options('*', cors());
  
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/job-positions', jobPositionRoutes);
app.use('/api/evaluation', evaluationRoutes);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
