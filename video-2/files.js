const fs = require('fs')

//reading files

// fs.readFile('./docs/blog1.txt', (err, data) => {
//     if(err) {
//         console.log(err)
//     } 
//     console.log(data.toString())
// })

// console.log('hi')

// //writing files

// fs.writeFile('./docs/blog1.txt', "hello, eric", () => {
//     console.log('file was written')
// })

// fs.writeFile('./docs/blog2.txt', "hello, eric", () => {
//     console.log('file was written')
// })

//directories
// fs.mkdir and fs.rmdir takes a file path and cb function to return when its done, cb takes an error
// usually want to check if dir alr exists using fs.existsSync which takes a file path and 
// if exists alr then delete and make it if it doesnt exist alr


if (!fs.existsSync('./assets')) {

    fs.mkdir('./assets', (err) => {
        if(err) {
            console.log(err)
        }
        console.log('folder created')
    })
} else {
    fs.rmdir('./assets', (err) => {
        if (err) {
            console.log(err)
        } 
        console.log('folder deleted')
    })
}

//deleting files

if(fs.existsSync('./docs/deleteme.txt')) {
    fs.unlink('./docs/deleteme.txt', (err) => {
        if(err){
            console.log(err)
        }
        console.log('file deleted')
    })
}

//import fs using const var = require('fs') gives useful functions to manipulate data in files

//read files 
// fs.readFile('path to file', (err, data) => {
//        check to see if err if(err) console.log(err)    
//         manipulate data (console.log(data)) }
//})

//write files
// fs.writeFile('path to file', data, () => {
//      console.log('finished writing)
//})

//read and write files are asynch functions

//deleting files
//check if file exists before deleting using fs.existsSync('path'), then delete using unlink
//fs.unlink('path to file that you want to delete', (err) => {
    //check if err
    //if(err) console.log(err)
    //console.log(finished deleting)
//})