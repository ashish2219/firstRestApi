# firstRestfulApi

This is a simple RESTful API built with Node.js and Express that allows CRUD operations for articles stored in a MongoDB database.

Installation
Clone the repository: git clone https://github.com/<USERNAME>/<REPO>.git
cd <REPO>

Install the required packages: npm install

Start the server: node app.js

Usage

The API supports the following routes:

GET /articles: Retrieve all articles.
POST /articles: Create a new article.
DELETE /articles: Delete all articles.
GET /articles/:articleTitle: Retrieve a specific article.
PUT /articles/:articleTitle: Replace a specific article.
PATCH /articles/:articleTitle: Update a specific article.
DELETE /articles/:articleTitle: Delete a specific article.

All routes except GET /articles/:articleTitle and GET /articles support request body in JSON format with title and content fields.
