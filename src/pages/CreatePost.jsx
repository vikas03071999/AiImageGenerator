import React, {useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import { generateRandomPrompt } from '../helpers'
import preview from '../assets/preview.png'

const CreatePost = () => {
  
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt:'',
    photo:''
  })
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const randomPrompt = () => {
    let randomPromptGenerated = generateRandomPrompt(form.prompt);
    setForm({...form,prompt:randomPromptGenerated});
  }

  return (
      <div className='flex flex-col gap-16 justify-center'>
        <div className='flex flex-col gap-2 justify-center'>
          <h1 className=' text-xl font-bold'>
            Create
          </h1>
          <p className='text-[#5a5656]'>
            Create imaginative and visually stunning images through DALL-E AI
            and share them with community
          </p>
        </div>
        <div className='flex flex-col w-full gap-5 justify-center'>
          <div className='flex flex-col gap-2 justify-center'>
            <label className=' font-bold' for='name'>Your name</label>
            <input className='w-full px-3 py-3 border border-[#f0f0f0] text-sm outline-none
               rounded-xl' 
              type='text' 
              placeholder='John Doe' 
              onChange = {(e) => setForm({...form,name:e.target.value})}
              name='name'/>
          </div>
          <div className='flex flex-col gap-2 justify-center'>
            <div className='flex gap-4 w-full items-center'>
              <label className='font-bold' for='prompt'>Prompt</label>
              <button className=' py-1 px-2 text-sm font-medium bg-slate-200 rounded-md' onClick={randomPrompt}>Surprise me</button>
            </div>
            <input className='w-full px-3 py-3 border border-[#f0f0f0] text-sm outline-none
               rounded-xl' 
              type='text' 
              placeholder='A Dinosaur exploring Cape Town, photography'
              value = {form.prompt}
              name='prompt'/>
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
          <button className='w-full bg-green-600 text-white
           flex justify-center items-center py-2 rounded-md'
           >{generatingImg ? "Generating...":"Generate"}</button>
          <p className='text-sm font-medium text-[#676464]'>Once you have create the image, you can share it with others in the community</p>
          <button className='w-full bg-[#61dafb] text-white
           flex justify-center items-center py-2 rounded-md'
           >{loading ? "Sharing...":"Share with the community"}</button>
        </div>
      </div>
  )
}

export default CreatePost
