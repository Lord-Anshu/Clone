const express = require("express");
const app = express();
const port = 7000;
const mongoose = require("mongoose");
const mongo_url = "mongodb://127.0.0.1:27017/maja_masti";
const Listing = require("./models/listing.js");
const path = require("path");
const method_override = require("method-override");
const ejs_mate = require("ejs-mate");

async function main() {
    await mongoose.connect(mongo_url);
}

main().then(()=>{
    console.log("DB connected");
}).catch((err)=>{
    console.log(err);
})

app.use(express.static(path.join(__dirname , "/public")));
app.set("view engine", "ejs");
app.set("views",path.join(__dirname , "views"));
app.use(express.urlencoded({extended : true}));
app.use(method_override("_method"));
app.engine("ejs",ejs_mate);

app.get("/home",(req,res)=>{
    res.send("Anshu lala");
    console.log("atta zmla khel");
});

//Index Route
app.get("/listings",async(req,res)=>{
    const all_listings = await Listing.find({});
    res.render("listings/index.ejs" , {all_listings});
});

//New Route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});

//Show Route
app.get("/listings/:id",async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing})
});

//Create Route
app.post("/listings",async(req,res)=>{
    let new_listing =  new Listing (req.body.listing);
    await new_listing.save();
    res.redirect("/listings");
});

//Edit Route
app.get("/listings/:id/edit",async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});

//Update Route
app.put("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect("/listings");
});

//Delete Listing-
app.delete("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    let delete_listing = await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})

app.listen(port,()=>{
    console.log("App is listening on port ", port);
});



