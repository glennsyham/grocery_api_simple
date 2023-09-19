const bodyParser = require('body-parser');
const PORT = 3000;

server.use(bodyParser.json());

// custom middleware

function addDate(req, res, next) {
    req.date = new Date(); // Adding a new date property to the incoming request
    next(); // continues the cycle of the req - res
};

// This will add the middleware to every endpoint
// server.use(addDate);

server.get('/', (req, res) => {
    res.send({
        message: "Hello World",
        date: req.date
    });
});



// Middleware can be added to a specific endpoint as another parameter to the function
server.get('/item', addDate, (req, res) => {
    res.send({
        message: "Item",
        date: req.date
    });
})

server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});