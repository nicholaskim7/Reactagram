# React/Express Social Media Application

## Features

### Register new users with password hashing using bcrypt
![createUserView](https://github.com/user-attachments/assets/d3dc8fb2-4749-4b60-975e-fa5f1aa46682)


### Login with user Authentication using jsonwebtoken
![loginView](https://github.com/user-attachments/assets/3ce801a9-506f-4d9e-8380-709121239db5)


### Logged in User's Profile
![userloggedinView](https://github.com/user-attachments/assets/f2150675-ff4d-4257-8537-91da0405fd01)


### Update Profile
![updateProfileView](https://github.com/user-attachments/assets/c6619be7-5c42-4fcf-9dfa-013b60142def)


### Update Credentials
![updatecredentialsView](https://github.com/user-attachments/assets/1c5a92d3-5ee7-4711-b51e-329221aa9753)


### Unauthorized Access Attempt
When you try to bypass login through the URL (Correct cookies are not present):
![trytobypasslogin](https://github.com/user-attachments/assets/a306572b-6c57-4f40-950d-9fbce505b48c)

### Public Profile
Public profile of users when searched by friends via the nav bar search bar using username.
![friendsPublicProfileView](https://github.com/user-attachments/assets/a4f223ff-39c8-4031-8d8e-1ea7e30e81e5)



### For You Page
Fetching all posts to a page showing which user posted by username. Clickable username redirecting to user's public profile:
![forYouPageView](https://github.com/user-attachments/assets/02e96444-a139-4348-9d86-e793f765920b)


### 75 hard
Allow users to participate in the popular 75 hard challenge. Display user's task completion on their public profile, for all to see, to motivate them to finish their daily tasks.
![fixedmargins](https://github.com/user-attachments/assets/bb4663d4-8d39-4db3-b2a6-0745cfc42a2d)


### Follower and Following query
System to allow following users and being followed by users. State Changes Reflect on the users public profile showing unfollow option if that user is already followed and vise versa.


## Technology Stack
- **Frontend**: React
- **Backend**: Express
- **Database**: MySQL (for user credentials, user profile, and posts)
- **Authentication**: jsonwebtoken and cookie-parser
- **Password Hashing**: bcrypt

## Functionality
- **Token Creation**: Once a user is logged in. Login cannot be bypassed by putting user_id in the URL. If correct cookies are not present, redirect to the login page.
- **Password Hashing**: Consistent password hashing when registering new users or updating user credentials.
- **User Profile**: Once a user is logged in, they are directed to their profile where they can update profile information, update user credentials, or post pictures to their feed.
- **Navbar Search**: Search feature to search for a friend's username. If the user exists in the database, redirect to that user's public profile.
- **Public Profile Restrictions**: No changes can be made to another user's public profile and no access to another user's credentials.
- **Logout**: Clears the current logged-in user's cookies.
- **For You Page (FYP)**: Queries all users' posts together for easy viewing. If a user is intrigued by another user's post, the usernames are clickable and direct to that user's public profile.

## Starting the Application
1. **Backend**: `npm start server.js`
2. **Frontend**: `npm run dev`
3. **Access**: Go to `localhost:5173/` to view the React frontend.

## Future Plans
- Commenting on posts
