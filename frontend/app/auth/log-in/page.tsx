'use client'
import { Credentials, credentialsSchema } from "@/types/types"
import { XFetch } from "@/utils/XFetch"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Page = () => {
    const [credentials, setCredentials] = useState<Credentials>({
        email: '',
        password: ''
    })
    const router = useRouter()
    async function Log_in(){
        try{
            const validation = credentialsSchema.safeParse(credentials)
            if(!validation.success){
                console.log(validation.error.issues)
                return
            }
            const response = await XFetch('https://authentication-system-4-0mer.onrender.com/log-in', {
                body: JSON.stringify({...credentials}),
                method: 'POST'
            })
            if(response.ok){
                router.push('/')
            }
        }catch(error){
            console.log(error)
        }
    }
  return <>
    <input type="text" placeholder="email" onChange={e => setCredentials({...credentials, email: e.target.value})} />
    <input type="text" placeholder="password" onChange={e => setCredentials({...credentials, password: e.target.value})} />
    <button onClick={Log_in} className="bg-gray-400">log in</button>
  </>
}

export default Page