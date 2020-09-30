import axios from "axios";
import {
MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, MY_ORDER_LIST_FAIL, 
} from "../constants/orderConstants";

const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: MY_ORDER_LIST_REQUEST });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.get("/api/orders/mine", {
        headers:
            { Authorization: 'Bearer ' + userInfo.token }
        });
        dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: MY_ORDER_LIST_FAIL, payload: error.message });
    }
}



export { listMyOrders };