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

module.exports = router;
