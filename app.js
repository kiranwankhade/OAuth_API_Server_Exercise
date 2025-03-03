const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const cookieParser = require("cookie-parser");

const { verifyAccessToken } = require("./middleware/index.js");
const { getStarredRepos } = require("./controllers/githubController.js");

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cookieParser());
app.use(cors({ credentials: "include", origin: "https://msplan3-frontend.vercel.app" }));

app.get("/", (req, res) => {
  res.send(`<h1>OAuth API Server Exercise</h1>`);
});

app.get("/user/profile/github", verifyAccessToken, async (req, res) => {
  try {
    const { access_token } = req.cookies;
    const githubUserDataResponse = await axios.get(
      "https://api.github.com/user"
    );
    res.json({ user: githubUserDataResponse.data });
  } catch (error) {
    res.status(500).json({ error: "Could not fetch user Github profile" });
  }
});

// Add Github Profile 
/* Write OAuth Code or github authentication 
Endpoints : `/auth/github` and `/auth/github/callback` */
/* Create the Endpoints to find Repos and Logout functionality 
Endpoints : `/github/repos` and /logout`
*/
/* Giving you endpoints details add logic in getStarredRepos Function controller to get the starred repository */

app.get('/github/starred', verifyAccessToken, getStarredRepos);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
