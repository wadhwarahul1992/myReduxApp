import { connect } from "react-redux";
import { addToCart, fetchCartData } from '../services/Actions/action'
import Header from "../components/header";
import { removeToCart, editToCart, updateCartData } from "../services/Actions/action";
// import { fetchCartData } from "../services/Actions/action";
import axios from "axios";

const mapStateToProps=state => ({
    data: state.cartItems,
})

const mapDispatchToProps=dispatch=>({
    // fetchCartHandler:data=>dispatch(fetchCartData(data)),
    removeToCartHandler:data=>dispatch(removeToCart(data)),
    editToCartHandler:data=>dispatch(editToCart(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header)

// export default Home;