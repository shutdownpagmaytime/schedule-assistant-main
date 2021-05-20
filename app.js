// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
var http = require('http');
var port = process.env.port || 3000;
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
}).listen(port);


var bodyParser = require("body-parser"),
express        = require("express"),
axios          = require('axios'),
app            = express();
//pythonShell = require('python-shell');
//router = express.Router();
// var options = {
//   pythonPath: 'D:/home/python27/python',
//   scriptPath: 'D:/home/site/wwwroot'
//   // args:
//   // [
//   //     req.query.term,
//   //     req.params.id,
//   //     req.session.user.searchName,
//   //     req.session.user.searchKey
//   // ]
// };
// pythonShell.run('/python_server/app.py', options, function (err, data) {
//   if (err) throw err;
//   // results is an array consisting of messages collected during execution
//   var values = JSON.parse(data[0]);
//   resultsByRel = values;
//   console.log('results: %j', resultsByRel);
// });

// app.get('/', function(req, res, next) {
//   res.send(resultsByRel);
//   // res.render('executePython', resultsByRel );  
// });

// module.exports = app;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
   res.redirect("/chatbot");
});

app.get("/chatbot", function(req, res){
   res.render("chatbot");
});

app.get("/getMessage", function(req, res){
    axios.get('http://localhost:8080?message=' + req.query.message)
      .then(function (response) {
        response = response.data;
        return res.send(response);
      })
      .catch(function (error) {
        console.log("get request to python server didn't work: " + error);
      });
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Node.js HTTP server started on port 3000!");
})
