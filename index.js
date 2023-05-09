import express from "express"
const app=express();

import dotenv from "dotenv"
dotenv.config();

import { MongoClient } from "mongodb";

import obj from "mongodb"


app.use(express.json());

const ObjectId=obj.ObjectId;

const PORT=process.env.PORT
const MONGO_URL=process.env.MONGO_URL
const createConnection=async()=>{
    const client=new MongoClient(MONGO_URL);
   await client.connect();
   console.log("client Connected");
   return client
}

const client=await createConnection();




app.listen(PORT,()=>console.log("Welcome to backend"))

app.get("/",(req,res)=>{
    res.send("Mentor Created ")
    })

//Get Mentors
app.get("/mentor",async(req,res)=>{

    try {
        const query=req.query;
    const mentor=await client
    .db("Task3")
    .collection("mentor")
    .find(query).toArray()

    res.status(201).send(mentor) 
    } catch (error) {
       res.status(500).send("Server Error") 
    }
   
})

//Write API to create Mentor
app.post("/mentor",async(req,res)=>{
    const data=req.body;
    
    try {    
        console.log("mentor 1st mentor")
    console.log(data)
    const mentor=await client
    .db("Task3")
    .collection("mentor")
    .insertOne(data)

    res.status(201).send(mentor) 
    } catch (error) {
       res.status(500).send("Server Error") 
    }
})

app.post("/mentor/many",async(req,res)=>{

    try {
        const data=req.body;
        console.log(data)
    const mentor=await client
    .db("Task3")
    .collection("mentor")
    .insertMany(data)

    res.status(201).send(mentor) 
    } catch (error) {
       res.status(500).send("Server Error") 
    }
})

// Write API to Assign a student to Mentor
app.put("/mentor/assignStudent/:id",async(req,res)=>{
const {id}=req.params;
const data=req.body
try {
    if(!data){
        res.send({data:"Enter Valid Input"})
        return
    }
    const mentor=await client
.db("Task3")
.collection("mentor")
.updateOne({_id:new ObjectId(id)},{$set:{student:req.body.studentName}})
res.status(200).json({data:"Updated Successfully"})
} catch (error) {
    console.log(error)
    res.send(500).json("Server Error")
}

})

// Select one mentor and Add multiple Student 

app.put("/mentor/assignStudents/:id",async(req,res)=>{
    const {id}=req.params;
    const data=req.body
    try {
        if(!data){
            res.send({data:"Enter Valid Input"})
            return
        }
        const mentor=await client
    .db("Task3")
    .collection("mentor")
    .updateOne({_id:new ObjectId(id)},{$set:req.body})
    res.status(200).json({data:"Updated Successfully"})
    } catch (error) {
        console.log(error)
        res.send(500).json("Server Error")
    }
    
    })


//Get Students
app.get("/student",async(req,res)=>{

    try {
        const query=req.query;
    const student=await client
    .db("Task3")
    .collection("student")
    .find(query).toArray()

    res.status(201).send(student) 
    } catch (error) {
       res.status(500).send("Server Error") 
    }
   
})

// Write API to create Student
app.post("/student",async(req,res)=>{
    const data=req.body;
    
    try {    
        console.log("entering post mentor")
    console.log(data)
    const student=await client
    .db("Task3")
    .collection("student")
    .insertOne(data)

    res.status(201).send(student) 
    } catch (error) {
       res.status(500).send("Server Error") 
    }
})

app.post("/student/many",async(req,res)=>{

    try {
        const data=req.body;
        console.log(data)
    const student=await client
    .db("Task3")
    .collection("student")
    .insertMany(data)

    res.status(201).send(student) 
    } catch (error) {
       res.status(500).send("Server Error") 
    }
})

// Write API to Assign or Change Mentor for particular Student
// Select One Student and Assign one Mentor
app.put("/student/assignMentor/:id",async(req,res)=>{
    const {id}=req.params;
    const {query}=req.query;
    try {
        const assignMentor=await client
        .db("Task3")
        .collection("student")
        .updateOne({_id:new ObjectId(id)},{$set:{Mentor:req.body.mentor}})

        
        console.log(assignMentor)
        if(!assignMentor){res.status(400).json({message:"Can not assign mentor"})}
    
        res.status(200).json(assignMentor)
        
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error") 
    
    }
   

// A student who has a mentor should not be shown in List
app.get("/student/mentor",async(req,res)=>{
    console.log(req.body);
    try { 
        const student=await client
        .db("Task3")
        .collection("student")
        .find(req.body).toArray()
    if(!student){res.status(400).json({message:"Can not assign mentor"})}

    res.status(200).json(student)
} catch (error) {
    console.log(error)
    res.status(500).send("Server Error") 
}
   
})

// Write API to show all students for a particular 
app.get("/student/particular",async(req,res)=>{
    console.log(req.body);
    const query=req.query
    try { 
        const student=await client
        .db("Task3")
        .collection("student")
        .find(query).toArray()

    if(!student){res.status(400).json({message:"Can not assign mentor"})}

    res.status(200).json(student)
} catch (error) {
    console.log(error)
    res.status(500).send("Server Error") 
}
   
})


})