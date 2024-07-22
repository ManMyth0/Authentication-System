# Authentication System
This project is a robust authentication system that leverages JSON Web Tokens (JWT) and Cross-Site Request Forgery (CSRF) tokens embedded in cookies. It provides a secure environment for user authentication and authorization, ensuring safe user interactions across endpoints.


### -Features-

* JWT and CSRF Tokens: Secure authentication using JWTs and CSRF tokens stored in cookies.

* Secret Key Generator: Conveniently generate your own keys for tokens and other secrets using the secretKeyGen file.

* CORS and Middleware: Utilizes CORS and various middleware to enhance security and user experience.

* Cache Control: Default setting prevents caching to ensure security.

* Frontend Pages: Includes functional homePage and loginSignUpPage for testing and production.

* Mongoose Schemas: Manages user data, CSRF tokens, and password retry attempts using Mongoose schemas.

* MongoDB Integration: Stores user data and other relevant information in a MongoDB database.


### -Getting Started-

* Node.js: Ensure Node.js is installed on your machine.

* MongoDB: A MongoDB instance is required to store user information and tokens.


### -Installation-

* Clone the repository:

```
git clone https://github.com/your-repo/authentication-system.git
```

* Navigate to the project directory:

```
cd authentication-system
```

* Install dependencies:

```
npm install
```


### -Configuration-

* Environment Variables: Create a .env file in the root directory and add the following variables:

```dotenv
URI=your-mongodb-uri
ACCESS_TOKEN_SECRET_KEY=your-access-token-secret-key
COOKIE_SECRET_KEY=your-cookie-secret-key
SESSION_SECRET_KEY=your-session-secret-key
```


### -Secret Key Generation-

* Use the secret key generator for creating secure keys:

* Uncomment the console.table line in the secretKeyGen file, save, then run it:

```
nodemon secretKeyGen.js
```

* After, Copy and paste the generated keys into your .env file in their respective places.


### -Usage-

* Start the Server:

```
npm start
```


### -Access the Frontend For Local Host- 
* Open your browser and navigate to ``http://localhost:3000/loginSignUpPage.html`` for login and signup methods, and to ``http://localhost:3000/homePage.html`` to view the homepage.

### -Frontend-

* Login/Sign Up Page: Basic page for user login and signup with fields for username, password, and email.

* Home Page: Displays a simple "Hello World" message and includes a logout button.
 
> [!NOTE]
> I would highly suggest changing the Front End pages to suite your needs, the defaults that are included are just for functionality purposes


### -MongoDB Collections-

* csrftokens: Stores CSRF tokens along with session IDs and expiration times.
* users: Stores user data including username, password, and email.
* passwordRetries: Tracks failed login attempts, username, and lockout duration.


### -Customization-

* Validation: Modify the validation rules in the userSchema to suit your requirements.

* Lockout Duration: Adjust the lockoutDuration variable in the passwordRetrySystem file to change the lockout period for failed login attempts.


### -Security Considerations-

* Ensure that the .env file is kept secure and not exposed publicly.

* Regularly update dependencies to mitigate security vulnerabilities.


> [!NOTE]
> ### *MongoDB Database Name*: 
> Update the ``dbName`` key's value in the connectToMongoDB file to match your MongoDB cluster's name:
```
await mongoose.connect( URI, {
    dbName: 'Your_Cluster_Name_Here' // Defining the cluster name here to help avoid a test and sub collection from being created
});
```


By following these instructions, you should be able to set up and run the authentication system, customize it to your needs, and ensure a secure environment for user authentication.


`` License:
This project is licensed under the MIT License. ``
