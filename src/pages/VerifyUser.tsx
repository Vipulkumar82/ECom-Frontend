import  { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function VerifyUser() {
    const [otp,setOtp] = useState('');
    const navigate = useNavigate()
    const params = useParams();
    console.log(params.token)
    const handleSubmitOtp = async () => {
        try {
            const resp = await fetch(`http://localhost:3000/api/user/verify-user`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    otp:otp,
                    activationToken:params.token
                })
            });
            const res = await resp.json();
            if(res.success){
                navigate('/login');
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
   <div>
        <input placeholder='Enter otp' onChange={(e)=>setOtp((prev)=>prev=e.target.value)} />
        <button onClick={()=>handleSubmitOtp()}>Submit</button>
   </div>
  )
}

export default VerifyUser