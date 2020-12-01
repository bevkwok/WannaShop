import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET} from "../constants/productConstants";

export default function ProductEditScreen(props) {
    const productId = props.match.params.id;

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product} = productDetails;

    const productUpdate =  useSelector(state =>  state.productUpdate);
    const { 
        loading: loadingUpdate, 
        error: errorUpdate, 
        success: successUpdate
    } = productUpdate;


    const dispatch = useDispatch();

    useEffect(() => {
        if(successUpdate){
            dispatch({ type: PRODUCT_UPDATE_RESET });
            props.history.push("/productlist");
        }
        if(!product || product._id !== productId) {
            dispatch(detailsProduct(productId));
        } else {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
    }, [product, dispatch, productId]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(
            updateProduct({_id: productId, name, price, image, category, brand, countInStock, description}))
    }

    return (
        <div className="form">
            
            {loading? <p>Loading</p>
                :
                error? <p>{error}</p>
                :
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h2 className="form-title">
                            EDIT PRODUCT
                        </h2>
                    </li>
                    <li>
                    {loadingUpdate && <p>Loading</p>}
                    {errorUpdate && <p>{errorUpdate}</p>}
                    </li>
                    <li>
                        <label htmlFor="name">
                            Name
                        </label>
                        <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}></input>
                    </li>
                    <li>
                        <label htmlFor="price">
                            Price
                        </label>
                        <input type="text" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)}></input>
                    </li>
                    <li>
                        <label htmlFor="image">
                            Image
                        </label>
                        <input type="text" name="image" id="image" value={image} onChange={(e) => setImage(e.target.value)}></input>
                    </li>
                    <li>
                        <label htmlFor="brand">
                            Brand
                        </label>
                        <input type="text" name="brand" id="brand" value={brand} onChange={(e) => setBrand(e.target.value)}></input>
                    </li>
                    <li>
                        <label htmlFor="countInStock">
                            Count In Stock
                        </label>
                        <input type="text" name="countInStock" id="countInStock" value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></input>
                    </li>
                    <li>
                        <label htmlFor="category">
                            Category
                        </label>
                        <input type="text" name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)}></input>
                    </li>
                    <li>
                        <label htmlFor="description">
                            Description
                        </label>
                        <textarea name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </li>
                    <li>
                        <button type="submit" className="button primary">Update</button>
                    </li>
                </ul>
            </form>
            }
        </div>
    )
}