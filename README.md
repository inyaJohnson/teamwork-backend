## Teamwork

This is the backend repository for Teamwork project (Andela DevC), which is an internal social network for employees in an organisation. 
Aimed at fostering interaction between employees.


## Setup
<ul>
  <li>You need to have git, NodeJS and nmp installed on your local environment.</li>
  <li>Clone the application with git clone command.</li>
  <li>npm install to install all the dependencies in local environment.</li>
</ul>

## API
<ul>
  <li>POST /v1/auth/signup Create account.</li>

  <li>POST /v1/auth/signin Sign in.</li>

  ### <li>Require authentication</li>

  <li>GET /v1/feeds Retrieve all articles posted</li>

  <li>GET /v1/feeds/:tagId/tags Retrieve articles by tag</li>

  <li>GET /v1/articles/:articleId Fetch single article by its ID</li>

  <li>GET /v1/author/articles/:authorId Fetch all articles by author ID</li>

  <li>POST /v1/articles Create new article</li>

  <li>POST /v1/:articleId/comments Add comment to an article</li>

  <li>PATCH /v1/articles/:articleId Update an article</li>

  <li>DELETE /v1/articles/:articleId Delete an article</li>

</ul>

## Built with
<ul>
  <li>Expressjs</li>
</ul>

## Author
<ul>
  <li>Inya Johnson</li>
</ul>
