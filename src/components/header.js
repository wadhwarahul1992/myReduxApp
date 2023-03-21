import React, { useEffect, useState } from "react";
import axios from "axios";

const Header = (props) =>{
    const [data, setData] = useState([]);
    const {
        fetchCartData
    } = props;
    // debugger

    
    return(
        <React.Fragment>
            <h1>Header</h1>
            <table border="1" align="center">
                <thead>
                    <tr>
                        <th style={{padding: '5px'}}>Model</th>
                        <th style={{padding: '5px'}}>Price</th>
                        <th style={{padding: '5px'}}>Action</th>
                    </tr>
                </thead>
                
                <tbody>
                    {props.data && props.data.cartData && props.data.cartData.map((val, key) => {
                        return(
                        <tr key={key}>
                            <td style={{padding: '5px'}}>{val && val.name}</td>
                            <td style={{padding: '5px'}}>{val && val.price}</td>
                            <td style={{padding: '5px'}}>
                                <button onClick={()=> props.removeToCartHandler({
                                    id: val && val._id
                                })}>Delete</button>
                                <button onClick={()=> props.editToCartHandler({
                                    id: val && val._id,
                                    name: val && val.name,
                                    price: val && val.price
                                })}>Edit</button>
                            </td>
                        </tr>
                        )
                    })}
                </tbody>
                            
            </table>
        </React.Fragment>
    )
}

export default Header;
