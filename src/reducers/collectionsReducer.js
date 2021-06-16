const collectionsReducer = (state = [], { type, payload }) => {
    switch (type) {
        case "fetch_collections_successfullty":
            return payload;
        default:
            return state;
    }
}

export default collectionsReducer;