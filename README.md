# loginSetting
Login page
This code creates a webpage to login with a Username and a Password.

This are the main steps that are followed:

When a user first creates an account,
The Password you entered is hashed
Your Username and the hash were inserted into a Mongodb database
When someone tries to login the information will be retrieve from the db, based on the Username
The Password that is entered will be hashed and then compare against the one in the db
If the Passwords match you will be redirected to Programming Quotes
