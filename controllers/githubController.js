const {  getStarredRepositories, getUserRepositories } = require('../services/githubService');

const getStarredRepos = async (req, res) => {
// your code goes here
// Add Another function in github services
};


const getGitHubRepos = async (req, res) => {
    try {
        const accessToken = req.cookies.access_token || req.headers.authorization?.split(" ")[1];
        if (!accessToken) throw new Error("Unauthorized");

        const repositories = await getUserRepositories(accessToken);
        res.json(repositories);
    } catch (error) {
        console.error("Error fetching repositories:", error);
        res.status(401).json({ error: error.message });
    }
};


module.exports = { getGitHubRepos , getStarredRepos };
