const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type:String,
        required:true,

    },
    description:String,
    image: {
  type: String,
  default: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
  set: (v) => v === "" ? "https://images.unsplash.com/photo-1507089947368-19c1da9775ae" : v
},
    
    price:Number,
    location:String,
    country:String,

});

const Listing =mongoose.model("Listing", listingSchema);
module.exports = Listing;

