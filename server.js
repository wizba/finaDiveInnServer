const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const cors = require("cors"); 
const dinerHandler= require('./controllers/diner.cotroller.js');
var socketIO = require('socket.io');
var PORT = process.env.PORT || 3000;

app.use(cors()); 
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
//database config
const mongoose = require("mongoose") // new

// Connect to MongoDB database
// creating database connection
//mongodb+srv://softwareDev:<password>@deveindatabase.dbk2t.mongodb.net/test
//mongodb+srv://softwareDev:HnxwY0jl96W0UgIC@deveindatabase.dbk2t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//mongodb://softwareDev:HnxwY0jl96W0UgIC@clustermasjeed1-shard-00-00-ekpfe.mongodb.net:27017,clustermasjeed1-shard-00-01-ekpfe.mongodb.net:27017,clustermasjeed1-shard-00-02-ekpfe.mongodb.net:27017/test?ssl=true&replicaSet=ClusterMasjeed1-shard-0&authSource=admin&retryWrites=true
//connection='mongodb://127.0.0.1:27017/DiveI'
connection="mongodb+srv://softwareDev:HnxwY0jl96W0UgIC@deveindatabase.dbk2t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(connection, { useNewUrlParser: true ,useUnifiedTopology: true}).then(function(){
    console.log('connected successfully')
}, function(err) {
    console.log(err.message) 
})


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/g',dinerHandler.hello);
var routes = require('./routes/routes.js');
routes(app);
let server =app.listen(PORT, () => {
  console.log(`Example app listening  http://localhost:${PORT}`)
})


// initialising a websocket
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('data', (data) => {
      console.log(data);

      io.emit('message',data)
    });

    //recieve oder from frontend send it to kitchen
    socket.on('order', (data) => {
      console.log(data);

      io.emit('clientOrder',data)
    });

    //recieves data from kitchen about progress and send it to client
    socket.on('progress', (data) => {
      console.log(data);

      io.emit('orderProgress',data)
    });
    
    socket.on('disconnect', () => console.log('Client disconnected'));
});