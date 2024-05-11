(function () {

if (localStorage.getItem("userLogged")){
    document.querySelector("nav").classList.remove("d-none");
    document.querySelector("section").classList.remove("d-none");
    document.querySelector("section h3").innerHTML = `Welcome, ${localStorage.getItem("userLogged")}`

    document.getElementById("signoutBtn").addEventListener("click", function(){
        localStorage.removeItem("userLogged");
        localStorage.removeItem("userToken");
        window.location.replace("http://127.0.0.1:5500/index.html");
    })
}
// Protected Page
else{
    document.querySelector("nav").classList.add("d-none");
    document.querySelector("section").classList.add("d-none");

    Swal.fire({
        title: "You must Sign in!",
        icon: "error",
        confirmButtonText: "Sign in",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.replace("http://127.0.0.1:5500/index.html");
        }
      });
    
      setTimeout(() => {
        window.location.replace("http://127.0.0.1:5500/index.html");
      }, 2000);
}

})();