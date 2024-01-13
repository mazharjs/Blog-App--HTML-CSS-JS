
  // Import the functions you need from the SDKs you need
//   import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
//   import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyChAt4mGzv2sNPEuJrYiG5Gh8uSvSH2dyQ",
    authDomain: "blogging-app-a72f0.firebaseapp.com",
    projectId: "blogging-app-a72f0",
    storageBucket: "blogging-app-a72f0.appspot.com",
    messagingSenderId: "748586268611",
    appId: "1:748586268611:web:d8d99ccd7e7522363eaf76",
    measurementId: "G-X3QBHCFJY8"
  });

  // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);

  const auth = firebaseApp.auth();
  const db = firebaseApp.firestore();



function signupCall(){
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    console.log('email' , email)
    console.log('password' , password)

    auth.createUserWithEmailAndPassword(email , password)
    .then((res) => {
        alert("singup succes")
       console.log(res)
       location.reload()
       createData()
       if(res){
         setTimeout(() => {
            location.href = "./dashboard.html"
        },2000)
       }
    
    })
    .catch((error) => {
        alert(error)
        console.log(error)
    })

  }



  function signInCall(){
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    console.log('email' , email)
    console.log('password' , password)

    auth.signInWithEmailAndPassword(email , password)
    .then((res) => {
        alert('sigin success')
        location.reload()

        let token = res.user.multiFactor.user.accessToken;
        if(token){
         localStorage.setItem("token" , token)

        }
       console.log(localStorage.getItem("token"))
    })
    .catch((error) => {
        alert(error)
        console.log(error)
    })

  }



  function createData(){
    let email = document.getElementById('email').value
    let name = document.getElementById('name').value
    let password = document.getElementById('password').value
    console.log('email' , email)
    console.log('password' , password)

     db.collection('users')
     .add({
        name:name,
        email:email,
        password:password
     })
     .then((res) => {
        console.log(res.id)
     })
     .catch((error) => {
        console.log(error)
     })

  }
  
  function readData(){
     db.collection('users')
     .get()
     .then((res) => {
        console.log(res.docs)
      //   console.log(res.docs.map((item) => {
      //       return { ...item.data() , id: item.id}
      //   }))
        let data = res.docs.map((item) => {
         return { ...item.data() , id: item.id}
     })
     console.log(data)

     let list = document.getElementById('list');

     data.forEach((item) => {
         let listItem = document.createElement('li')
         listItem.innerHTML = `${item.name} <button class='delete' data-index="${item.id}" onClick="deleteData(this)">delete</button>`
         list.appendChild(listItem)
     })
 
     })
     .catch((error) => {
        console.log(error)
     })

  }

  function deleteData(event){
     console.log("event" , event)
   let id = event.getAttribute("data-index")
   console.log('id' , id)
    db.collection('users')
    .doc(id)
    .delete()
    .then((res) => {
        alert("Data Deleted")
       console.log(res)
       
    })
    .catch((error) => {
       console.log(error)
    })

 }

 function updateData(){

    let email = document.getElementById('email').value
    let name = document.getElementById('name').value
    let password = document.getElementById('password').value
    db.collection('users')
    .doc('zTxZQhaujzBdJOtdmh4i')
    .update({
        name:name,
        email:email,
        password:password
    })
    .then((res) => {
        alert("Data Updated")
       console.log(res)
       
    })
    .catch((error) => {
       console.log(error)
    })

 }