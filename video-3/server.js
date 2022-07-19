//import the http module (hyper-text transfer protocol) allows communication between client and our server
const http = require('http')
const fs = require('fs')

//create a local server using http.createServer() actively listening to requests from browser and respond to them
//takes two objects in the cb which runs when there is a request recieved from client browser
//req object (has lots of info about what the request is) and response object
const server = http.createServer((req, res) => {
    console.log(req.url, req.method)

    //set header content type
    res.setHeader("Content-Type", "text/html")

    let path = './views/'
    switch(req.url) {
        case '/': 
            path += 'index.html'
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html'
            res.statusCode = 200;
            break;
        case '/about-me':
            res.statusCode = 301
            res.setHeader('location', '/about')
            res.end()
            break;
        default:
            path += '404.html'
            res.statusCode = 404;
            break;
    }


    //send an html file
    fs.readFile(path, (err, data) => {
        
        if(err){
            console.log(err)
        }
        else {
            res.write(data)
            console.log(res)
            // res.write(data)
            res.end()
        }
    })

    res.end()
})  

//server needs to invoke listen method to lsiten for requests
//takes a port number and host name (localhost - default value) and cb function that fires when start lsitening

server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000')
})