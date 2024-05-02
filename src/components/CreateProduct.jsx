import { useEffect, useState, useRef } from "react"
import { client } from "../supabaseConfig/client"
import "../styles/createProduct.css"
import { Input } from "@mui/material"
import { Button } from "@mui/material"
import "firebase/storage"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { initializeApp } from "firebase/app"
import { UxUpload } from "./UxUpload"
import { Alerta } from "./Alert"
import {Select} from "@mui/material"
import {MenuItem} from "@mui/material"


export function CreateProduct(params) {


  const titleRef = useRef(null)
  const priceRef = useRef(0)
  const imageRef = useRef(null)
  const descriptionRef = useRef(null)
  const [bodyProduct, setBodyProduct] = useState({
    title: "",
    image: "",
    description: "",
    price: "",
    type:""
  })

 
  const handleBody = (e) => {
    setBodyProduct({ ...bodyProduct, [e.target.name]: e.target.value })
    console.log(bodyProduct)

  }

  //photo states
  const [uxUpload, setUxUpload] = useState(false)
  const [alertState, setAlertState]= useState(false)
  const [fileFoto, setFileFoto] = useState(null)
  const [idFoto, setIdFoto] = useState()
  //upload foto logic
  const handleIdFoto = () => {

    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth();
    const anyo = fechaActual.getFullYear();
    const hora = fechaActual.getHours();
    const minutos = fechaActual.getMinutes();
    const segundos = fechaActual.getSeconds();

    const fechaHoraString = `Photo-product:${dia}:${mes}:${anyo}:${hora}:${minutos}:${segundos}`

    setIdFoto(fechaHoraString)
  }
  //CONFIG
  const firebaseConfig = {
    storageBucket: import.meta.env.VITE_CONFIG_STORAGE
  };
  const app = initializeApp(firebaseConfig);
  const storage = getStorage();

  const handleFileChange = (e) => {
    e.preventDefault()
    setFileFoto(e.target.files[0])
    handleIdFoto()
  }

  const handleUploadFoto = async()=>{
    if(fileFoto !== null)
try {
  setUxUpload(true)
   const storageRef = ref(storage, idFoto)
    await uploadBytes(storageRef, fileFoto)
    const url = await getDownloadURL(storageRef)
    setBodyProduct({ ...bodyProduct, image: url })
    
    setUxUpload(false)
} catch (error) {
  console.log(error)
}
  }
useEffect(() =>{
handleUploadFoto()
},[fileFoto])
useEffect(()=>{
  if(bodyProduct.title !== "" && bodyProduct.image !=="" && bodyProduct.price !=="" && bodyProduct.image !==0)
  {setAlertState(true)
  console.log("ya es true")
  }
  },[bodyProduct])
  
  const handleUpload = async (e) => {
    e.preventDefault()
    setUxUpload(true)
    const token = (await client.auth.getSession()).data.session.access_token
    const res = await fetch(import.meta.env.VITE_END_POINT_PRODUCT, {
      method: 'POST',
      body: JSON.stringify(bodyProduct),
      headers: {
        "apikey": `${import.meta.env.VITE_KEY_SUPABASE}`,
        "Authorization": `Bearer  ${token}`,
        "Prefer": "return=minimal",
        "Content-Type": "application/json"
      }
    })
    
    setUxUpload(false)


  }


  return (

    <div className="body-createproduct">
      <UxUpload uxUpload={uxUpload} setUxUpload={setUxUpload}></UxUpload>
      <div className="title-createproduct">
        <h3>Registrar nuevo producto</h3>
      </div>
      <form onSubmit={handleUpload} className="form-createproduct">
        <p>Nombre del producto (recomendado nombres descriptivos)</p>
        <Input type="text" name="title" placeholder="nombre del producto"
          ref={titleRef}
          onChange={handleBody}
        />
        <p>Elige el tipo de producto</p>
        <Select
        name="type"
        onChange={handleBody}
        >
          <MenuItem value="Hamburguesa">Hamburguesas</MenuItem>
          <MenuItem  value="Saclhipapas">Salchipapas</MenuItem>
          <MenuItem value="Carnes">Carnes</MenuItem>
          <MenuItem  value="Bebidas">Bebidas</MenuItem>
          <MenuItem  value="Bebidas espciales">Bebidas especiales</MenuItem>
        </Select>
        <p>Descripcion del producto</p>
        <Input type="text" name="description" placeholder="descripcion del producto"
          ref={descriptionRef}
          onChange={handleBody}
        />
        <p>Imagen del producto (recomendado imagenes webp)</p>
        <Input type="file" name="image" placeholder="img del producto"
          ref={imageRef}
          onChange={handleFileChange}
        />
        <p>Precio del producto (en pesos CO sin puntuacion ejemplo: $15000)</p>

        <Input type="number" name="price" placeholder="precio del producto" ref={priceRef} onChange={handleBody}></Input>
        <Alerta alertState={alertState}></Alerta>

        <div className="button-createproduct">
          <Button variant="ouline-dark" onClick={handleUpload}  disabled={alertState ? false : true} sx={{color:'black', backgroundColor:'white'}}>Registrar producto </Button>
        </div>
       
      </form>
     

    </div>
  )
}