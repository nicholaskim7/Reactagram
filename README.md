<strong>React/Express social-media</strong>
![reactinsta](https://github.com/user-attachments/assets/c0586e87-f1eb-430d-96d3-3c3178c593eb)

<strong>Update profile:</strong>
![updateprofile](https://github.com/user-attachments/assets/ea253faf-bb1f-49eb-8b6e-b0149d7100ad)

<strong>Update credentials:</strong>
![updatecredentials](https://github.com/user-attachments/assets/acd3003a-b95f-4835-a14f-13485beb83df)




--Frontend created with React.<br/>
--Backend engineered with Express.<br/>
--MySQL database for usercredentials, userprofile, and posts.<br/>
--User Authentication using jsonwebtoken and cookie-parser.<br/>
--Password hashing using bcrypt.<br/>

<strong>Functionality:</strong><br/>
--Creation of token once user is logged in. (Login cannot be bypassed by putting user_id in url. If correct cookies are not present direct to login page.)<br/>
--Consistent password hashing when registering new users or updating user credentials.<br/>
--Once user is logged in they are directed to their own profile where they can update profile information, update user credentials, or post pictures to their feed.<br/>
--Navbar search feature to search for friend's username. if that user exists in the database redirect to that users public profile.<br/>
--No changes can be made to another users public profile and no access to another users credentials.<br/>
--Logout will clear the cookies.<br/>
