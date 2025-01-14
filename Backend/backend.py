
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from pyngrok import ngrok
import nest_asyncio
import os
import shutil
from langchain_community.document_loaders import PyPDFLoader
from openai import OpenAI

from fastapi import FastAPI, Form, UploadFile, File, HTTPException
# Allow CORS for development (adjust origins for production)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

token = os.getenv("GITHUB_TOKEN")
model = "gpt-4o"
endpoint="https://models.inference.ai.azure.com"

client = OpenAI(
    base_url=endpoint,
    api_key=token,
)

def pdfLoader(document_path):
    loader = PyPDFLoader(document_path)
    text_document = loader.load()


@app.post("/generate-cover-letter")
async def generate_cover_letter(
    company: str = Form(...),
    position: str = Form(...),
    description: str = Form(...),
    pdf: UploadFile = File(...)
):

    try:
        # Validate the uploaded file
        if not pdf.filename.endswith(".pdf"):
            raise HTTPException(status_code=400, detail="Only PDF files are allowed.")

        file_path = f"uploads/{pdf.filename}"
        os.makedirs("uploads" , exist_ok = True)
        with open(file_path , "wb") as buffer:
            shutil.copyfileobj(pdf.file, buffer)

        loader = PyPDFLoader(file_path)
        text_document = loader.load()



        prompt =  (
            f"Generate a customized cover letter  using the company name: {company}, "
            f"the position applied for: {position}, and the job description: {description}. "
            f"Ensure the cover letter highlights my qualifications and experience as detailed in the resume content.{text_document} "
            f"Adapt the content carefully to avoid including experiences not present in my resume but mentioned in the job description. "
            f"The goal is to emphasize the alignment between my existing skills and the requirements of the role."
            f"use the name , address , phone number from the resume_content and use it in the headers of the cover letter"
            f"Avoid use of bold letters"
        )
        response = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": prompt,
                },

            ],
            temperature=1.0,
            top_p=1.0,
            max_tokens=1000,
            model=model
        )

        # Return the generated cover letter
        return JSONResponse(content={"coverLetter": response.choices[0].message.content})

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

@app.post("/resume-polisher")
async def resume_polisher(

    position: str = Form(...),
    instructions: str = Form(...),
    pdf: UploadFile = File(...)
):

    try:
        # Validate the uploaded file
        if not pdf.filename.endswith(".pdf"):
            raise HTTPException(status_code=400, detail="Only PDF files are allowed.")

        file_path = f"uploads/{pdf.filename}"
        os.makedirs("uploads" , exist_ok = True)
        with open(file_path , "wb") as buffer:
            shutil.copyfileobj(pdf.file, buffer)

        loader = PyPDFLoader(file_path)
        text_document = loader.load()



        prompt =  (
            f"Considering the  following resume content: '{text_document}', suggest improvements according to the {instructions} to better align with the requirements and expectations of a {position} position."
            f"Return the polished version, highlighting necessary adjustments for clarity, relevance, and impact in relation to the targeted role"
            f"Avoid use of bold letters "
        )
        response = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": prompt,
                },

            ],
            temperature=1.0,
            top_p=1.0,
            max_tokens=1000,
            model=model
        )

        # Return the generated cover letter
        return JSONResponse(content={"polish_resume": response.choices[0].message.content})

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


@app.post("/career_advisor")
async def career_advisor(

    position: str = Form(...),
    description: str = Form(...),
    pdf: UploadFile = File(...)
):

    try:
        # Validate the uploaded file
        if not pdf.filename.endswith(".pdf"):
            raise HTTPException(status_code=400, detail="Only PDF files are allowed.")

        file_path = f"uploads/{pdf.filename}"
        os.makedirs("uploads" , exist_ok = True)
        with open(file_path , "wb") as buffer:
            shutil.copyfileobj(pdf.file, buffer)

        loader = PyPDFLoader(file_path)
        text_document = loader.load()



        prompt =  (
            f"Considering the job description: {description}, and the resume provided: {text_document}, identify areas for enhancement in the resume."
            f"Offer specific suggestions on how to improve these aspects to better match the job requirements and increase the likelihood of being selected for the position of {position}."
            f"Avoid use of bold letters "
        )
        response = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": prompt,
                },

            ],
            temperature=1.0,
            top_p=1.0,
            max_tokens=1000,
            model=model
        )

        # Return the generated cover letter
        return JSONResponse(content={"career_advisor": response.choices[0].message.content})

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


nest_asyncio.apply()  # Allow nested event loops
public_url = ngrok.connect(8001)
print(f"Public URL: {public_url}")
uvicorn.run(app, host="0.0.0.0", port=8001)
