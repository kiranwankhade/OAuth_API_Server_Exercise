const axios = require('axios');

const getStarredRepositories = async (accessToken) => {
    // your code goes here
    // having to get the starred repo `https://api.github.com/user/starred`
};

const getUserRepositories = async (accessToken) => {
    try {
        let repositories = [];
        let page = 1;
        let hasMore = true;

        while (hasMore) {
            const response = await axios.get(`https://api.github.com/user/repos`, {
                headers: { Authorization: `Bearer ${accessToken}` },
                params: { per_page: 100, page } // Fetch up to 100 per page
            });

            repositories = repositories.concat(response);
            
            if (response.length < 100) {
                hasMore = false; // Stop if less than 100 repos returned
            } else {
                page++; // Fetch next page
            }
        }

        return repositories; // Return all repositories
    } catch (error) {
        console.error("Error fetching repositories:", error);
        return [];
    }
};
module.exports = { getUserRepositories ,getStarredRepositories };
