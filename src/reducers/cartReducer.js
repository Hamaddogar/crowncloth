var initialState = JSON.parse(localStorage.getItem('cart'));
initialState == null && (initialState = []);

const cartReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case 'add_to_cart':
            const oldItem = state.find(item => item.id === payload.id);
            if (oldItem) {
                oldItem.qty++;
                var newState = state.slice();
                state = newState;
            } else {
                payload.qty = 1;
                state = [...state, payload];
            }
            break;
        case "increase_cart_qty":
            state[payload].qty++;
            newState = state.slice()
            state = newState;
            break;
        case "decrease_cart_qty":
            if (state[payload].qty > 1) {
                state[payload].qty--;
                newState = state.slice();
                state = newState;
            }
            break;
        case "remove_cart_item":
            state.splice(payload, 1);
            newState = state.slice();
            state = newState;
            break;
        case "remove_all_cart_items":
            state = [];
            break;
        default:
            return state;
    }
    localStorage.setItem('cart', JSON.stringify(state));
    return state;
}

export default cartReducer;