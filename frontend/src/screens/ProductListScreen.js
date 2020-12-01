import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ListProducts } from '../actions/productActions';

export default function ProductListScreen(props) {
    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(ListProducts());
    },[dispatch]);
    const deleteHandler = () => {

    }
    return (
        <div className="product_list">
            <h1>Products List</h1>
            {loading? <p>Loading</p>
            :
            error? <p>{error}</p>
            :
            <table className="table product_list_table">
                <thead className="product_list_head">
                    <tr className="product_list_row">
                        <th>ID</th>
                        <th>NAME</th>
                        <th>BRAND</th>
                        <th>CATEGORY</th>
                        <th>PRICE</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody className="product_list_body">
                    {products.map((product) => (
                        <tr key={product._id} className="product_list_row">
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.brand}</td>
                            <td>{product.category}</td>
                            <td>{product.price}</td>
                            <td>
                                <button type="button" className="small" onClick={() => props.history.push(`/product/${product._id}/edit`)}>
                                    Edit
                                </button>
                                <button 
                                    type="button" 
                                    className="small" 
                                    onClick={() => deleteHandler(product)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            }
        </div>
    )
}