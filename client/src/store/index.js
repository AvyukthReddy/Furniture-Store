import { createSlice, configureStore } from '@reduxjs/toolkit';

//const expiresAt =  new Date().setHours(new Date().getHours() + 4);
const expiresAt =  new Date().setMinutes(new Date().getMinutes() + 1);

const getUserData = () => {
    const userDetails = sessionStorage.getItem("userDetails");
    if(userDetails) return JSON.parse(userDetails)?.data;
    
    const intialUserData = {
        customer_id: null, 
        first_name: null, 
        last_name: null, 
        email: null, 
        address: null, 
        phone: null, 
        status: null, 
        creditLine: null,
        isAdmin: false
    };

    return intialUserData;
}

const customerSlice = createSlice({
    name: 'products',
    initialState: getUserData(),
    reducers: {
        updateCustomerDetails(state, action) {
            const userDetails = {
                customer_id: action?.payload?.customer_id,
                first_name: action?.payload?.first_name,
                last_name: action?.payload?.last_name,
                email: action?.payload?.email,
                address: action?.payload?.address,
                phone: action?.payload?.phone,
                status: action?.payload?.status,
                creditLine: action?.payload?.creditLine,
                isAdmin: action?.payload?.isAdmin === 1
            };

            const userSession = {
                expiresAt: expiresAt,
                data: userDetails
            }
            sessionStorage.setItem("userDetails", JSON.stringify(userSession));
            return {
                ...state,
                ...userDetails
            };
        },
        updateProfileDetails(state, action) {
            const userDetails = {
                ...state,
                first_name: action?.payload?.first_name,
                last_name: action?.payload?.last_name,
                address: action?.payload?.address,
                phone: action?.payload?.phone,
            }

            const userSession = {
                expiresAt: expiresAt,
                data: userDetails
            }
            sessionStorage.setItem("userDetails", JSON.stringify(userSession));
            return userDetails;
        },
        clearUserDetails(state, action) {
            sessionStorage.removeItem("userDetails");
            //sessionStorage.clear();
            return getUserData();
        }
    }
});

const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        updateProducts(state, action) {
            const products = [];
            action?.payload?.products.forEach(product => {
                products.push(...product.categories);
            });
            return products;
        }
    }
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart(state, action) {
            const prodIdx = state.findIndex(s => s.product_id === action?.payload.product.product_id);
            if(prodIdx >= 0) {
                const updatedState = [...state];
                updatedState[prodIdx].selectedQty += action?.payload.product.selectedQty;
                state = [...updatedState];
            } else {
                state.push(action.payload.product);
            }
        },
        clearCart(state, action) {
            state = [];
            return state;
        }
    }
});



const store = configureStore({
    reducer: {
        customerDetails: customerSlice.reducer,
        products: productsSlice.reducer,
        cart: cartSlice.reducer
    }
});

export const customerDetails = customerSlice.actions;
export const productsActions = productsSlice.actions;
export const cartActions = cartSlice.actions;

export default store;