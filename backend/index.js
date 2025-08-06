const express=require("express")
const axios=require("axios")
const cors=require("cors")
const{WebSocketServer}=require("ws")
const app=express()
app.use(express.json())
app.use(cors())
app.post("/chat",(req,res)=>{
    const chat=req.body.chat
    const model=req.body.model
    if(model=="Gemini 2.5 Pro"){
        axios.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent",{
        "contents":[
      {
        "parts": [
          {
            "text": chat
          }
        ]
      }
    ]
 
    },{
        headers:{
            "x-goog-api-key":"secret"
        }
    }).then(response=>{
        const ans=response.data.candidates[0].content.parts[0].text
        res.json({ans:ans})
    })
    }
    else if(model=="Gemini 2.5 Flash"){
        axios.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",{
        "contents":[
      {
        "parts": [
          {
            "text": chat
          }
        ]
      }
    ]
 
    },{
        headers:{
            "x-goog-api-key":"secret"
        }
    }).then(response=>{
        const ans=response.data.candidates[0].content.parts[0].text
        res.json({ans:ans})
    })
    }
    
    
    else if(model=="gemini-2.5-flash-lite-preview-06-17"){
        axios.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite-preview-06-17:generateContent",{
        "contents":[
      {
        "parts": [
          {
            "text": chat
          }
        ]
      }
    ]
 
    },{
        headers:{
            "x-goog-api-key":"secret"
        }
    }).then(response=>{
        const ans=response.data.candidates[0].content.parts[0].text
        res.json({ans:ans})
    })
    }
    
})
app.listen(3008)
//const server=app.listen(3008)
/*const ws=WebSocketServer({
    server:server
})
ws.on('connection',(wss)=>{
    wss.on("message",(message)=>{
        const {query}=JSON.parse(message)
        if(model=="Gemini 2.5 Flash"){
        axios.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",{
        "contents":[
      {
        "parts": [
          {
            "text": query
          }
        ]
      }
    ]
 
    },{
        headers:{
            "x-goog-api-key":"AIzaSyDZqwifJhkGn814boaFkLhCcZO-u45iRto"
        }
    }).then(response=>{
        wss.send(response.data.candidates[0].content.parts[0].text)
    })
    }
    
    

    })
})*/
