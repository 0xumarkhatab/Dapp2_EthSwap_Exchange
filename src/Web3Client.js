import ethSwap from "contracts/ethswap.json";

let Web3;
let provider =undefined;
let selectedAccount;
let address;
let contract;
let web3;


let dispatch;

export async function init(dispatch_){
  dispatch=dispatch_;
Web3=require("web3");
provider = window.ethereum;
if(provider!==undefined){
  console.log("You have provider",provider);
 
  provider.request({
    method:"eth_requestAccounts",
  }).then(async (accounts)=>{
    selectedAccount=accounts[0]
    console.log("selected account is ",accounts[0]);
    dispatch({
      type:"set_current_user_address",
      current_user_address:selectedAccount
    })

    let ethBal=await web3.eth.getBalance(selectedAccount)
    console.log("ethereum balance ",ethBal)
    dispatch({
      type:"set_user_ethereum_balance",
      user_ethereum_balance:ethBal,
    })

})

provider.on('accountsChanged', (accounts) => {
  selectedAccount=accounts[0]
    console.log("selected account changed to  ",accounts[0]);
    dispatch({
      type:"set_current_user_address",
      current_user_address:selectedAccount
    })
    
});
web3 = new Web3(provider);

let netId =await web3.eth.net.getId();
console.log(netId);
address=ethSwap.networks[netId].address;
contract = await (new  web3.eth.Contract(ethSwap.abi, address) );

console.log("Contract is ",contract);
console.log("calling Fundme function ");

}
else{
  alert('Install Meta Mask First');

}

}

export async function balance(){
 console.log("\n\ncalling balance function ");
 let bal = await contract.methods.balance().call();
 console.log("Contract balance is ",bal);

 return bal;
}

export async function Userbalance(){
  
  console.log("\n\ncalling User balance function "); 
  let b;
     b= await  contract.methods.getBalanceOf(selectedAccount).call() ; 
  return b;
 }
 async function updateBalances(_dispatch=dispatch){
  console.log("\n\t\t\t-----Updaing Balances\n")
  let ubalance = await Userbalance();
  let ethBal=await web3.eth.getBalance(selectedAccount)  
  let pbalance = await balance();
  _dispatch({
    type:"set_user_token_balance",
    user_token_balance:ubalance,
  })
  _dispatch({
    type:"set_platform_balance",
    platform_balance:pbalance,
  })
    _dispatch({
      type:"set_user_ethereum_balance",
      user_ethereum_balance:ethBal,
    })

 
}


export async function refund(numTokens,selector){
  let userBal = await Userbalance();
 if(numTokens<=0){
   alert("Invalid Amount")
 }
  else if(userBal>=numTokens){
  let oneUToken=1000000000000000;//wei
  let totalAmount=oneUToken*numTokens;
  console.log("\nContract Balance := ",userBal/1000000000000000000," eth\n");
  console.log("\nTransaction for := ",totalAmount/1000000000000000000," eth");
  console.log("User balance is ",userBal);

  selector.loader_message("Refunding Initiated ");
  selector.loader_function(true);
  
  await contract.methods.refund(selectedAccount, numTokens).send({
    from:selectedAccount,
    to:address,
  
  })
  .on('transactionHash', function(hash){
    selector.loader_message("Tx Hash Obtained ");
    selector.loader_function(true);
    
})
.on('receipt', function(receipt){
  console.log("receipt of refund is ",receipt);
  updateBalances();
  selector.loader_message("success");
  selector.loader_function(true);
  
})
.on('confirmation', function(confirmationNumber, receipt){
    console.log("Transaction Confirmed");
    selector.loader_function(true);
    selector.loader_message("SuccessFully Refunded");
    setTimeout(() => {
      selector.loader_function(false);
      selector.loader_message("");
      
    }, 3000);
    


})
.on('error', function(error, receipt) {
    console.log("\nTransaction Reverted");
    selector.loader_function(true);
    selector.loader_message("Reverted");
    

})
  
  
  
 }
 else{
   alert("Not Enough Tokens to refund");   
 }



}
export async function purchaseTokens(amount,selector){ 
  let oneUToken=1000000000000000;//wei
  let totalAmount=oneUToken*amount;

console.log("selector in purchase token is ",selector)

selector.loader_message("Transferring Funds ");
selector.loader_function(true);


  console.log("calling Fundme function ");
  await contract.methods.fundMe().send({
    from:selectedAccount,
    to:address,
    value:totalAmount,
    gas:23000,
  
  })
  
  .on('transactionHash', function(hash){
    selector.loader_message("Funds Transfer Tx Hash Obtained ");
    selector.loader_function(true);
    
})
.on('receipt', function(receipt){
  console.log("receipt of refund is ",receipt);
  updateBalances();
  selector.loader_message("Success");
  selector.loader_function(true);
  
  
})
.on('confirmation', function(confirmationNumber, receipt){
    console.log("Transaction Confirmed");
    selector.loader_message("Funds Transferred");
    selector.loader_function(true);

    setTimeout(() => {
      selector.loader_message("");
      selector.loader_function(false);
      
    }, 2000);
    


})
.on('error', function(error, receipt) {
    console.log("\nTransaction Reverted");
    selector.loader_message("Reverted");
    selector.loader_function(true);
    setTimeout(() => {
      selector.loader_function(false);
      selector.loader_message("");
      
    }, 2000);
      

})

selector.loader_message("Purchase Transaction Initiated");
selector.loader_function(true);

  await contract.methods.purchase(selectedAccount,amount).send({
  from:selectedAccount,
})
.on('transactionHash', function(hash){
   selector.loader_message("Purchase Tx hash obtained : ");
  selector.loader_function(true);
  
})
.on('receipt', function(receipt){
console.log("receipt of purchase is ",receipt);
updateBalances();
selector.loader_message("Success");
selector.loader_function(true);


})
.on('confirmation', function(confirmationNumber, receipt){
  console.log("Transaction Confirmed");
  selector.loader_message("Purchase SuccessFul");
  selector.loader_function(true);
  setTimeout(() => {
    selector.loader_function(false);
    selector.loader_message("");
    
  }, 2000);
  

})
.on('error', function(error, receipt) {
  console.log("\nTransaction Reverted");
  selector.loader_message("Purchase Reverted");
  selector.loader_function(true);
  setTimeout(() => {
    selector.loader_function(false);
    selector.loader_message("");
    
  }, 2000);
  


})

}


export async function instantiateApp(dispatch){
await init(dispatch);
await updateBalances();
await updateBalances();



}
