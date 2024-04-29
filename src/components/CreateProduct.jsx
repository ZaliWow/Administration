import { useEffect, useState, useRef } from "react"
import { client } from "../supabaseConfig/client"

export function CreateProduct(params) {


  const titleRef= useRef(null)
  const priceRef= useRef(null)
  const imageRef= useRef(null)
  const descriptionRef= useRef(null)  
const [bodyProduct, setBodyProduct]= useState({
    title:"",  
    image:"", 
    description:"",
    price:""

})

const handleSubmit = async (e)=>{
    e.preventDefault()

    try {
        const token = (await client.auth.getSession()).data.session.access_token
        console.log(token)
        const res = await fetch(import.meta.env.VITE_END_POINT_PRODUCT,{
        method:'POST',
        body: JSON.stringify(bodyProduct),
        headers:{
          "apikey":`${import.meta.env.VITE_KEY_SUPABASE}`,
        "Authorization":`Bearer  ${token}`,
          "Prefer":"return=minimal",
          "Content-Type":"application/json"
        }
        })
      console.log(bodyProduct)
      
      } catch (error) {

      }






}
const handleBody =(e)=>{
setBodyProduct({...bodyProduct,[e.target.name]: e.target.value})
console.log(import.meta.env.VITE_END_POINT_PRODUCTS)

}
useEffect(()=>{
    
},[bodyProduct])

    return(
    
    <div>
        <h3>Formulario</h3>

        <form onSubmit={handleSubmit} >
<h5>Nombre del producto</h5>
<input type="text" name="title" placeholder="nombre del producto"
ref={titleRef}
onChange={handleBody}
/>
<h5>Descripcion del producto</h5>
<input type="text" name="description" placeholder="descripcion del producto" 
ref={descriptionRef}
onChange={handleBody}
/>
<h5>img del producto</h5>
<input type="text" name="image" placeholder="img del producto"
ref={imageRef}
onChange={handleBody}
/>
<h5>precio del producto</h5>
<input type="number" name="price" placeholder="precio del producto"
ref={priceRef}
onChange={handleBody} />
<button>handleSubmit</button>
        </form>


    </div>
    )
}