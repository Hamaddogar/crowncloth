import { firestore } from '../firebase/firebase-utility';

export const fetchCollectionsSuccess = collections => ({
    type: "fetch_collections_successfullty",
    payload: collections
});

export const fetchCollectionsAsync = () => {
    return dispatch => {
        var collections = JSON.parse(localStorage.getItem("collections"));
        if (collections != null) {
            return dispatch(fetchCollectionsSuccess(collections));
        }
        firestore.collection('collections').get()
            .then(({ docs }) => {
                collections = docs.map(doc => {
                    const { title, items } = doc.data();
                    return {
                        id: doc.id,
                        routeName: encodeURI(title.toLowerCase()),
                        title,
                        items
                    }
                })
                localStorage.setItem('collections', JSON.stringify(collections))
                dispatch(fetchCollectionsSuccess(collections));
            });
    }
}