//file system module imported
const fs = require('fs')


//create a read Stream
//takes a readable file, optional argument (encoding : utf8 which makes the data readable)
const readStream = fs.createReadStream('./docs/blog3.txt', {encoding : 'utf8'})

//create a write Stream
//takes a writeable file 
const writeStream = fs.createWriteStream('./docs/blog4.txt')



// readStream.on('data', (chunk) => {
//     console.log('-------- NEW CHUNK -------')
//     console.log(chunk)
//     writeStream.write('\n NEW CHUNK\n')
//     writeStream.write(chunk)
// })

readStream.on('data', (chunk) => {
    writeStream.write(chunk)
})


// readStream.on is like an eventListener that takes data and cb function
// when it reads data, then it passes a chunk of that data into the cb function
// you can write that chunk of data then to another file or do whatever you want with that data (print it out)
// this speeds up the process (asynch function might take a while) - you can start using the data almost immideatly instead
// of waiting for the whole data file to be processed/read
// writeStream.write will write the parameter to the writable file inside the writeStream


//piping
//must be a readable file to writable file 
//can directly take a readstream and write the data it reads
//to another file
readStream.pipe(writeStream)