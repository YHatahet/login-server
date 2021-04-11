# login-server


## Components:
### [Mongoid](https://www.npmjs.com/package/mongoid-js)

* Guaranteed generation of unique mongoID strings. These will be used as unique keys for caching sessions on redis.
  
### [Express](https://www.npmjs.com/package/express)

* Fast, unopinionated, minimalist web framework.

### [Express-session](https://www.npmjs.com/package/express-session)
* Session middleware.

### [Body-Parser](https://www.npmjs.com/package/body-parser)
* Middleware for parsing data sent through the body of the HTTP request.
### [Redis](https://www.npmjs.com/package/redis)

* A high performance Node.js Redis client. Will be used as a hashmap to cache and fetch sessions.

### [Connect-Redis](https://www.npmjs.com/package/connect-redis)

* Stores express sessions inside redis.


## API

### <u>Does not require authentication</u>
1. Create Account:
   - POST request. Enter username and password. If username exists, return false, otherwise true.
2. Login: 
   - POST request. Enter username and password. If username exists and password is matched to it, creates a session for the current user.
     - TODO make a database and hash the passwords, for now use text file 

### <u>Requires authentication</u>:
1. Change password:
   - POST request.
2. Fetch data (placeholder) 
   - GET request.