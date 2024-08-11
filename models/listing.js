const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const listingSchema = new Schema({
    title : {
        type : String,
        required : true,
    },
    description :  String,
    image : {
      type :String,
      default : "https://c1.wallpaperflare.com/preview/594/323/755/sunset-together-couple-relationship.jpg",
      set : (v) => v === "" ? "https://c1.wallpaperflare.com/preview/594/323/755/sunset-together-couple-relationship.jpg" : v,
    },
    price : Number,
    location : String,
    country : String,

});




const Listing = mongoose.model('listing', listingSchema);
module.exports = Listing;
