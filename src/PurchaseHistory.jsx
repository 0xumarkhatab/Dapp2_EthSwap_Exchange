import React from 'react'
import "./PurchaseHistory.css";

function PurchaseHistory({type}) {
  return (
      <div>      {type ==="purchase"? <div className='purchase'>
      <div className='title'>
      <h1>Purchase History </h1>
      </div>
      <h3>Instructions</h3>
      <ul>
          <li>Enter Amount of Ether To buy Tokens<p>(The Utokens will be calculated)</p></li>
          <li>Click on <code>Buy Tokens</code> Button</li>
          <li>Confirm the transaction for transfer Funds to platform</li>
          <li>Confirm Transaction to Actually Purchase UTokens</li>
          <li>Wait for Transaction Completion</li>
          <li>Check number of tokens in Navbar</li>
      </ul>

    </div>
  :
<div className='refund'>
      <div className='title'>
      <h1>Refund History </h1>
      </div>
      <h3>Instructions</h3>
      <ul>
          <li>Enter Amount of Utokens To refund into Ethereum<p>(The Eth Amount  will be calculated)</p></li>
          <li>Click on <code>Sell Tokens</code> Button</li>
          <li>Confirm Transaction to Refund UTokens</li>
          <li>Wait for Transaction Completion</li>
          <li>Check Amount of Ethereum in Navbar in your account</li>
      </ul>

    </div>

}
</div>

  )
    
}

export default PurchaseHistory
