"use strict";

(function () {
  localStorage.removeItem("userLogged");
  localStorage.removeItem("userToken");
})();

// Select Elements
const userEmailInput = document.getElementById("userEmail");
const userPasswordInput = document.getElementById("userPassword");
const loader = document.getElementById("loader");

const signinBtn = document.getElementById("signinBtn");
signinBtn.addEventListener("click", userSignin);

// Handle Clear Inputs
function clearInputs() {
  userEmailInput.value = "";
  userPasswordInput.value = "";
}

// Handle user Sign in
async function userSignin() {
  try {
    loader.classList.remove("hidden");
    let user = {
      email: userEmailInput.value,
      password: userPasswordInput.value,
    };
    let option = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(user),
    };
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/signin`,
      option
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    localStorage.setItem("userLogged", data.user.name);
    localStorage.setItem("userToken", data.token);
    clearInputs();
    setTimeout(() => {
      window.location.replace(
        "http://127.0.0.1:5500/home.html"
      );
    }, 1000);
  } catch (error) {
    throw error;
  } finally {
    loader.classList.add("hidden");
  }
}
