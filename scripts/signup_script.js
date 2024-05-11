"use strict";

(function () {
  localStorage.removeItem("userLogged");
  localStorage.removeItem("userToken");
})();

// Select Elements
const userNameInput = document.getElementById("userName");
const userEmailInput = document.getElementById("userEmail");
const userPasswordInput = document.getElementById("userPassword");
const userRePasswordInput = document.getElementById("userRePassword");
const userPhoneInput = document.getElementById("userPhone");
const loader = document.getElementById("loader");

const signupBtn = document.getElementById("signupBtn");
signupBtn.addEventListener("click", addUser);

// Handle Clear Inputs
function clearInputs() {
  userNameInput.value = "";
  userEmailInput.value = "";
  userPasswordInput.value = "";
  userRePasswordInput.value = "";
  userPhoneInput.value = "";
}

// Handle Add user
async function addUser() {
  try {
    loader.classList.remove("hidden");
    let user = {
      name: userNameInput.value,
      email: userEmailInput.value,
      password: userPasswordInput.value,
      rePassword: userRePasswordInput.value,
      phone: userPhoneInput.value,
    };
    let option = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(user),
    };
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/signup`,
      option
    );
    // const data = await response.json();
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    clearInputs();
    setTimeout(() => {
      window.location.replace(
        "http://127.0.0.1:5500/index.html"
      );
    }, 1000);
  } catch (error) {
    throw error;
  } finally {
    loader.classList.add("hidden");
  }
}