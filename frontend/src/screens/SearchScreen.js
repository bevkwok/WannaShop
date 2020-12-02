import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { ListProducts } from '../actions/productActions';

export default function SearchScreen(props) {
    const {name = 'all', category = 'all'} = useParams();
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    const productCategoryList = useSelector((state) => state.productCategoryList);
    const { loading: loadingCategories, error: errorCategories, categories } = productCategoryList;
    useEffect(() => {
        dispatch(ListProducts({ name: name !== 'all' ? name: '',
        category: category !== 'all' ? category : '' }));
    }, [category, dispatch, name]);

    const getFilterUrl = (filter) => {
        const filterCateogry = filter.category || category;
        return `/search/category/${filterCateogry}`;
    }
    return (
        <div>
            <div className="row">
                {loading? (<p>Loading...</p>)
                :
                error? (<p>{error}</p>)
                :
                (<div>
                    {products.length} Results
                </div>)
                }
            </div>
            <div className="row top">
                <div className="col-1">
                    <h3>Category</h3>
            {loadingCategories? (<p>Loading...</p>)
                    :
                    errorCategories? (<p>{error}</p>)
                    :
                    (
                        <ul>
                            {categories.map((c) => (
                                <li key={c}>
                                    <Link
                                    className={c === category ? 'active' : ''}
                                    to={getFilterUrl({ category: c })}
                                    >
                                    {c}
                                    </Link>
                                </li>
                                ))}
                        </ul>
                    )
                    }
                    
                </div>
                <div className="col-3">
                    {loading? (<p>Loading...</p>)
                    :
                    error? (<p>{error}</p>)
                    :
                    (
                        <>
                            {products.length === 0 && (
                                <p>No Product Found</p>
                            )}
                            <div className="row center">
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
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}