import React, { useState } from 'react';
import axios from 'axios';

function SetupForm() {
  const [githubToken, setGithubToken] = useState('');
  const [sshKey, setSshKey] = useState('');
  const [domain, setDomain] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/setup', {
        githubToken,
        sshKey,
        domain,
      });
      if (response.data.success) {
        setMessage(`Repository created: ${response.data.repoUrl}`);
      } else {
        setMessage(`Error: ${response.data.message}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="githubToken">GitHub Token:</label><br />
        <input
          type="text"
          id="githubToken"
          value={githubToken}
          onChange={(e) => setGithubToken(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="sshKey">SSH Key:</label><br />
        <textarea
          id="sshKey"
          value={sshKey}
          onChange={(e) => setSshKey(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label htmlFor="domain">Domain:</label><br />
        <input
          type="text"
          id="domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default SetupForm;
