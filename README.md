React/Express social-media
![reactinsta](https://github.com/user-attachments/assets/c0586e87-f1eb-430d-96d3-3c3178c593eb)

--Frontend created with React.<br/>
--Backend engineered with Express.<br/>
--MySQL database for usercredentials, userprofile, and posts.<br/>
--User Authentication using jsonwebtoken and cookie-parser.<br/>
--Password hashing using bcrypt.<br/>

<strong>Functionality:</strong>
--Creation of token once user is logged in. (Login cannot be bypassed by putting user_id in url. If correct cookies are not present direct to login page.)
--Consistent password hashing when registering new users or updating user credentials.
--Once user is logged in they are directed to their own profile where they can update profile information, update user credentials, or post pictures to their feed.
--Navbar search feature to search for friend's username. if that user exists in the database redirect to that users public profile.
--No changes can be made to another users public profile and no access to another users credentials.
--Logout will clear the cookies.
