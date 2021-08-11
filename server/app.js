const express = require('express');
const middleware = require('./config/app-middleware');
const constants = require('./config/constants');
const path = require("path");
const app = express();

app.use('/docs', express.static(path.join(__dirname, 'docs')));

middleware.app(app);

app.listen(constants.PORT || 5001, () => {
    console.log("Server Created for port Number : " + constants.PORT);
});