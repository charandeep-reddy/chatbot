import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
dotenv.config()

app.use(bodyParser.json())
// app.use(express.static('public'));

const ApiKey = process.env.Gemini_api_key
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: ApiKey });

async function main(userMessage) {
const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: userMessage,
    config: {
        systemInstruction: "Provide Content in Plain Text",
    },
});
return response.text
console.log(response.text);
}





app.get("/",(req,res)=>{
    res.send("Hello Get is working perfectly fine")
})
app.post("/chat", async (req,res)=>{
    try{
    const userMessage = req.body;
    const GeminiResponse = await main(userMessage)

    res.json({
        message:"Gemini  Response has been sent successfully",
        data : GeminiResponse
    })
}
    catch(err){
        console.log(`Error:${err}`)
        res.status(500).json({
            message:"Internal Server Error",
            error:err.message
        })
    }
})

module.export = app