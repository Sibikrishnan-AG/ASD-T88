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
// createProfile.html
document.addEventListener("DOMContentLoaded", function() {
  console.log('Document fully loaded.');

  // Initial Transition for Parents Profile Section
  setTimeout(function() {
      const transitionParentsSection = document.querySelector('.transition-Parents');
      const expSection = document.querySelector('.exp');

      transitionParentsSection.classList.add('hidden');
      setTimeout(function() {
          transitionParentsSection.style.display = 'none';
          expSection.classList.add('show');
          console.log('.exp section is now visible.');
      }, 1000); // 1 second delay to match the transition timing
  }, 5000); // 5 seconds delay for the initial display

  // Handle Exp Section Transition
  var expOptions = document.querySelectorAll('.exp input[type="radio"]');
  expOptions.forEach(function(option) {
      option.addEventListener('change', function() {
          console.log('Selected exp option:', option.value);
          const expSection = document.querySelector('.exp');
          const employmentSection = document.querySelector('.employment');

          expSection.classList.remove('show');
          setTimeout(function() {
              expSection.style.display = 'none';
              employmentSection.classList.add('show');
              console.log('.employment section is now visible.');
          }, 1000); // 1 second delay to match the transition timing
      });
  });

  // Handle Employment Section Transition
  var employmentOptions = document.querySelectorAll('.employment input[type="radio"]');
  employmentOptions.forEach(function(option) {
      option.addEventListener('change', function() {
          console.log('Selected employment option:', option.value);
          const employmentSection = document.querySelector('.employment');
          const challengesSection = document.querySelector('.challenges');

          employmentSection.classList.remove('show');
          setTimeout(function() {
              employmentSection.style.display = 'none';
              challengesSection.classList.add('show');
              console.log('.challenges section is now visible.');
          }, 1000); // 1 second delay to match the transition timing
      });
  });

  // Make the Done button visible only after clicking on any imageBubble in .challenges
  var challengeBubbles = document.querySelectorAll('.challenges .imageBubble');
  var doneButton = document.querySelector('.done-button');

  challengeBubbles.forEach(function(bubble) {
      bubble.addEventListener('click', function() {
          doneButton.style.display = 'block';
          console.log('Done button displayed.');
      });
  });

  // Transition from Challenges to Child Profile Section
  doneButton.addEventListener('click', function() {
      const challengesSection = document.querySelector('.challenges');
      const transitionChildSection = document.querySelector('.transition-Child');

      challengesSection.classList.remove('show');
      setTimeout(function() {
          challengesSection.style.display = 'none';
          transitionChildSection.classList.add('show');
          console.log('.transition-Child section is now visible.');

          // Handle Initial Child Profile Transition
          setTimeout(function() {
              const childTransitionSection = document.querySelector('.transition-Child');
              const genderSection = document.querySelector('.gender');

              childTransitionSection.classList.add('hidden');
              setTimeout(function() {
                  childTransitionSection.style.display = 'none';
                  genderSection.classList.add('show');
                  console.log('.gender section is now visible.');
              }, 1000); // 1 second delay to match the transition timing
          }, 5000); // 5 seconds delay for the initial display of child profile
      }, 1000); // 1 second delay to match the transition timing
  });

  // Handle Gender Section Transition
  var genderOptions = document.querySelectorAll('.gender input[type="radio"]');
  genderOptions.forEach(function(option) {
      option.addEventListener('change', function() {
          console.log('Selected gender option:', option.value);
          const genderSection = document.querySelector('.gender');
          const conditionSection = document.querySelector('.condition');

          genderSection.classList.remove('show');
          setTimeout(function() {
              genderSection.style.display = 'none';
              conditionSection.classList.add('show');
              console.log('.condition section is now visible.');
          }, 1000); // 1 second delay to match the transition timing
      });
  });

  // Handle Condition Section Transition
  var conditionOptions = document.querySelectorAll('.condition .bubble');
  conditionOptions.forEach(function(bubble) {
      bubble.addEventListener('click', function() {
          console.log('Selected condition:', bubble.innerText.trim());
          const conditionSection = document.querySelector('.condition');

          conditionSection.classList.remove('show');
          setTimeout(function() {
              conditionSection.style.display = 'none';
              // Perform any further action, like redirecting to another page
              window.location.href = 'home.html';
          }, 1000); // 1 second delay to match the transition timing
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
