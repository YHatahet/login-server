# login-server

A server that allows only clients with valid logins to use the API. The server will have a login and a create-account API which will be accessible to everyone, and 




### [Mongoid](https://www.npmjs.com/package/mongoid-js)

* Guaranteed generation of unique mongoID strings. These will be used as unique keys for caching sessions on Redis.

### [Redis](https://www.npmjs.com/package/redis)

* A high performance Node.js Redis client. Will be used as a hashmap to cache and fetch sessions.

### [Express](https://www.npmjs.com/package/express)

* Fast, unopinionated, minimalist web framework for node.