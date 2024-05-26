const axios = require('axios');

const createRepo = async (token, repoName) => {
    const url = 'https://api.github.com/user/repos';
    const headers = {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json'
    };
    const data = {
        name: repoName,
        private: false,
        description: 'Repository created by Bootstrapper'
    };

    try {
        const response = await axios.post(url, data, { headers });
        return response.data.ssh_url;
    } catch (error) {
        throw new Error(`Failed to create repository: ${error.response.data.message}`);
    }
};

module.exports = { createRepo };
