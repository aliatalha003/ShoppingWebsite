let firstName=document.getElementById("firstName")
let lastName=document.getElementById("lastName")
let email=document.getElementById("email")
let password=document.getElementById("password")

let registerBtn=document.querySelector("#SubmitBtn")

registerBtn.addEventListener("click" , function(e){
    e.preventDefault()
    if(firstName.value==="" || password.value==="" || email.value==="" || password.value===""){
        alert("Please fill the missing values")
    }

    else{
        localStorage.setItem("firstName",firstName.value)
        localStorage.setItem("lastName",lastName.value)
        localStorage.setItem("email",email.value)
        localStorage.setItem("password",password.value)
        setTimeout(()=>{
            window.location="login.html"

        },1000)

    }
})

