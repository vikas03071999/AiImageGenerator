import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import { generateRandomPrompt } from '../helpers'
import preview from '../assets/preview.png'

const CreatePost = () => {

  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: ''
  })
  const [generatingImg, setGeneratingImg] = useState(false);
  const [sharing, setSharing] = useState(false);

  const randomPrompt = () => {
    let randomPromptGenerated = generateRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPromptGenerated });
  }

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const res = await fetch("https://aiimagegeneration-server.onrender.com/api/openai/imageGeneration", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });
        const data = await res.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      }
      catch (err) {
        console.log(err);
      }
      finally {
        setGeneratingImg(false);
      }
    }
  }

  const uploadPost = async () => {
    if (form.photo && form.name && form.prompt) {
      try {
        setSharing(true);
        const res = await fetch('https://aiimagegeneration-server.onrender.com/api/posts/postRoute', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: form.name,
            prompt: form.prompt,
            photo: form.photo
          })
        })
        console.log(res);
        const ans = await res.json();
        console.log(ans); 
        // alert("Shared successfully");
        navigate("/");
      }
      catch (err) {
        console.log(err);
      }
      finally {
        setSharing(false);
      }
    }
  }

  return (
    <div className='max-w-5xl mx-auto flex flex-col gap-16 justify-center'>
      <div className='flex flex-col gap-2 justify-center'>
        <h1 className=' text-[32px] font-bold'>
          Create
        </h1>
        <p className='text-[#5a5656] max-w[500px]'>
          Create imaginative and visually stunning images through DALL-E AI
          and share them with community
        </p>
      </div>
      <div className='flex flex-col max-w-3xl gap-5 justify-center'>
        <div className='flex flex-col gap-2 justify-center'>
          <label className=' font-bold' htmlFor='name'>Your name</label>
          <input className='w-full px-3 py-3 border border-[#f0f0f0] text-sm outline-none
               rounded-xl'
            type='text'
            placeholder='John Doe'
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            name='name' />
        </div>
        <div className='flex flex-col gap-2 justify-center'>
          <div className='flex gap-4 w-full items-center'>
            <label className='font-bold' htmlFor='prompt'>Prompt</label>
            <button className=' py-1 px-2 text-sm font-medium bg-slate-200 rounded-md' onClick={randomPrompt}>Surprise me</button>
          </div>
          <input className='w-full px-3 py-3 border border-[#f0f0f0] text-sm outline-none
               rounded-xl'
            type='text'
            placeholder='A Dinosaur exploring Cape Town, photography'
            onChange={(e) => setForm({ ...form, prompt: e.target.value })}
            value={form.prompt}
            name='prompt' required />
        </div>
        <div className='relative flex p-3 w-64 h-64 text-sm text-gray-900 justify-center bg-gray-50 
          items-center border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500
          '>
          {
            form.photo ? (
              <img src={form.photo}
                alt={form.prompt}
                className='w-full h-full object-contain'
              />
            ) : (
              <img className='w-9/12 h-9/12 object-contain opacity-40'
                src={preview} alt='preview' />
            )
          }
          {
            generatingImg && (
              <div className='absolute inset-0 z-0 flex justify-center items-center
                bg-[rgba(0,0,0,0.5)] rounded-lg'>
                <Loader />
              </div>
            )
          }
        </div>
        <div>
        <button onClick={generateImage} className='w-full sm:w-auto px-5 py-2.5 bg-green-700 text-white
           text-center rounded-md'
        >{generatingImg ? "Generating..." : "Generate"}</button></div>
        <p className='text-sm font-medium text-[#676464]'>Once you have create the image, you can share it with others in the community</p>
        <div>
        <button className='w-full sm:w-auto bg-[#61dafb] text-white
           text-center px-5 py-2.5 rounded-md' onClick={uploadPost}
        >{sharing ? "Sharing..." : "Share with the community"}</button></div>
      </div>
    </div>
  )
}

export default CreatePost
