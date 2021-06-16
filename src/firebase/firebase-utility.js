import firebase from './firebase-config';

// Authentication
export const auth = firebase.auth();

// Google Authentication
const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
provider.setCustomParameters({ prompt: 'select_account' });

// Facebook Authentication
const fbProvider = new firebase.auth.FacebookAuthProvider();
fbProvider.setCustomParameters({ 'display': 'popup' });
export const signInWithFacebook = () => auth.signInWithPopup(fbProvider)

// Firestore
export const firestore = firebase.firestore();

// Storing Auth Data
export const createUserProfileDocument = async userAuth => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if (!snapShot.exists) {
        const { displayName, email, phoneNumber } = userAuth;
        const createdAt = new Date();
        userRef.set({
            displayName,
            email,
            createdAt,
            phoneNumber
        }).catch(err => console.log(err));
    }
}

export const storeUserOrderHistory = (data, orders, cb) => {
    const date = new Date();
    fetch("https://us-central1-crwn-clth.cloudfunctions.net/widgets/payment", data)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            if (res.success) {
                cb();
                firestore.doc(`users/${auth.currentUser.uid}/pastorders/${date.getTime()}/`)
                    .set({ orders: orders, date })
                    .catch(err => console.log(err))
            }
        })
        .catch(err => console.log(err))
}

// export const addCollectionAndDocuments = (collectionKey, objectsToAdd) => {
//     const collectionRef = firestore.collection(collectionKey);
//     const batch = firestore.batch();
//     objectsToAdd.forEach(obj => {
//         const newDocRef = collectionRef.doc();
//         batch.set(newDocRef, obj);
//     })
//     return batch.commit()
// }