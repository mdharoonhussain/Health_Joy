function check(form) {
    const data = JSON.parse(localStorage.getItem('signIn'))
    const userData = JSON.parse(localStorage.getItem('user')) || []
    // console.log(data)
        if (form.userid.value == "" || form.pswrd.value == "") {
            alert("Please Enter all the Details")
        }else {
            if (form.pswrd.value.length > 6) {
                for(i in data) {
                    if(form.userid.value == data[i].userid && form.pswrd.value == data[i].pswrd){
                        window.location.href = "after_login_landing.html";
                        userData.push({uName: form.userid.value})
                        localStorage.setItem('user', JSON.stringify(userData))
                    }
                    else{
                        alert("Error Password or Username")
                    }
                }
            }else{
                alert('Password should be more than 6 letters')
            }
        }   
}   
function myFunction() {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }


 