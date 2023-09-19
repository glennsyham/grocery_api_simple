// const uuid = require('uuid');
const express = require('express');
const app = express();
const PORT = 3000;

const myRouter = require('./routes/router_file');
// const groceryItemDao = require('./repository/grocery_item_dao');



// groceryItemDao.addGroceryItem(uuid.v4(), 'Tomato', 30, 1.00, true)
//     .then((data) => {
//         console.log('Adding Item Successful');
//     }).catch((err) => {
//         console.log('An Error Occurred!');
//         console.error(err);
//     });
// groceryItemDao.addGroceryItem(uuid.v4(), 'apple', 10, 2.00, true)
//     .then((data) => {
//         console.log('Adding Item Successful');
//     }).catch((err) => {
//         console.log('An Error Occurred!');
//         console.error(err);
//     });


app.use('/grocery', myRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})