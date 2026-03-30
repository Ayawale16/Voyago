const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main()
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Voyago");
}

const initDB = async () => {
  await Listing.deleteMany({});

  const updatedData = initData.data.map((item) => ({
    ...item,
    image: item.image.url,   // ✅ conversion happening
  }));

  await Listing.insertMany(updatedData);

  console.log("Data is added");
};

initDB();