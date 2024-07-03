require('dotenv').config();

module.exports = {
    dbConnectionString: process.env.DB_CONNECTION_STRING,
    sessionSecret: process.env.SESSION_SECRET,
    githubClientID: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET
};