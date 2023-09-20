const express = require('express');
const router = express.Router();
const groceryItemDao = require('../repository/grocery_item_dao');
const uuid = require('uuid');
const url = require('node:url');
const { createLogger, transports, format } = require('winston');
// create the logger
const logger = createLogger({
    level: 'info', // this will log only messages with the level 'info' and above
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: [
        new transports.Console(), // log to the console
        new transports.File({ filename: 'info.log', level: 'info' }),
        new transports.File({ filename: 'error.log', level: 'error' }),
    ]
})

// router.get('/', (req, res) => {
//     const requestUrl = url.parse(req.url).query;
//     const req_params = new URLSearchParams(requestUrl);
//     const id = req_params.get('id');
//     if (id == null) {
//         groceryItemDao.retrieveAllGroceryItems()
//             .then((data) => {
//                 res.writeHead(200, { 'Content-Type': 'application/json' });
//                 res.end(JSON.stringify(data));
//             })
//             .catch((err) => {
//                 console.error(err);
//             });
//     } else {
//         groceryItemDao.retrieveGroceryItemById(id)
//             .then((data) => {
//                 res.writeHead(200, { 'Content-Type': 'application/json' });
//                 res.end(JSON.stringify(data));
//             })
//             .catch((err) => {
//                 console.error(err);
//             });
//     }

// });
router.get('/', (req, res) => {
    groceryItemDao.retrieveAllGroceryItems()
        .then((data) => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
        })
        .catch((err) => {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            logger.error(err.message);
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    groceryItemDao.retrieveGroceryItemById(id)
        .then((data) => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
        })
        .catch((err) => {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            logger.error(err.message);
        });

});

let log_data;
router.post('/', (req, res) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        const data = JSON.parse(body);
        let grocery_id = uuid.v4();
        log_data = data;
        groceryItemDao.addGroceryItem(grocery_id, data.name, parseInt(data.quantity), parseFloat(data.price), data.purchased).then((data) => {
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Resource Created Successfully!', id: grocery_id }));
            logger.info(" ADD " + JSON.stringify(log_data));

        })
            .catch((err) => {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                logger.error(err.message);
            });



    });
});

router.put('/', (req, res) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        const data = JSON.parse(body);
        log_data = data;
        groceryItemDao.updateGroceryNameById(data.id, data.name, parseInt(data.quantity), parseFloat(data.price), data.purchased).then((data) => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Resource Created Successfully!' }));
            logger.info(" UPDATE " + JSON.stringify(log_data));

        })
            .catch((err) => {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                logger.error(err.message);
            });



    });
});
router.delete('/:id', (req, res) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        const { id } = req.params;
        log_data = id;
        groceryItemDao.deleteGroceryItemById(id).then((data) => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Resource Deleted Successfully!' }));
            logger.info(" DELETE " + log_data);

        })
            .catch((err) => {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                logger.error(err.message);
            });



    });
});
module.exports = router;