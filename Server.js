const express = require('express');
const app = express();
const mongoose = require('mongoose');
const registerRoute = require('./Routers/RegisterRoute.js');
const cors = require('cors'); 
const loginRoute = require('./Routers/LoginRoute.js')
const uploadPic = require('./Routers/uploadImg.js')
const homeRoute = require('./Routers/Home.js')
const logoutRoute = require('./Routers/Logout.js');
const bodyParser = require('body-parser'); // Require body-parser
require('dotenv').config();

app.use(express.json());
app.use(cors);

const { mongodurl } = process.env;
mongoose.connect(mongodurl)
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Increase payload size limit
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/', registerRoute);
app.use('/', loginRoute);

// Apply cors only to the uploadPic route
app.use('/client', cors(), uploadPic);

app.use('/', homeRoute);
app.use('/api', logoutRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
