import { User } from "@/types/types";
import { XFetch } from "@/utils/XFetch";
import { useEffect, useState } from "react";

export default function useUser(){
  const [user, setUser] = useState<User | null>(null)
  useEffect(()  => {
    async function getUser(){
      try{
      const response = await XFetch('https://authentication-system-4-0mer.onrender.com/verify-token', {
        method: 'GET'
      })
      const res = await response.json()
      setUser(res)
    }catch(error){
      console.log(error)
    }
    }
    getUser()
  }, [])
  return {user, setUser}
}