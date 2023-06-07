  const firebaseConfig = {
        apiKey: "AIzaSyBOj0kF7m-JxxaDYhtlj-xDSu_pLlZOGtI",
        authDomain: "keys-3239e.firebaseapp.com",
        projectId: "keys-3239e",
        storageBucket: "keys-3239e.appspot.com",
        messagingSenderId: "878579812626",
        appId: "1:878579812626:web:d23ba8efa5073f09d70bcb"
    };


    // Initialize Firebase
    const app = firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    const keys$ = db.collection("keys");
    const history$ = db.collection("history");
    const images$ = db.collection("images");


    