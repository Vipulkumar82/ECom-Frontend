import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
interface DataInterface {
  name:string,
  email : string,
  password : string
}
function Register() {
  const [data,setData] = useState<DataInterface>({
    name:"",
    email:"",
    password:""
  })
  const handleOnChange = (event:ChangeEvent<HTMLInputElement>) => {
    setData({...data,[event.target.name]:event.target.value})
  }
  const navigate = useNavigate()
  const handleRegister = async (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      name:data.name,
      email:data.email,
      password:data.password
    }
    try {
      const resp = await fetch(`http://localhost:3000/api/user/register`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify(formData),
        credentials:'include'
      })
      const res = await resp.json();
      if(res.success){
        navigate(`/verify-user/${res.activationToken}`);
      }
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div className="w-screen h-screen bg-emerald-200 flex justify-center items-center">
      <form onSubmit={handleRegister} className="w-96 h-96 bg-sky-500 rounded-2xl p-2.5 flex flex-col justify-center items-center gap-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-3">
          Register
        </h1>
        <input
          className="rounded-3xl bg-white  px-4 py-2 w-full"
          type="text"
          name="name"
          placeholder="Enter your Name"
          onChange={handleOnChange}
          value={data.name}
        />
        <input
          className="rounded-3xl bg-white  px-4 py-2 w-full"
          type="email"
          name="email"
          placeholder="Enter your Email"
          onChange={handleOnChange}
          value={data.email}
        />
        <input
          className="rounded-3xl bg-white  px-4 py-2 w-full"
          type="text"
          name="password"
          placeholder="Password"
          onChange={handleOnChange}
          value={data.password}
        />

        <button 
        type="submit"
        className="bg-white rounded-3xl px-2 py-1 font-bold w-32 hover:bg-black hover:text-white cursor-pointer">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
