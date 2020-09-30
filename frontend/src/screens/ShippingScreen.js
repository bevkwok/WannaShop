import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';


function ShippingScreen (props) {

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShipping(address, city, state, zipCode));
        props.history.push('payment');
    }


    return(
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li>
                            <h2 className="form-title">
                                Shipping
                            </h2>
                        </li>
                        <li>
                            <label htmlFor="address">
                                Address
                            </label>
                            <input type="text" name="address" id="address" onChange={(e) => setAddress(e.target.value)}></input>
                        </li>
                        <li>
                            <label htmlFor="city">
                                City
                            </label>
                            <input type="text" name="city" id="city" onChange={(e) => setCity(e.target.value)}></input>
                        </li>
                        <li>
                            <label htmlFor="state">
                                State / Province / Region
                            </label>
                            <input type="text" name="state" id="state" onChange={(e) => setState(e.target.value)}></input>
                        </li>
                        <li>
                            <label htmlFor="zipCode">
                                Zip Code
                            </label>
                            <input type="text" name="zipCode" id="zipCode" onChange={(e) => setZipCode(e.target.value)}></input>
                        </li>
                        <li>
                            <button type="submit" className="button primary">Continue to Payment</button>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    )
}

export default ShippingScreen;