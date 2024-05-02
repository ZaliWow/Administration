export function Alerta ({alertState}){
    if  (alertState=== false)return(
        <span style={{color:'red'}}>Recuerda llenar todos los campos (por favor llena todos los campos)</span>
    )
}