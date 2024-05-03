import { Button } from "@mui/material"
import {Select} from "@mui/material"
import {MenuItem} from "@mui/material"
import { useFilters } from "../hooks/useFilters"
import { EditProducts } from "./EditProducts"
import { useState, useEffect } from "react"
import { Edit } from "@mui/icons-material"
import "../styles/products.css"
import { client } from "../supabaseConfig/client"
import { Delete } from "@mui/icons-material"
import {InputLabel} from "@mui/material"



export function ProductsList({}) {
const [products,setProducts] = useState([])

const {filtersProducts} = useFilters()
const [showEditProducts, setShowEditProducts] = useState(false)
const [editProduct,setEditProduct]=useState()
const nextPage =()=>{
if(numberPages>actualPage ){
     setActualPage(actualPage+1)
}
}
const prevPage =()=>{
if(actualPage != 1){
setActualPage(actualPage-1)
}
}
const {setFiltersBody} = useFilters()
const handleCategory = (e)=>{
     setFiltersBody(prevState => ({ 
      ...prevState,
      category: e.target.value})
     
     )
}
const handleShowEditProducts = (product)=>{
     setShowEditProducts(true)
     setEditProduct(product)
   
   }
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
           
           
         } else {
           console.error('Error al obtener los datos:', response.status);
         }
       } catch (error) {
       
       }
       
     };
     fetchData();
   }, []);
   const filteredProducts = filtersProducts(products)
  
 //pagination states
 const [showQuantityProducts, setShowQuantityProducts] =useState(4)
 const [actualPage, setActualPage] = useState(1)
 const valueSliceTwo = showQuantityProducts * actualPage
 const valueSliceOne = valueSliceTwo - showQuantityProducts
 const nProducts = filteredProducts.slice(valueSliceOne,valueSliceTwo)
 const numberPages = Math.ceil(filteredProducts.length / showQuantityProducts)
 
 useEffect(() => {
   if (actualPage>numberPages){
     setActualPage(1)
   }
 },[numberPages,actualPage])

const [idDelete, setIdDelete] = useState()

const handleDeleteProduct = async(e) => {
const {error} = await client.from('products').delete().eq('id', idDelete)
}
useEffect(() => {
  handleDeleteProduct()
},[idDelete])

return(
     <div>
<div className="filter">
<InputLabel id="category">Categoria</InputLabel>
        <Select
        name="type"
      id="category"
      label="type"
       onChange={handleCategory}
       sx={{margin:'1rem'}}
        value="type"
        >
           <MenuItem value="all">Todo</MenuItem>
          <MenuItem value="Hamburguesa">Hamburguesas</MenuItem>
          <MenuItem  value="Saclhipapas">Salchipapas</MenuItem>
          <MenuItem   value="Carnes">Carnes</MenuItem>
          <MenuItem  value="Bebidas">Bebidas</MenuItem>
          <MenuItem  value="Bebidas espciales">Bebidas especiales</MenuItem>
        </Select>
        </div>


<main  className="body-products">
      
      
      {
          nProducts.map (product =>(
               <div  key={product.id}  className="products">
               
              <h6> {product.title}</h6>
              <img src={product.image} alt="" />
              <h6>$ {product.price}</h6>
              <h6>{product.description}</h6>
              <div>
              <Button onClick={()=>handleShowEditProducts(product)}><Edit></Edit></Button> 
              <Button onClick={()=>setIdDelete(product.id)}><Delete></Delete></Button>
              </div>
              
              <EditProducts setShowEditProducts={setShowEditProducts} showEditProducts={showEditProducts} product={editProduct}></EditProducts>
       
                                         </div>
             )   )
      }

 </main>
 <div className="pagination">
     <Button onClick={prevPage}>-</Button>
<p>{actualPage} / {numberPages}</p>
     <Button onClick={nextPage}>+</Button>
 </div>
 </div>
)


}