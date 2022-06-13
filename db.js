const mongoose= require("mongoose");



//...connect...mongoose..//
//mongodb+srv://amanjaiswal:aman0612@cluster0.fpuxu.mongodb.net/IMDB
const connection=mongoose.connect("mongodb://localhost:27017/NEWS_APP")



// Title: any
// Description: any
// Date: any
// Author (Journalist): Mathias Newburn, Rey Rutty, Magdaia Shellard, Kathrine Faichney
// Location: London, New York,
// tags: politics, crime, tech, sports, health
// total views: number
// category: trending, top, new






// create Schema using new mongoose.Schema({})
const newsSchema= new mongoose.Schema({
    Title:String,
    Description:String,
    Date:String,
    Author:{type:String,enum:["Mathias Newburn","Rey Rutty","Magdaia Shellard","Kathrine Faichney"]},
    Location:{type:String,enum:["London","New York"]},
    tags:{type:String,enum:["politics","crime","tech","sports","health"]},
    total_views:Number,
    category:{type:String,enum:["trending","top","new"]}
})





//create model using mongoose.model(collection_name(singular),Schema)
const News= mongoose.model("news",newsSchema)

//module.exports ={collectionName,connection}

module.exports= {News,connection}