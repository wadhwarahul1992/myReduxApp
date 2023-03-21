import { connect } from "react-redux";
import { addToCart, removeToCart, fetchCartData, updateCartData } from '../services/Actions/action'
import Home from "../components/home";

const mapStateToProps=state => ({
    data: state.cartItems
})

const mapDispatchToProps=dispatch=>({
    addToCartHandler:data=>dispatch(addToCart(data)),
    fetchCartHandler:data=>dispatch(fetchCartData(data)),
    removeToCartHandler:data=>dispatch(removeToCart(data)),
    updateCartDataHandler:data=>dispatch(updateCartData(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)

// export default Home;