import { useState } from "react"
import { client } from "../supabaseConfig/client"


export function Login(params) {
   
    const [emailUser, setUser]=useState("")

    async function signInWithEmail(e) {
        e.preventDefault()
       
        const {data, error} = await client.auth.signInWithOtp({
            email: emailUser,
            options: {
              // set this to false if you do not want the user to be automatically signed up
              shouldCreateUser: false,
              emailRedirectTo: 'https://proyecto-william-david-morales.netlify.app/',
            },
          })
     
      }
     
    return(
        <div>
            <form onSubmit={signInWithEmail}>
            <h3>Ingresa tu email</h3>
            <input type="text" name="email" placeholder="Ingresa tu email" onChange={e => setUser(e.target.value)}/>
            <button >send</button>
           
            </form>
        </div>
    )
}