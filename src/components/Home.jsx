import { useEffect } from "react"
import { client } from "../supabaseConfig/client"
import { useNavigate } from "react-router-dom"
import { CreateProduct } from "./CreateProduct"

export function Home(params) {

    const navigate = useNavigate()
    async function signOut() {
        const { error } = await client.auth.signOut()
        navigate("/")
    }
    useEffect(() => {
        if (!client.auth.getUser()) {
            navigate("/")
        }
    }, [])
    return (
        <div>
            <h1>Home</h1>
            <button onClick={signOut}>logout</button>
            <CreateProduct></CreateProduct>
        </div>
    )
}