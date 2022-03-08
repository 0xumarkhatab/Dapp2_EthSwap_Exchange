import React,{useEffect, useState} from 'react'

import { Bars } from  'react-loader-spinner'
import {useDispatch,useSelector } from "react-redux";

    
function Loader() {

    const [display,setDisplay]=useState(false);
    const [loaderMessage,setLoaderMessage]=useState('');

    const dispatch=useDispatch();
    useEffect(()=>{
        //setting Loader in Redux Store
dispatch({
    type:"set_loader_function",
    loader_function:setDisplay
})
dispatch({
    type:"set_loader_message",
    loader_message:setLoaderMessage
})
setDisplay(false);
    },[])
    
    let showStatus="flex";

    if(display===false){

        showStatus="none"
        console.log("\n\t\t\t\------Loader Staus: ",showStatus);

    }
    return (
    <div style={{
        padding:"40px",
        display:{showStatus},
        flexDirection:"Column",
        alignItems:"center",
        justifyContent:"center",
        transition:"all 400ms ease-in-out",
        marginLeft: "40%",



    }
    }>
{display &&

<div>

<div
style={{
    marginLeft:"10%"
}}
>
<Bars
    height="100"
    width="100"
    color='black'
    
  />
  

    </div>
       
  <div style={{
      padding:"10px",
      border:"1px solid grey",
      borderRadius:"20px",
      width:"fit-content"

  }}>
<h4>{loaderMessage}</h4>
  </div>

    </div>
    

}   
</div>

  )
}

export default Loader
