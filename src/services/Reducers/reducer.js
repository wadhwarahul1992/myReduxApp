import { ADD_TO_CART, FETCH_DATA, EDIT_TO_CART, REMOVE_TO_CART, UPDATE_DATA } from '../constant'
const initialState = {
    cartData: [],
    selectData: {
        id: '',
        name: '',
        price: ''
    }
}
export default function cartItems(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART:
            console.warn("addtocart",action)
            return {
                ...state,
                // cartData: action.data
            }

        case REMOVE_TO_CART:
            console.log(action)
            return {
                ...state
            }

        case FETCH_DATA: 
            // console.warn("fetch data reducer",action)
            return {
                cartData: [...action.data]
            }
        
        case EDIT_TO_CART: 
            console.warn("edit data reducer",action);            
            return {
                ...state,
                selectData: action.data
            }
        
        case UPDATE_DATA:
            console.warn("update data reducer",action);
            return{
                ...state,
            }

        default:
            return state
    }
}