var http = require('http');
 var url = require('url');
   var fs = require('fs');
http.createServer(function (request, response) {
       var path = url.parse(request.url).pathname;
       // Router for the code.
       switch(path){
                   case '/':
                       response.writeHead(200, {'Content-Type': 'text/html'});
                       response.write('hello world');
                       response.end();
                       break;
                   case '/socket.html':
                       console.log("hi" );
                       fs.readFile(__dirname + path, function(error, data){
                       console.log(data);
                           if (error){
                               response.writeHead(404);
                               response.write("opps this doesn't exist - 404");
                               response.end();
                           }
                           else{
                               response.writeHead(200, {"Content-Type": "text/html"});
                               response.write(data, "utf8");
                               response.end();
                           }
                       });
                       break;
                   default:
                       response.writeHead(404);
                       response.write("opps this doesn't exist - 404");
                       response.end();
                       break;
               }
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello World\n');
}).listen(8124);

console.log('Server running at http://127.0.0.1:8124/');