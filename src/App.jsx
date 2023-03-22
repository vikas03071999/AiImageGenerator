import { useState } from 'react'
import './App.css'
import {BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
function App() {
    return (
      <BrowserRouter>
        <header className='w-full flex justify-between items-center bg-white sm:px-8 p-4
          border-b 5 border-b-[#e6ebf4]
        '>
        <Link to="/" className='flex'>
          <h1 className='font-bold'>AI</h1><p className='font-light'>mage</p>
        </Link>
        <Link to="/createPost" className='font-Noto Sans font-medium bg-[#61dafb] text-white px-3
        py-1 rounded-md'>
          Create
        </Link>
        </header>
        <main className='w-full min-h-[calc(100vh-65px)] sm:p-8 px-4 py-8  bg-[#f9fafe]'>
          <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route exact path="/createPost" element={<CreatePost />}/>
          </Routes>
        </main>
      </BrowserRouter>
    )
  
}

export default App
