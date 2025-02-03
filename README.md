# React/Express Social Media Application

## Features

### Landing page
![landingreact](https://github.com/user-attachments/assets/8535000f-77a9-4530-b448-2c91542b9bbf)


### Register new users with password hashing using bcrypt
![signupreact](https://github.com/user-attachments/assets/0f9f4e3d-47de-4fca-9ada-305237b29567)


### Login with user Authentication using jsonwebtoken
![Loginreact](https://github.com/user-attachments/assets/4856cfb5-d886-4eab-96fa-1fad0dd4d985)


### Logged in User's Profile
![YourpageReact](https://github.com/user-attachments/assets/cce79bdb-0a79-43bd-928c-7f35f2cc4c43)


### Unauthorized Access Attempt
When you try to bypass login through the URL (Correct cookies are not present):
![notAuthorized](https://github.com/user-attachments/assets/08243b77-4c6d-420f-bb83-0ef860be4c11)


### Public Profile
Public profile of users when searched by friends via the nav bar search bar using username.
![YourPublicPage](https://github.com/user-attachments/assets/4f3da1f9-0899-4c08-952b-26708c6d1183)


### For You Page
Fetching all posts to a page showing which user posted by username. Clickable username redirecting to user's public profile:
![foryoupageReact](https://github.com/user-attachments/assets/fb5b69c8-11a5-414b-a8da-b63ad32d4a3a)


### 75 hard
Allow users to participate in the popular 75 hard challenge. Display user's task completion on their public profile, for all to see, to motivate them to finish their daily tasks.
![TaskReact](https://github.com/user-attachments/assets/abda702f-e7e8-4266-aeb1-4ef83ae6d0fb)


### Follower and Following query
System to allow following users and being followed by users. State Changes Reflect on the users public profile showing unfollow option if that user is already followed and vise versa.

### Update Profile
Allow users to update profile information. Gives the user a decision on what to change and what to keep rather than forceing the user to re-enter all their information.


### Update Credentials
Update passwords and emails. Ensure the same password hashing, that is present in account creation, is applied to new passwords.


## Technology Stack
- **Frontend**: React
- **Backend**: Express
- **Database**: MySQL (for user credentials, user profile, and posts)
- **Authentication**: jsonwebtoken and cookie-parser
- **Password Hashing**: bcrypt

## Functionality
- **Token Creation**: Login cannot be bypassed by putting user_id in the URL. If correct cookies are not present, redirect to the login page.
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
- Deploy and hosting to showcase design and production skills
