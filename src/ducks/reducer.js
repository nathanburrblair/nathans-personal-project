const initialState = {
    user: {},
    coffeeDetails: [],
    products: [{test : 'data'}],
    cart: [{test: 'data'}]
    // latestCoffee: [{test: 'data'}]
}

// Action Types
const GET_USER_DATA = 'GET_USER_DATA';
const ADD_A_COFFEE = 'ADD_A_COFFEE';
const SHOW_ALL_PRODUCTS = 'SHOW_ALL_PRODUCTS';
const ADD_TO_CART = 'ADD_TO_CART';
const DISPLAY_CART = 'DISPLAY_CART';
// const SHOW_LAST_COFFEE = 'SHOW_LAST_COFFEE';

// Action Creators
export function getUserData(data){
    return { 
        type: GET_USER_DATA,
        payload: data
    }
}

export function addCoffee(coffee){
    return {
        type: ADD_A_COFFEE,
        payload: coffee
    }
}

export function getAllProducts(product){
    return {
        type: SHOW_ALL_PRODUCTS,
        payload: product
    }
}

export function addToCart(cartProduct){
    console.log(cartProduct)
    return {
        type: ADD_TO_CART, 
        payload: cartProduct
    }
}

export function displayCart(cartItem){
    return {
        type: DISPLAY_CART,
        payload: cartItem
    }
}

// export function showLastCoffee(lastcoffee){
//     return {
//         type: SHOW_LAST_COFFEE,
//         payload: lastcoffee
//     }
// }

// Reducer
export default function reducer (state = initialState, action) {
    switch (action.type) {
        case GET_USER_DATA:
            return Object.assign({}, state, {user: action.payload})

        case ADD_A_COFFEE:
            return Object.assign({}, state, {coffeeDetails: action.payload})

        case SHOW_ALL_PRODUCTS:
            return Object.assign({}, state, {products: action.payload})

        case ADD_TO_CART:
            return Object.assign({}, state, {cart: action.payload})

        case DISPLAY_CART:
            return Object.assign({}, state, {cart: action.payload})

        // case SHOW_LAST_COFFEE:
        //     return Object.assign({}, state, {latestCoffee: action.payload})

        default: 
            return state;
    }
}