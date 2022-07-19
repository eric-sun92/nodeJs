const {people, ages} = require('./people.js')


console.log(people)
console.log(ages)

const os = require('os')

console.log(os.platform(), os.homedir())


//import functions/variables/files using require("path to other file")
//u can use these imported functions now
//os (operating system) is a useful module to import - gives platform and homedir functions