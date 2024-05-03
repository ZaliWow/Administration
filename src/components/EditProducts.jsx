
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { UploadFile } from '@mui/icons-material';
import CircularProgress from "@mui/material/CircularProgress"
import { Input } from '@mui/material';
import "firebase/storage"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { UxUpload } from './UxUpload';
import { initializeApp } from "firebase/app"
import { client } from '../supabaseConfig/client';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'white',
  boxShadow: 0,
  borderRadius: '5%',
  p: 4,
};

export function EditProducts({ showEditProducts, setShowEditProducts, product }) {



  const [bodyEditProduct, setBodyEditProduct] = useState(
    product
  )

  const handleClose = () => setShowEditProducts(false);
  
  const handleEditBodyNewProduct = (e) => {
    setBodyEditProduct(prevState => ({
      
        ...prevState,
         [e.target.name]: e.target.value 
    }))
  }


  //photo states
  const [uxUpload, setUxUpload] = useState(false)
  const [alertState, setAlertState] = useState(false)
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

  const handleUploadFoto = async () => {
    if (fileFoto !== null)
      try {
        setUxUpload(true)
        const storageRef = ref(storage, idFoto)
        await uploadBytes(storageRef, fileFoto)
        const url = await getDownloadURL(storageRef)
        setBodyEditProduct({ ...bodyEditProduct, image: url })
        setUxUpload(false)
      } catch (error) {
        console.log(error)
      }
  }
  useEffect(() => {
    handleUploadFoto()
  }, [fileFoto])





  const handleUpdate = async () => {
    setUxUpload(true)
    const { data, error } = await client
      .from('products').update(bodyEditProduct).eq('id', parseInt(product.id)).select()

    if (error) throw error
    
    setUxUpload(false)
    setShowEditProducts(false)
   
  }






  if (showEditProducts === true) return (
    <div>

      <Modal
        open={showEditProducts}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form  >
            <p>Cambiar titulo</p>
            <Input type="text" placeholder={product.title} name="title" onChange={handleEditBodyNewProduct}></Input>
            <p>Cambiar descripción</p>
            <Input type="text" placeholder={product.description} name="description" onChange={handleEditBodyNewProduct}></Input>
            <p>Cambiar imagen</p>
            <img style={{width:'100px'}} src={product.image} alt="" />
        
            <Input type="file" placeholder='Nueva Imagen' name="image" onChange={handleFileChange}></Input>
            <p>Cambiar precio</p>
            <Input type="number" placeholder={toString(product.price)} name="price" onChange={handleEditBodyNewProduct}></Input>
            <p>cambiar tipo :{product.type}</p>


          </form>

          <Button onClick={handleUpdate} sx={{ color: 'white', backgroundColor: 'black', marginTop: '10px', ':hover': { color: 'black' } }}>Realizar cambios</Button>

        
        </Box>
      </Modal>

      <UxUpload uxUpload={uxUpload} setUxUpload={setUxUpload}></UxUpload>
    </div>
  );
}