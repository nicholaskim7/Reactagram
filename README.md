<strong>React/Express social-media</strong>

<strong>Login with authentication and password hashing</strong>
![newlogin](https://github.com/user-attachments/assets/1923780f-56af-4132-98fb-6a0cd202ee3e)

<strong>Users profile</strong>
![newloggedin](https://github.com/user-attachments/assets/d77b0f7f-b4c5-4c59-9d75-6d44b93908d0)

<strong>Update profile:</strong>
![newupdateprofile](https://github.com/user-attachments/assets/9c5536db-066a-4337-8ba4-18418339c72b)


<strong>Update credentials:</strong>
![newupdatelogin](https://github.com/user-attachments/assets/6545b445-7f4b-4976-9a62-36433820c21a)


<strong>When you try to bypass login through the url (Correct cookies are not present):</strong>
![trytobypasslogin](https://github.com/user-attachments/assets/a306572b-6c57-4f40-950d-9fbce505b48c)


<strong>For you page (fetching all posts to a page showing which user posted, by username. Clickable username redirecting to user's public profile.):</strong>
![newforupage](https://github.com/user-attachments/assets/bb4785e2-0f44-4eed-9f6c-6c0fd0b1b929)





<strong>--Frontend created with React.</strong><br/>
<strong>--Backend engineered with Express.</strong><br/>
<strong>--MySQL database for usercredentials, userprofile, and posts.</strong><br/>
<strong>--User Authentication using jsonwebtoken and cookie-parser.</strong><br/>
<strong>--Password hashing using bcrypt.</strong><br/>

<strong>Functionality:</strong><br/>
--Creation of token once a user is logged in. (Login cannot be bypassed by putting user_id in the url. If correct cookies are not present direct to the login page.)<br/>
--Consistent password hashing when registering new users or updating user credentials.<br/>
--Once a user is logged in they are directed to their profile where they can update profile information, update user credentials, or post pictures to their feed.<br/>
--Navbar search feature to search for friend's username. if that user exists in the database redirect to that user's public profile.<br/>
--No changes can be made to another user's public profile and no access to another user's credentials.<br/>
--Logout will clear the current logged in users cookies.<br/>
--FYP that queries all users' posts together for easy viewing. If a user is intrigued by another user's post, the usernames are clickable and direct to that user's public profile.

<strong>Starting:</strong><br/>
--In backend npm start server.js<br/>
--In frontend npm run dev<br/>
--localhost:5173/ is the react frontend.

<strong>Future Plan:</strong><br/>
--Follower System.<br/>
--Commenting on posts etc.<br/>

