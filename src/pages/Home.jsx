import { useEffect } from "react"
import { client } from "../supabaseConfig/client"
import { useNavigate } from "react-router-dom"




export function Home(params) {

    const navigate = useNavigate()
    async function signOut() {
        const { error } = await client.auth.signOut()
        navigate("/login") 
    }
    
    useEffect(() => {
        if (!client.auth.getUser()) {
            navigate("/login") 
        } 
    }, [])
    
    return (
       <div>
<h1>Welcome to the hermanos pollos family</h1>
        </div>
    )
}