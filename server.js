require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const cors = require('cors');
app.use(cors());
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const db = mongoose.connection;

app.get('/movies', async (req, res) => {
  try {
    const movies = await db.collection('cage_movies_shows').find().toArray();
    // console.log("movies", movies)
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
