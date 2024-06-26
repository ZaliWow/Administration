import { useState, useEffect } from "react"
import { client } from "../supabaseConfig/client"
import "../styles/login.css"
import { useNavigate } from "react-router-dom"


export function Login(params) {

    const [emailUser, setUser] = useState("")
    const navigate = useNavigate()
   
    async function signInWithEmail(e) {
        e.preventDefault()
        const { data, error } = await client.auth.signInWithOtp({
           email: emailUser,
           options: {
                // set this to false if you do not want the user to be automatically signed up
            shouldCreateUser: false,
               emailRedirectTo: 'https://proyecto-william-david-morales.netlify.app/',
           },
        })
       console.log(emailUser)

    }

    useEffect(()=> 
    {
const handleToken =async ()=>{
    const token = (
        await client.auth.getSession()).data.session.access_token
    
    
        if(token){
            navigate("/")      }

} 
handleToken()
    }
  
    ,[])

    return (
        <div className="body-login">
            <form onSubmit={signInWithEmail} className="form-login">
            <h1>Bienvenido a la administración de la Kasa de Klaus</h1>
         
                <h3>Ingresa tu email</h3>
                <div className="email">
                <input type="text" name="email" placeholder="Ingresa tu email" onChange={e => setUser(e.target.value)} />
                <button >send</button>
                </div>
            </form>
        </div>
    )
}