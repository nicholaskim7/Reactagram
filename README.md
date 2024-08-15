# React/Express Social Media Application

## Features

### Login with Authentication and Password Hashing
![newlogin](https://github.com/user-attachments/assets/1923780f-56af-4132-98fb-6a0cd202ee3e)

### Logged in User's Profile
![newloggedin](https://github.com/user-attachments/assets/d77b0f7f-b4c5-4c59-9d75-6d44b93908d0)

### Update Profile
![newupdateprofile](https://github.com/user-attachments/assets/9c5536db-066a-4337-8ba4-18418339c72b)

### Update Credentials
![newupdatelogin](https://github.com/user-attachments/assets/6545b445-7f4b-4976-9a62-36433820c21a)

### Unauthorized Access Attempt
When you try to bypass login through the URL (Correct cookies are not present):
![trytobypasslogin](https://github.com/user-attachments/assets/a306572b-6c57-4f40-950d-9fbce505b48c)

### Public Profile
Public profile of users when searched by friends via the nav bar search bar using username.
![newpublicprofile](https://github.com/user-attachments/assets/4abdec00-090c-4e93-8677-79f6f4ab83f9)


### For You Page
Fetching all posts to a page showing which user posted by username. Clickable username redirecting to user's public profile:
![newforupage](https://github.com/user-attachments/assets/bb4785e2-0f44-4eed-9f6c-6c0fd0b1b929)

### 75 hard
Allow users to participate in the popular 75 hard challenge. Display user's task completion on their public profile, for all to see, to motivate them to finish their daily tasks.
![75hard](https://github.com/user-attachments/assets/790aff89-9ae5-4081-8fb1-44b77e140703)

### Follower and Following query
System to allow following users and being followed by users. Changes Reflect on the users public profile showing unfollow if that user is already followed and vise versa.


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
- Follower System (already working)
- Commenting on posts
