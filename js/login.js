let email=document.querySelector("#email")
let password=document.querySelector("#password")
let loginBtn=document.querySelector("#loginBtn")
let getemail=localStorage.getItem("email")
let getpassword=localStorage.getItem("password")

loginBtn.addEventListener("click",function(e){
    e.preventDefault()
    if(email.value===""||password.value===""){
        alert("please fill the missing value")
    }
    else if(getemail && getemail.trim()===email.value.trim() && getpassword  === password.value){
        setTimeout(()=>{
            window.location="index.html"

        },1000)
    }
    else{
        alert("Wrong username or password")
    }

})
