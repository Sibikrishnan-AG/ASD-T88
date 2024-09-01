Date committed: 28-08-2024

Version: 2.1

Summary:

- Accounts created are populated into database
- Users able to retrieve profile details from database
- Users able to update profile details to database

To run program:
1. npm install
2. node server.js
3. localhost:3000

=============================================================================================================
* Update 20240901

Version: 3

Summary:
This branch includes (modified) codes pulled from kj-backend-v2 branch. Updates as listed below...
- newAccount.html (signup)

1. able to toggle password visibility
2. detect password mismatch
3. if password mismatch, error message, cannot proceed to createProfile.html, cannot store credentials to db
4. if password match, proceed to createProfile.html, store credentials to db

- account.html (login)

1. able to toggle password visibility
2. created preset accounts to login, immediate redirection to home.html
3. since exisitig account has a display name linked, able to get a url /home.html?name=Joe that is linked to email
4. if wrong email/password, cannot login, cannot redirect

- account js [folder] > server.js
  
this is the server.js for storing email:password to mongoDB.

**NOTE: this server.js is NOT combined with kj's server.js**

- profile.html
split into two tabs, able to populate the user inputs from createProfile.html

To be fixed:
- populate email to the second tab of profile.html
- editing the profile.html seems to create a new unique data entry on mongoDB, need to find a way to overwrite on exisiting entry
- make the profile.html static, then have user click on "edit" button to modify their profile 
  -   suggest to use the dropbox to choose new options
  -   selected new options to reflect on the page as well
- suggest to use a pop-up message to indicate successful update on profile settings page
