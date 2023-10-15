This Project is built on Node with server created with express.
Library used:

    1. Express - for creating server
    2. Nodemon - devDependencies
    3. axios - for fetching news details
    4. bcrypt - for hashing the password
    5. dotenv - for getting values from env file
    6. jsonwebtoken - for creating the token

Endpoints:

    1. "/":
        Method - GET
        description - Entry point of the app
    2. "/register":
        Method - POST
        description - For registering the new user
    3. "/login"
        Method - POST
        description - Get task with task id provided
    4. "/preferences"
        Method - GET
        description - Get all the preferences of a particular user
    5. "/preferences"
        Method - PUT
        description - Update the preferences of a particular user
    6. "/news"
        Method - GET
        description - Get all the news according to the preferences of a particular user
    7. "/news/search/:keyword"
        Method - GET
        description - Get all the news according to the search query for a particular user

