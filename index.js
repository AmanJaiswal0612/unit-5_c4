const express= require("express");
//import connection & collection_name

const{News,connection}= require("./db.js")

const app=express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("server is started")
})

app.post("/news/new",async(req,res)=>{
await News.insertMany({...req.body});
return res.json({"message":"news posted"})
})

app.get("/news/get", async(req,res)=>{
    


   if(req.query.q){
      let news= await News.find({Title:{$regex:req.query.q,$options:/i/}})
      return res.json(news);
   }
   if(req.query.location){
    let news= await News.find({Location:req.query.location})
    return res.json(news);
   }
   if(req.query.author){
    let news= await News.find({Author:req.query.author})
    return res.json(news);
   }
   if(req.query.tag){
    let news= await News.find({tags:req.query.tag})
    return res.json(news);
   }
   if(req.query.title){
    let news= await News.find({Title:req.query.title})
    let tview= news[0].total_views+1;
    
    await News.updateOne({Title:req.query.title},{$set:{total_views:tview}})
    if(tview>50){
        await News.updateOne({Title:req.query.title},{$set:{category:"trending"}})
    }
    news= await News.find({Title:req.query.title});
    return res.json(news)
   }
   if(req.query.id){
    console.log(req.query.id)
    let news= await News.find({_id:req.query.id})
    let tview=news[0].total_views+1;
    await News.updateOne({_id:req.query.id},{$set:{total_views:tview}});
    if(tview>50){
        await News.updateOne({_id:req.query.id},{$set:{category:"trending"}})
    }
    news= await News.find({_id:req.query.id});
    return res.json(news)
   }

})

app.put("/update/:id",async (req,res)=>{
  let {id}= req.params;
  console.log(id)
  await News.updateOne({_id:id},{$set:{...req.body}});
  let news=await News.find({_id:id});
  return res.json(news)

})





const PORT =process.env.PORT||8080

app.listen(PORT,async()=>{
    try{
        await connection
        console.log("server on")
    }
    catch(e){
        console.log(e);
    }
    
})
