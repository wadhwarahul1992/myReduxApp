import React, { useEffect, useState } from "react";

const Home = (props) =>{
    const [mobileid, setMobileId] = useState('')
    const [mobileModel, setMobileModel] = useState('')
    const [mobilePrice, setMobilePrice] = useState('')

    useEffect(()=>{
        setMobileId(props.data && props.data.selectData && props.data.selectData.id);
        setMobileModel(props.data && props.data.selectData && props.data.selectData.name);
        setMobilePrice(props.data && props.data.selectData && props.data.selectData.price);
    },[props.data.selectData])
    
    
    return(
        <React.Fragment>
            <div style={{border: '1px solid #ccc', width: '300px', margin: '0 auto'}}>
                <h1>Mobile Data</h1>
                <input type="hidden" value={mobileid} onChange={(e) => setMobileModel(e.target.value)} placeholder="Enter MObile Id" />
                <input type="text" value={mobileModel} onChange={(e) => setMobileModel(e.target.value)} placeholder="Enter MObile MOdel" />
                <br />
                <input type="text" value={mobilePrice} onChange={(e) => setMobilePrice(e.target.value)} placeholder="Enter MObile Price" />
                <br />
                <br />
                <button 
                    onClick={()=> 
                    {
                        props.updateCartDataHandler({
                        id: mobileid,
                        name: mobileModel,
                        price: mobilePrice    
                    })}}>
                    Update
                </button>
                <button 
                    onClick={()=> 
                    {
                        props.addToCartHandler({
                        name: mobileModel,
                        price: mobilePrice    
                    })}}>
                    Add to Cart
                </button>
                
                <button onClick={()=> {props.removeToCartHandler()}}>Remove to Cart</button>
                <br />
                <br />
            </div>
        </React.Fragment>
    )
}
export default Home;