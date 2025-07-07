'use client';
import Link from 'next/link';
import React, { useState } from 'react';

const RegisterPage = () => {
  const [error,setError]=useState<string| null>('')
  const [name,setName]=useState<string>('');
  const [password,setPassword]=useState<string>('');
  const [email,setEmail]=useState<string>('');
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (!passwordRegex.test(password)) {
      setError('Password must contain at least one uppercase letter and one number');
      return;
    }

    const userData = {
      name,
      password ,
      email,
      role:'user'
    }
    const res =await fetch('/api/register',{
      method:"POST",
        headers: {
    'Content-Type': 'application/json', 
  },
      body:JSON.stringify(userData)
    })
    const data = await res.json()

    if(!res.ok){
      setError(data.error || "registration failed") 
      return
    }
    
    setError(null);
    
    alert("Registration Done")
  };
  return (
    <div  className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={e=>setName(e.target.value)}
              value={name}
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={e=>setEmail(e.target.value)}
              value={email}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={e=>setPassword(e.target.value)}
              value={password}
              placeholder="••••••••"
            />
          </div>
             
          <button
            type="submit"
            
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
          >
            Sign Up
          </button>
        </form>
        {
          error ? <p className='text-center text-red-500 text-[12px]'>{error}</p>: ""
        }
        <p className="text-sm text-center text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
