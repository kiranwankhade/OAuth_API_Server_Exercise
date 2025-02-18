const { getUserRepositories, getStarredRepositories } = require('../services/githubService');

// const getGitHubRepos = async (req, res) => {
//     try {
//         const accessToken = req.headers.authorization.split(" ")[1]; // Extract Bearer token
//         if (!accessToken) throw new Error("Unauthorized");

//         const repositories = await getUserRepositories(accessToken);
//         console.log('repositories:', repositories)
//         res.json(repositories);
//     } catch (error) {
//         res.status(401).json({ error: error.message });
//     }
// };

const getGitHubRepos = async (req, res) => {
    try {
        const accessToken = req.cookies.access_token || req.headers.authorization?.split(" ")[1];
        console.log("Access Token:", accessToken);
        if (!accessToken) throw new Error("Unauthorized");

        const repositories = await getUserRepositories(accessToken);
        res.json(repositories);
    } catch (error) {
        console.error("Error fetching repositories:", error);
        res.status(401).json({ error: error.message });
    }
};


const getStarredRepos = async (req, res) => {
    try {
        const accessToken = req.cookies.access_token;
        if (!accessToken) throw new Error("Unauthorized");

        const starredRepos = await getStarredRepositories(accessToken);
        res.json(starredRepos);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

module.exports = { getGitHubRepos , getStarredRepos };
