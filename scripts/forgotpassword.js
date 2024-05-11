"use strict";
// Select Elements
const mainSection = document.getElementById("mainSection");
const loader = document.getElementById("loader");

// Step(1): Handle Find User Account - Get Verify Code on Email
async function findUser() {
const findUserEmailInput = document.getElementById("findUserEmail");
  try {
    loader.classList.remove("hidden");
    let user = {
      email: findUserEmailInput.value,
    };
    let option = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(user),
    };
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
      option
    );
    // const data = await response.json();
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    // Note: nav to step (2) is depends on res msg - ToDo later
    displayVerifyCode();
  } catch (error) {
    throw error;
  } finally {
    loader.classList.add("hidden");
  }
}

// Step(2): Handle Display Verify Code Form
function displayVerifyCode(){
    mainSection.innerHTML = `
    <div class="inputs-box bg-body-tertiary p-3 rounded-4 shadow-sm">
    <h5 class="text-center mb-4 fs-2">Enter Verify Code</h5>

    <div class="col-sm-12 form-floating mb-3">
      <input
        type="number"
        id="verifyCode"
        class="form-control"
        placeholder="Enter Your Email"
      />
      <label for="verifyCode" class="form-label">Verify Code</label>
      <div class="invalid-feedback">Email doesn't exist</div>
    </div>

    <button
      id="findAccountBtn"
      type="submit"
      class="btn btn-success w-100 mb-4"
      onclick="sendVerifyCode()"
    >
      Send
    </button>
  </div>
    `;
}

// Handle Verify Code - Send Verify Code
async function sendVerifyCode() {
    const verifyCodeInput = document.getElementById("verifyCode");
      try {
        loader.classList.remove("hidden");
        let user = {
            resetCode: verifyCodeInput.value,
        };
        let option = {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify(user),
        };
        const response = await fetch(
          `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
          option
        );
        // const data = await response.json();
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        // Note: nav to step (3) is depends on res msg - ToDo later
        displayResetPassword();
      } catch (error) {
        throw error;
      } finally {
        loader.classList.add("hidden");
      }
}

// Step(3): Handle Display Reset Password Form
function displayResetPassword(){
    mainSection.innerHTML = `
    <div class="inputs-box bg-body-tertiary p-3 rounded-4 shadow-sm">
    <h5 class="text-center mb-4 fs-2">Reset Password</h5>

    <div class="col-sm-12 form-floating mb-3">
      <input type="email" id="userEmail" class="form-control" placeholder="Enter Your Email">
      <label for="userEmail" class="form-label">Email</label>                  
      <div class="invalid-feedback">Email doesn't exist</div> 
    </div>

    <div class="col-sm-12 form-floating mb-3">
      <input type="password" id="userPassword" class="form-control" placeholder="Enter Your Password">
      <label for="userPassword" class="form-label">Password</label>                  
      <div class="invalid-feedback" id="invalidPasswordFeedback">Incorrect password</div> 
    </div>

    <button
      id="findAccountBtn"
      type="submit"
      class="btn btn-success w-100 mb-4"
      onclick="sendResetPassword()"
    >
    Reset Password
    </button>
  </div>
    `;
}

// Handle Reset Password - Send Reset Password
async function sendResetPassword() {
    const userEmailInput = document.getElementById("userEmail");
    const userPasswordInput = document.getElementById("userPassword");
      try {
        loader.classList.remove("hidden");
        let user = {
            email: userEmailInput.value,
            newPassword: userPasswordInput.value,
        };
        let option = {
          method: "PUT",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify(user),
        };
        const response = await fetch(
          `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
          option
        );
        // const data = await response.json();
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        // Note: nav to signIn is depends on res msg - ToDo later      
        setTimeout(() => {
          window.location.replace("http://127.0.0.1:5500/home.html");
        }, 1000);
      } catch (error) {
        throw error;
      } finally {
        loader.classList.add("hidden");
      }
}