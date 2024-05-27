const express = require('express');
const router = express.Router();
const { createRepo } = require('../services/githubService');

router.post('/', async (req, res) => {
    const { githubToken, sshKey, domain } = req.body;

    try {
        const repoUrl = await createRepo(githubToken, 'bootstrapper-repo');
        res.status(200).json({ success: true, repoUrl });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/verify', async (req, res) => {
    const { githubToken, repoName } = req.query;

    try {
        const url = `https://api.github.com/repos/${repoName}`;
        const headers = {
            Authorization: 'token ' + githubToken,
            Accept: 'application/vnd.github.v3+json'
        };

        const response = await axios.get(url, { headers });
        if (response.status === 200) {
            res.status(200).json({ success: true, message: 'Repository exists' });
        } else {
            res.status(response.status).json({ success: false, message: 'Repository does not exist' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;

