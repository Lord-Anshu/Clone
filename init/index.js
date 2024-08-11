const mongoose = require("mongoose");
const Listing = require("../models/listing");
const initdata = require("./data.js");



async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Aura_adventure');

}

main()
    .then(()=>{
        console.log("SUCCESS");
    })
    .catch((err) =>{
        console.log(err)
    });

const init_db = async () =>{
    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data);
    console.log("DATA WAS INITIALIZE");
}

init_db();