const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// built-in middleware to handle urlencoded data
// in other words, form data:
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// built-in middleware to get parsed json in req.body
app.use(express.json());

// bult-in middleware to serve static files
app.use(express.static(path.join(__dirname, '/public')));
