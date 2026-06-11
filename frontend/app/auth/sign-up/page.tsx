'use client'
import generateID from "@/utils/generateID";
import { XFetch } from "@/utils/XFetch";
import { useState } from "react";
import { UserSchema } from "@/types/types";

export default function Home() {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: ''
  })
  async function Register(){
    try{
      const validation  = UserSchema.safeParse(credentials)
      if(!validation.success){
        console.log(validation.error.issues)
        return
      }
      await XFetch('https://authentication-system-4-0mer.onrender.com/sign-up', {
        method: 'POST',
        body: JSON.stringify({...credentials, id: generateID(20)})
      })
    }catch(error){
      console.log(error)
    }
  }
  return <>
    <input type="text" placeholder="name" onChange={e => setCredentials({...credentials, name: e.target.value})} />
    <input type="text" placeholder="email" onChange={e => setCredentials({...credentials, email: e.target.value})} />
    <input type="text" placeholder='password' onChange={e => setCredentials({...credentials, password: e.target.value})} />
    <button onClick={Register} className="bg-gray-400">register</button>
  </>
}