import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ListProducts } from '../actions/productActions';

function HomeScreen (props) {

    // const [products, setProduct] = useState([]);
    const productList = useSelector((state) => state.productList);
    const { products, loading, error } = productList; 
    const dispatch = useDispatch();
    

    useEffect(() => {
        dispatch(ListProducts());

        return () => {

        };
    }, [])

    return(
        loading? <div>Loading...</div> :
        error? <div>{error}</div> :
        <div>
            <div className="home_page_image">
                <h1>WELCOME</h1>
            </div>
                <ul className="products">
                    {
                        products.map(product => 
                    <li key={product._id}>
                        <div className="product">
                            
                        <Link to={'/product/' + product._id}><img src={product.image} alt="product" className="product-image"></img></Link>
                            <div className="product-name">
                                <Link to={'/product/' + product._id}>{product.name}</Link>
                            </div>
                            <div className="product-brand">{product.brand}</div>
                            <div className="product-price">$ {product.price}</div>
                            <div className="product-rating">{product.rating} Stars ({product.numReviews} Reviews)</div>
                        </div>
                    </li>)
                    }
                </ul>
        </div>
    )
}

export default HomeScreen;