const express = require ("express");
const app = express();
const mongoose = require("mongoose"); 
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");

main().then(()=>{
    console.log("Connection Successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Voyago');
}

 app.set("view engine","ejs");
 app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));




app.get("/" , (req,res)=>{
    res.send("Hi this is root");

});
//Index routes //
app.get("/listings", async (req,res)=>{
    const allListing =await Listing.find({});
    res.render("./listing/index.ejs", {allListing});
});


//New Route//
app.get("/listings/new", (req,res)=>{
    res.render("listing/new.ejs");
});


//Show Route//
app.get("/listings/:id", async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listing/show.ejs", {listing});

});

//Create Route//

app.post("/listings",  async(req,res) =>{
   const newListing = new Listing(req.body.listing);
   await newListing.save();
    res.redirect("/listings");

});

// Edit Route//

app.get("/listings/:id/edit", async(req,res)=>{
    let{id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listing/edit.ejs", {listing});

});

//Update Route//
app.put("/listings/:id", async (req,res)=>{
    let{id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
});

//Delete Route //

app.delete("/listings/:id",async (req,res)=>{
    let{id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");

})

/*app.get("/test" ,  async (req,res) =>{
    let sampleListing =new Listing({
        title: "My Home",
        description: " By the beach",
        price:1200,
        location:"Near Beach",
        country:"India",
    });

    await sampleListing.save();
    console.log("sample is saved");
    res.send("successful testing");

});*/



app.listen(8080, ()=>{
    console.log("Server is listen on port 8080");
})