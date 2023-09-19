const uuid = require('uuid');
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


// groceryItemDao.updateGroceryNameById('d099d19b-b3db-49af-ae3f-6539845b7141', 'cow', 3.20, false, 10)
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((err) => {
//         console.error(err);
//     })


// groceryItemDao.retrieveAllGroceryItems()
//     .then((data) => {
//         console.log(data.Items);
//     })
//     .catch((err) => {
//         console.error(err);
//     });

// groceryItemDao.deleteGroceryItemById('d099d19b-b3db-49af-ae3f-6539845b7141')
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((err) => {
//         console.error(err);
//     })
app.use('/grocery', myRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})