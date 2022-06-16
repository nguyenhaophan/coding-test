# Coding challenge  
To run this, you need to have mongoDB installed in your local machine

# Installing
Run these commands from project directory to install NPM modules

```
cd api
npm install
```

```
cd client 
npm install
```

# Environment Variables
Make sure to create a .env file for both api and client directories

In /api directory. Create .env file

    JWT_SECRET=YOUR_KEY_HERE

In /client directory. Create .env.local

    REACT_APP_BACKEND=http://localhost:5000/api/v1


# Running the app
Open a terminal on api directory

    npm run start:dev

Open another terminal on client directory

    npm run start

# Tech stack
* React
* Mongoose
* Nestjs
* Typescript
* Redux Toolkit
* React Hook Form
* Axios
* Passportjs
* Material UI