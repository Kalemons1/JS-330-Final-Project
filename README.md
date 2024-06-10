# JS-330-Final-Project
High &amp; Low Social 
Proposal and Task Breakdown
Your Final Project proposal is due. You should submit a link to a GitHub project that will house your submission. The project README should contain your project proposal. Your proposal should include:
1. A description of the scenario your project is operating in.
   The scenario will be social media, currently only showcases the peak moments of a persons day, but this social media concept will introduce the concept of a social media which covers both the daily high point and low point. it will be a basic social media UI with backend, routes using express, CRUD routes using MongoDB.
3. A description of what problem your project seeks to solve.
Seek to solve the problem of social media portraying unrealistic expectations and only showing the positives without the realistic day to day experiences. 
The concept will be a social media platform that requires users to upload both the daily highlight and lowlight. To provide a more genuine and realistic social media experience/portrayal. 
4. A description of what the technical components of your project will be, including: the routes, the data models, any external data sources you'll use, etc.
Routes:
Authentication Routes:
/signup: POST route for user registration.
/login: POST route for user login.
/logout: POST route for user logout.
Post Routes:
/posts: GET route to fetch all posts.
/posts/:postId: GET route to fetch a specific post by ID.
/posts: POST route to create a new post.
/posts/:postId: PUT route to update an existing post.
/posts/:postId: DELETE route to delete a post.
Data Models:
User Model:
id: Unique identifier.
username: User's username.
email: User's email address.
password: User's hashed password.
Post Model:
id: Unique identifier.
userId: ID of the user who created the post.
content: Text content of the post.
type: Type of post (highlight or lowlight).
createdAt: Timestamp of post creation.
Controllers:
AuthController:
Handles user registration, login, and logout.
PostController:
Handles CRUD operations for posts.
Middleware:
Authentication Middleware:
Verifies JWT tokens for protected routes.
Error Handling Middleware:
Catches and handles errors throughout the request-response cycle.

5. Clear and direct call-outs of how you will meet the various project requirements.
Given the time frame I will keep functionality relatively simple as well as UI. Will consist of a visual for a signup/login with functionality for changing password. From there users will be able to post, but will be required to post both that days highpoint and low point. Authorization will follow the class structure using Bcrypt for hashing and JWT. DAO folder will contain the CRUD operations needed for creating users, authorization, like login and change password. Additionally will contain the Crud Routes needed for creating new posts. Develop post DAO functions for managing posts, including creating, reading, updating, and deleting posts. Read posts: Develop routes to fetch all posts or specific posts by their IDs, enabling users to view their own and others' posts.
Update posts: Allow users to edit the content of their posts, updating the database accordingly.
Delete posts: Provide functionality for users to delete their posts, removing them from the database.
6. A timeline for what project components you plan to complete, week by week, for the remainder of the class. 
Week 1: Backend Implementation - Authentication and CRUD Operations
Day 1-2:
Implement user authentication (signup, login) using JWT (JSON Web Tokens).
Set up routes and controllers for user authentication.
Day 3-4:
Implement CRUD operations for posts (creating, reading, updating, deleting).
Set up routes and controllers for handling post-related actions.
Deliverables: Authentication endpoints (signup, login), CRUD endpoints for posts.
Week 2: Frontend Development - User Interface and Interactivity
Day 1-2:
Set up basic frontend structure using HTML, CSS, and JavaScript (or a frontend framework like React or Vue.js).
Create user interfaces for signup, login, and posting highlights and lowlights.
Day 3-4:
Implement interactivity for user actions (e.g., form submissions, displaying posts).
Add client-side validation for input fields.
Deliverables: Basic user interface with interactivity for signup, login, and posting.
Week 3: Finalization and Testing
Day 1-2:
Finalize backend and frontend integration.
Test all functionalities, including authentication, CRUD operations, and user interface interactions.
Day 3-4:
Handle edge cases and error scenarios.
Refactor and optimize code where necessary.
Deliverables: Fully functional social media/blog platform with user authentication, post creation, and interactive user interface, ready for presentation and demo.




