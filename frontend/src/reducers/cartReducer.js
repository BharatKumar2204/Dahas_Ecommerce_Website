import { CART_ADD_ITEM,CART_REMOVE_ITEM,CART_SAVE_SHIPPING_ADDRESS,CART_SAVE_PAYMENT_METHOD,CART_CLEAR_ITEMS} from "../constants/cartConstants";

export const cartReducer=(state={cartItems:[],shippingAddress:{}},action)=>{
    switch(action.type){
        case CART_ADD_ITEM:
            const item=action.payload
            const existItem=state.cartItems.find(x=>x.product===item.product&&x.size===item.size)

            if(existItem){
                return {
                    ...state,
                    cartItems:state.cartItems.map(x =>
                        x.product===existItem.product&&x.size===existItem.size?item:x
                        )
                }

            }else{
                return {
                    ...state,
                    cartItems:[...state.cartItems,item]
                }
            }
        case CART_REMOVE_ITEM:
            const items=action.payload
            return{
                ...state,
                cartItems:state.cartItems.filter(x=>!(x.product==items.product && x.size==items.size))
            }

        case CART_SAVE_SHIPPING_ADDRESS:
            return{
                ...state,
                shippingAddress:action.payload
            }

        case CART_SAVE_PAYMENT_METHOD:
            return{
                ...state,
                paymentMethod:action.payload
            } 
            
        case CART_CLEAR_ITEMS:
            return{
                ...state,
                cartItems:[]
            }    
            
        default:
            return state
    }
}