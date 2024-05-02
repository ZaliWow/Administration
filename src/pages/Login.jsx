import { useState } from "react"
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
       console.log("email send")

    }

    return (
        <div className="body-login">
            <form onSubmit={signInWithEmail} className="form-login">
                <h3>Ingresa tu email</h3>
                <div className="email">
                <input type="text" name="email" placeholder="Ingresa tu email" onChange={e => setUser(e.target.value)} />
                <button >send</button>
                </div>
            </form>
        </div>
    )
}