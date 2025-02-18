const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const { setSecureCookie } = require("./services/index.js");
const cookieParser = require("cookie-parser");

const { verifyAccessToken } = require("./middleware/index.js");
const { getGitHubRepos, getStarredRepos } = require("./controllers/githubController.js");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send(`<h1>WELCOME TO OAuth API Server Plan 3</h1>`);
});

app.get("/user/profile/github", verifyAccessToken, async (req, res) => {
  try {
    const { access_token } = req.cookies;
    const githubUserDataResponse = await axios.get(
      "https://api.github.com/user",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    res.json({ user: githubUserDataResponse.data });
  } catch (error) {
    res.status(500).json({ error: "Could not fetch user Github profile" });
  }
});

app.get("/auth/github", (req, res) => {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user,repo,security_events`;

  res.redirect(githubAuthUrl);
});

app.get("/auth/github/callback", async (req, res) => {
  const { code } = req.query;
  if (!code) {
    return res.status(404).send("Authorization code not provided");
  }

  try {
    const tokenResponse = await axios.post(
      `https://github.com/login/oauth/access_token`,
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: { Accept: "application/json" },
      }
    );
    const accessToken = tokenResponse.data.access_token;
    console.log("accessToken:", accessToken);
    setSecureCookie(res, accessToken);
    return res.redirect(`${process.env.FRONTEND_URL}/profile`);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get('/github/repos', getGitHubRepos);

// Missing One
app.get("/logout", (req, res) => {
    res.clearCookie("access_token");
    res.json({ message: "Logged out successfully" });
});


app.get('/github/starred', verifyAccessToken, getStarredRepos);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
