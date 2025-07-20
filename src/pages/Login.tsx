import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const [data,setData] = useState({
    email:'',
    password:''
  })
  const navigate = useNavigate()
  async function handleLogin(){
    try {
      const resp = await fetch(`http://localhost:3000/api/user/login`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          email:data.email,
          password:data.password
        }),
        credentials:'include'
      })
      const res = await resp.json();
      if(res.success){
        localStorage.setItem('token',res.token)
        navigate('/');
      }
    } catch (error) {
      console.log('Error from user.tsx',error)
    }
  }

  return (
    <div className="w-screen h-screen bg-emerald-200 flex justify-center items-center">
      <div className="w-96 h-96 bg-sky-500 rounded-2xl p-2.5 flex flex-col justify-center items-center  gap-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-3">Login</h1>
        <input 
        className="rounded-3xl bg-white px-4 py-2 w-full" 
        type="email"
        placeholder="Enter your Email"
        onChange={(e)=>setData({...data,email:e.target.value})}
        />
        <input 
        className="rounded-3xl bg-white  px-4 py-2 w-full" 
        type="text"
        placeholder="Password"
        onChange={(e)=>setData({...data,password:e.target.value})}
        />
        <button 
        className="bg-white rounded-3xl px-2 py-1 font-bold w-32 hover:bg-black hover:text-white cursor-pointer"
        onClick={handleLogin}
        >Login</button>
        
      </div>
    </div>
  )
}

export default Login;