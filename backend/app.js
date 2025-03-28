const dotenv = require("dotenv")
const express = require("express")
const {marked} = require("marked")
const bodyParser = require("body-parser")

const app = express();
dotenv.config()

app.use(express.json())
app.use(bodyParser.json())

const ApiKey = process.env.MY_API_KEY;
const {GoogleGenAI} = require("@google/genai")

const ai = new GoogleGenAI({ apiKey: ApiKey });

app.post("/chat", async (req,res) => {
    const {userPrompt} = req.body
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: userPrompt
        })
        res.send({"message" : marked(response.text)}).json()
    })


app.get("/",(req,res)=>{
    res.sendFile("/home/codegnani/chatbot/frontend/landingpage/page2.html")
})


module.exports = app