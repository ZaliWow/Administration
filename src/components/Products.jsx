import { useState, useEffect } from "react";
import { client } from "../supabaseConfig/client"
import { Button } from "@mui/material";
import "../styles/products.css"
import {Delete} from "@mui/icons-material"
import { Edit } from "@mui/icons-material";
import { EditProducts } from "./EditProducts";



export function Products() {


    const [products, setProducts]= useState([])
    const [showEditProducts, setShowEditProducts] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
          try {
            const token = (await client.auth.getSession()).data.session.access_token
            const response = await fetch(`${import.meta.env.VITE_END_POING_READ_PRODUCTS}select=*`,
            {headers: {
                "apikey": `${import.meta.env.VITE_KEY_SUPABASE}`,
                "Authorization": `Bearer  ${token}`,
             
                "Content-Type": "application/json"
              }});
            if (response.ok) {
              const jsonData = await response.json();
              setProducts(jsonData);
              
              console.log(jsonData)
            } else {
              console.error('Error al obtener los datos:', response.status);
            }
          } catch (error) {
          
          }
          
        };
        fetchData();
      }, []);
    

const handleprueba = ()=>{
    console.log("hmmm")
}

const handleShowEditProducts = ()=>{
  setShowEditProducts(true)

}
const [idDelete, setIdDelete]=useState()
const handleDeleteProduct = async(e)=>{
  const { error } = await client
  .from('products')
  .delete()
  .eq('id', idDelete)
  
}


useEffect(()=>{
  handleDeleteProduct()
},[idDelete])




    return(
      <div>
      <h3>Mis productos</h3>
        <main  className="body-products">
          
      
            {
                products.map (product=>(
                    <div  key={product.id}  className="products">
                    <h6> {product.title}</h6>
                    <img src={product.image} alt="" />
                    <h6>$ {product.price}</h6>
                    <h6>{product.description}</h6>
                    <h6>{product.type}</h6>
                    <div>
                  <Button onClick={()=>setIdDelete(product.id)}><Delete></Delete></Button>
                  <Button onClick={handleShowEditProducts}><Edit></Edit></Button></div>
                  <EditProducts setShowEditProducts={setShowEditProducts} showEditProducts={showEditProducts} product={product}></EditProducts>
 
                                      </div>
                   )   )
            }

       </main>
    </div>
    )
}