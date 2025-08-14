from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
import os

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat_endpoint(req: ChatRequest):
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": req.message}]
    )
    return {"response": response.choices[0].message.content.strip()}
