import { type } from '@testing-library/user-event/dist/type';
import axios from 'axios';
import {ADD_TO_CART, EDIT_TO_CART, FETCH_DATA, REMOVE_TO_CART, UPDATE_DATA} from '../constant'
import { BuildSchemaOptions, graphql } from 'graphql';

// export const addToCart = (data) => {
//     console.log('action', data);
//     return {
//         type: ADD_TO_CART,
//         data: data
//     }
// }

export const fetchCartData = (data) => {
    return async (dispatch)=>{
        axios.get('http://localhost:8080/test').then(res => 
        {
            return (
                dispatch({
                    type: FETCH_DATA,
                    data: res.data
                })
            )
        });
    }
}

export const addToCart = (data) => {
    return(dispatch)=> {
        let url = 'http://localhost:8080/loadTest'
        axios.post(url, data).then(res => {
            dispatch(
                fetchCartData()
            )
            return (
                dispatch({
                    type: ADD_TO_CART,
                    data: res.data,
                })
            )
        });
    }
}

export const removeToCart = (data) => {
    return(dispatch)=> {
        let url = 'http://localhost:8080/deleteTest'
        axios.post(url, data).then(res => {
            dispatch(
                fetchCartData()
            )
            return (
                dispatch({
                    type: REMOVE_TO_CART,
                    data: data,
                })
            )
        }).catch(e => console.log(e));
    }
}

export const editToCart = (data) => {
    return(dispatch)=> {
        return (
            dispatch({
                type: EDIT_TO_CART,
                data: {id: data.id, name: data.name, price: data.price},
            })
        )
    }
}

export const updateCartData = (data) => {
    return(dispatch)=> {
        let url = 'http://localhost:8080/updateOne'
        axios.post(url, data).then(res => {
            dispatch(
                fetchCartData()
            )
            return (
                dispatch({
                    type: UPDATE_DATA,
                    data: data,
                })
            )
        }).catch(e => console.log(e));
    }
}


// export const removeToCart = (data) => {
//     console.log('action', data);
//     return {
//         type: REMOVE_TO_CART
//     }
// }
