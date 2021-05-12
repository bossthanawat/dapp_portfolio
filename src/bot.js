const axios = require("axios");
const Web3 = require("web3");
// const bnb = require("./abiBNB.json");
var fs = require("fs");
let abiArr = [];
let a = new Promise((resolve, reject) => {
    let files = fs.readdirSync("./ABI")
    files.forEach((file) => {
    console.log(file);
    fs.readFile(`./ABI/${file}`, function readFileCallback(err, data) {
      if (err) {
        console.log(err);
      } else {
        try {
          obj = JSON.parse(data); //now it an object
        } catch (error) {
          console.log(`this file has err ${file}`);
          console.log(error);
        }
        //   console.log(obj)
        abiArr.push({
          name: file,
          abi: obj,
        });
        if (abiArr.length == files.length-1 ){
            resolve(abiArr)
        }
      }
    });
  });
});
a.then((data)=>{
    console.log(data)
    let priceTracking = []
    data.map((obj)=>{
        let name = obj['name']
        if(name.split('-')[2] == 'bnb.json' || name.split('-')[2] == 'busd.json' || name.split('-')[2] == 'eth.json') priceTracking.push(obj)
    })
    priceTracking.map(({name})=>{
        console.log(name)
    })
})

