require('dotenv').config(); // Load environment variables from .env file
const {connectDB} = require("./lib/db")
const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");
const ContactRoutes = require("./routes/contactroutes");
const geminiChatRoute = require('./routes/geminiChatRoute');
const authRoutes = require('./routes/auth.route')
app.use(cors());
app.use(express.json());
app.use("/api/contact", ContactRoutes);
app.use('/api/generate-content', geminiChatRoute);
app.use("/api/auth",authRoutes)
let API_KEY = process.env.NEWS_API_KEY || "test";
let SERVER_PORT = process.env.PORT || 5000;

app.get('/api/news', async (req, res) => {

    try {
      let response = await axios.get(`https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=${API_KEY}`);
      res.json(response.data);
    } catch (error) {
      res.status(error.status).send(error.message);
    }
});

app.listen(SERVER_PORT, () => {
  console.log("server running on port:", SERVER_PORT);
  connectDB()
});
