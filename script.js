// ==========================================================================================
// DO NOT DELETE - pdpa.html
function toggleButtonVisibility() {
  var checkBox = document.getElementById("myCheckbox");
  var continueButton = document.getElementById("continueButton");

  if (checkBox.checked) {
    continueButton.style.display = "inline-block"; // Show the button
  } else {
    continueButton.style.display = "none"; // Hide the button
  }
}

function continueAction() {
  // Perform the action for continuing, such as navigating to another page
  window.location.href = "parents.html";
}

// ==========================================================================================
// parents.html
document.addEventListener("DOMContentLoaded", function () {
  console.log("Document fully loaded.");

  // Transition from .transition to .exp after 5 seconds
  setTimeout(function () {
    console.log("Starting transition from .transition to .exp.");
    const transitionSection = document.querySelector(".transition");
    const expSection = document.querySelector(".exp");

    transitionSection.classList.add("hidden");
    setTimeout(function () {
      transitionSection.style.display = "none";
      expSection.classList.add("show");
      console.log(".exp section is now visible.");
    }, 1000); // Wait for the transition to complete before hiding
  }, 5000); // 5000 milliseconds = 5 seconds

  // Add event listeners to radio buttons in .exp section
  var expOptions = document.querySelectorAll('.exp input[type="radio"]');
  expOptions.forEach(function (option) {
    option.addEventListener("change", function () {
      console.log("Selected exp option:", option.value);
      const expSection = document.querySelector(".exp");
      const employmentSection = document.querySelector(".employment");

      expSection.classList.remove("show");
      setTimeout(function () {
        expSection.style.display = "none";
        employmentSection.classList.add("show");
        console.log(".employment section is now visible.");
      }, 1000);
    });
  });

  // Add event listeners to radio buttons in .employment section
  var employmentOptions = document.querySelectorAll(
    '.employment input[type="radio"]'
  );
  employmentOptions.forEach(function (option) {
    option.addEventListener("change", function () {
      console.log("Selected employment option:", option.value);
      const employmentSection = document.querySelector(".employment");
      const challengesSection = document.querySelector(".challenges");

      employmentSection.classList.remove("show");
      setTimeout(function () {
        employmentSection.style.display = "none";
        challengesSection.classList.add("show");
        console.log(".challenges section is now visible.");
      }, 1000);
    });
  });

  // Show the Done button if any checkbox in the challenges section is checked
  var challengeOptions = document.querySelectorAll(
    '.challenges input[type="checkbox"]'
  );
  var doneButton = document.querySelector(".done-button");

  challengeOptions.forEach(function (option) {
    option.addEventListener("change", function () {
      var anyChecked = Array.from(challengeOptions).some(function (checkbox) {
        return checkbox.checked;
      });
      console.log("Is any challenge option checked?", anyChecked);
      if (anyChecked) {
        doneButton.style.display = "block";
        console.log("Done button displayed.");
      } else {
        doneButton.style.display = "none";
        console.log("Done button hidden.");
      }
    });
  });
});

// ==========================================================================================
// child.html
document.addEventListener("DOMContentLoaded", function () {
  // Initial transition from .transition to .gender after 5 seconds
  setTimeout(function () {
    const transitionSection = document.querySelector(".transition");
    const genderSection = document.querySelector(".gender");

    transitionSection.classList.add("hidden");
    setTimeout(function () {
      transitionSection.style.display = "none";
      genderSection.classList.add("show");
    }, 1000); // Wait for the transition to complete before hiding
  }, 5000); // 5000 milliseconds = 5 seconds

  // Add event listeners to radio buttons in .gender section
  var genderOptions = document.querySelectorAll('.gender input[type="radio"]');
  genderOptions.forEach(function (option) {
    option.addEventListener("change", function () {
      const genderSection = document.querySelector(".gender");
      const conditionSection = document.querySelector(".condition");

      // Apply the same fade out effect as .transition.hidden
      genderSection.style.transition = "opacity 1s ease-in-out";
      conditionSection.style.transition = "opacity 1s ease-in-out";

      // Hide the .gender section with a fade out
      genderSection.classList.remove("show");
      setTimeout(function () {
        genderSection.style.display = "none";

        // Show the .condition section with a fade in
        conditionSection.style.display = "flex";
        setTimeout(function () {
          conditionSection.classList.add("show");
        }, 10); // Slight delay to ensure display is set before opacity change
      }, 1000); // Match the 1-second transition time
    });
  });

  // Add event listeners to .bubble elements in .condition section
  var conditionOptions = document.querySelectorAll(".condition .bubble");
  conditionOptions.forEach(function (bubble) {
    bubble.addEventListener("click", function () {
      // Perform any needed actions based on the selected option
      var selectedCondition = bubble.innerText.trim(); // Get the text inside the bubble

      const conditionSection = document.querySelector(".condition");

      // Apply fade out effect
      conditionSection.classList.remove("show");
      setTimeout(function () {
        // Redirect to a different page (replace 'nextpage.html' with your actual page)
        window.location.href = "home.html";
      }, 1000); // Match the 1-second transition time
    });
  });
});

