import { NextRequest, NextResponse } from "next/server"
import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(config)
 
export const runtime = 'edge'


export async function POST(req: Request){

    if(req === null || req === undefined) return new Response("No data found in request", {status: 404});
    const {prompt, diet, advanced, quick} = await req.json();
    

    console.log(prompt)
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: [
        {
          role: 'system',
          content: 'Please format your response as if you were writing a cookbook. Please include macros in your response if possible'
        },
        
        {
          role: 'user',
          content: `${quick} ${advanced === undefined ? "" : advanced} ${diet === undefined ? "" : diet} ${prompt} recipe with steps`
        }
      ],
      temperature: 1,
      top_p: 1,
      max_tokens: 2048,
      presence_penalty: 0,
      frequency_penalty: 0
    })

    const stream = OpenAIStream(response)
    return new StreamingTextResponse(stream)
}

