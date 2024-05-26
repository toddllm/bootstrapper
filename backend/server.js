const express = require('express');
const bodyParser = require('body-parser');
const setupRouter = require('./routes/setup');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use('/api/setup', setupRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
