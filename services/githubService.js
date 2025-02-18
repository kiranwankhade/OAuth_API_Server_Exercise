const axios = require('axios');

const getUserRepositories = async (accessToken) => {
    try {
        const response = await axios.get('https://api.github.com/user/repos', {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        // console.log('response:', response)
        return response.data; // Return repo list
    } catch (error) {
        console.error("Error fetching repositories:", error);
        return [];
    }
};

const getStarredRepositories = async (accessToken) => {
    try {
        const response = await axios.get("https://api.github.com/user/starred", {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching starred repositories:", error);
        return [];
    }
};

module.exports = { getUserRepositories ,getStarredRepositories };