// ==========================================================================================
// home.html
document.addEventListener("DOMContentLoaded", function () {
  var input = document.getElementById("nameInput");
  var doneButton = document.getElementById("doneButton");
  var loadingScreen = document.getElementById("loading-screen");
  var welcomeDiv = document.querySelector(".welcome");
  var welcomeMessage = document.getElementById("welcomeMessage");
  var userNameSpan = document.getElementById("userName");
  var features = document.querySelector(".features");

  // Initially hide the Done button
  doneButton.style.display = "none";

  // Show the Done button when the user types something in the input field
  input.addEventListener("input", function () {
    if (input.value.trim() !== "") {
      doneButton.style.display = "block";
    } else {
      doneButton.style.display = "none";
    }
  });

  // Handle the done button click
  doneButton.addEventListener("click", function () {
    // Hide the welcome section and show the loading screen
    welcomeDiv.style.display = "none";
    loadingScreen.style.display = "flex";

    setTimeout(function () {
      loadingScreen.style.display = "none";
      userNameSpan.textContent = input.value.trim();
      welcomeMessage.style.display = "block";
      welcomeMessage.style.opacity = 1;

      // Show the welcome message for 3 seconds before moving it
      setTimeout(function () {
        welcomeMessage.classList.add("moved");

        // Show features immediately after welcome message moves to the corner
        features.classList.add("show");
        features.style.display = "flex";
        features.style.opacity = 1;
      }, 3000); // Show the welcome message for 3 seconds
    }, 5000); // Show the loading spinner for 5 seconds
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var features = document.querySelector(".features");
  features.style.display = "flex"; // Ensure it is shown
  features.style.opacity = 1; // Ensure full visibility

  // Force redraw
  features.style.display = "none";
  features.offsetHeight; // Trigger a reflow, flushing the CSS changes
  features.style.display = "flex";
});

// ===========================================================================================
// account.html
document.addEventListener("DOMContentLoaded", function () {
  // Pre-set accounts for development
  const presetAccounts = [
    { email: "aesterin@gmail.com", password: "password123" },
    { email: "eithechatbot@gmail.com", password: "mypassword" },
    // Add more accounts as needed
  ];

  const forms = document.querySelector(".forms"),
    loginForm = document.getElementById("loginForm"),
    signupLink = document.querySelector(".signup-link"),
    loginLink = document.querySelector(".login-link"),
    loginError = document.getElementById("loginError"),
    pwShowHide = document.querySelectorAll(".hidePW");

  // Toggle between LoginForm and SignUpForm
  signupLink.addEventListener("click", (e) => {
    e.preventDefault();
    forms.classList.add("show-signup");
  });

  loginLink.addEventListener("click", (e) => {
    e.preventDefault();
    forms.classList.remove("show-signup");
  });

  // Handle login form submission
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const user = presetAccounts.find(
      (account) => account.email === email && account.password === password
    );

    if (user) {
      loginError.textContent = "Login successful!";
      // Redirect or perform any actions needed after successful login
      window.location.href = "home.html"; // Example: redirect to a dashboard page
    } else {
      loginError.textContent = "Invalid email or password.";
    }
  });

  // Password visibility toggle
  pwShowHide.forEach((icon) => {
    icon.addEventListener("click", () => {
      let passwordField = icon.previousElementSibling;
      if (passwordField.type === "password") {
        passwordField.type = "text";
        icon.classList.replace("bxs-hide", "bxs-show");
      } else {
        passwordField.type = "password";
        icon.classList.replace("bxs-show", "bxs-hide");
      }
    });
  });
});
