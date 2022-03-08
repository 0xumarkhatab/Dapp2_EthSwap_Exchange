import { createStore } from "redux";

export let initialState={ };


 const reducer= (state={},action)=>{
    console.log("action taken on redux store",action);
    let key = action.type.toLowerCase();

    switch (key) {
        case "set_user_token_balance":
            return {
                ...state,
                user_token_balance:action.user_token_balance,
            }
            break;
            
        case "set_user_ethereum_balance":
            return {
                ...state,
                user_ethereum_balance:action.user_ethereum_balance,
            }
            break;

        case "set_current_user_address":
            return {
                ...state,
                current_user_address:action.current_user_address,
            }
            break;
        
             
        case "set_platform_balance":
            return {
                ...state,
                platform_balance:action.platform_balance,
            }            
            break;
             
        case "set_purchase_transaction_history":
            return {
                ...state,
                purchase_transaction_history:action.purchase_transaction_history,
            }            
            break;
             
        case "set_refund_transaction_history":
            return {
                ...state,
                refund_transaction_history:action.refund_transaction_history,
            }            
            break;            
        case "set_loader_function":
            return {
                ...state,
                loader_function:action.loader_function
            }

            break;
        case "set_loader_message":
            return {
                ...state,
                loader_message:action.loader_message
            }

            break;
    
            
        default:
            console.log("Invalid Action Type ",key);
            return state;
            break;
             
    }
}


const store =createStore(reducer);
export default store;
