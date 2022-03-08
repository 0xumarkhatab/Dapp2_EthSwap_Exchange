import React,{useState,useSelector} from 'react'
import TradingChoices from './TradingChoices';
import './sellForm.css'
import { refund } from './Web3Client';
function SellForm({choiceUpdator,selector}) {

  const [ethAmount,setEthAmount] =useState(0.0);
  const [utokenAmount,setUTokenAmount] =useState(0.0);

    function handleSellTokens(){
        document.getElementById('ethereumInput').value='';    
        document.getElementById('uTokenInput').value='';
        console.log("Buying Ethereum Now.....")
        refund(utokenAmount,selector);
      
    }
    
    async function uTokenAmountChangeHandler(e){
        await setUTokenAmount(e.target.value);
        let divisor=1000.0;
        await setEthAmount(e.target.value/divisor)
        document.getElementById('ethereumInput').value=(e.target.value)/divisor;
    
        
    }
    


    return (
    <div>
      <div className="sellForm">
    <TradingChoices choiceUpdator={choiceUpdator}/>
      <div className="inputGroup">
        <label htmlFor="uTokenInput" />
        <input
          id="uTokenInput"
          type="number"
          placeholder="Enter U Tokens to Trade"
          autoComplete="off"
          onChange={async (e)=>{
            uTokenAmountChangeHandler(e);
          }}
          
        />
        <img src="./u.png" />
      </div>

      <div className="inputGroup">
        <label htmlFor="ethereumInput" />
        <input
          id="ethereumInput"
          type="number"
          placeholder="0 Ethereum Tokens"
          disabled
        />
        <img src="./eth.png" />
      </div>
      <div className="btn-sell">
        <button
          onClick={() => {
            console.log("Buy Tokens");
            handleSellTokens();
          }}
        >
          Sell U Tokens
        </button>
      </div>
    </div>


    

    </div>
  )
}

export default SellForm
