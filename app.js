import 'dotenv/config'
import { request } from "http";
import mongoose from "mongoose";
// import { data } from "./data.js";
import chalk from "chalk";
import express, { response } from "express";
import postModel from "./postSchema.js";
import { log } from "console";


const app = express();

const PORT = process.env.PORT;
const DBURI = process.env.MONGODB_URI;


app.use(express.json());
app.use(express.urlencoded({extended:true}))


mongoose.connect(DBURI);

mongoose.connection.on("connected", () => console.log("MongoDB Connected"));

mongoose.connection.on("error", (err) => console.log("MongoDB Error", err));


app.get('/products',(request,response)=>{
    response.send(data)
})

// single product
app.get('/products/:id',(request,response)=>{
    const singleProid = request.params.id
    const filterData = data.filter((e,i)=> e.id == singleProid)
    response.send(filterData)
})

app.get('/api/post',async(req,res)=>{
    res.send("get post")
})
app.post('/api/post',async (req,res)=>{
    const {title,desc,postId} = req.body;

    if (!title || !desc ||!postId){
        res.json({
            message : "fields missing"
        });
        return;
    }

    const postObj = {
        title,
        desc,
        postId,
    }

    const response = await postModel.create(postObj);

    res.json({
        message:"post created",
        data : response,
    })

    res.send("create post")
    // console.log(req.body)
    // res.send("create post")
})
app.put('/api/post',async(req,res)=>{
   const {title,desc,postId} = req.body;
   console.log(title,desc,postId);
    const updatePost = await postModel.findByIdandUpdate(postId,{title,desc});

    res.json({
        message:"post has been updated",
        data: updatePost,
    })
})
app.delete('/delete/:id',async(req,res)=>{
    const params =req.params.id;

    await postModel.findByIdAndDelete(params);

    res.json({
        message : "delete post",
    })
   
})


// app.get('/products',(req,res)=>{
   
//     console.log(req.query.id);
//     if(req.query.id){
//         const filterData = data.filter((e,i)=> e.id == req.query.id);
//         res.send(filterData);
//         return;

//     }
//     res.send(data)
// })



app.get('/',(request,response)=>{
    response.send("Hello world")
})

app.listen(PORT,()=>{
    console.log(chalk.green.bgWhite.bold("Server Running ..."))
})