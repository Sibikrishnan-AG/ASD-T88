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
    window.location.href = "account.html";
  }
  // ==========================================================================================
  // createProfile.html
  document.addEventListener("DOMContentLoaded", function() {
    console.log('Document fully loaded.');
  
    // Initial Transition for Parents Profile Section
    setTimeout(function() {
        const transitionParentsSection = document.querySelector('.transition-Parents');
        const expSection = document.querySelector('.exp');
  
        if (transitionParentsSection && expSection) {
            transitionParentsSection.classList.add('hidden');
            setTimeout(function() {
                transitionParentsSection.style.display = 'none';
                expSection.classList.add('show');
                console.log('.exp section is now visible.');
            }, 1000); // 1 second delay to match the transition timing
        } else {
            console.error('Could not find .transition-Parents or .exp section');
        }
    }, 5000); // 5 seconds delay for the initial display
  
    // Handle Exp Section Transition
    var expOptions = document.querySelectorAll('.exp input[type="radio"]');
    expOptions.forEach(function(option) {
        option.addEventListener('change', function() {
            console.log('Selected exp option:', option.value);
            const expSection = document.querySelector('.exp');
            const employmentSection = document.querySelector('.employment');
  
            if (expSection && employmentSection) {
                expSection.classList.remove('show');
                setTimeout(function() {
                    expSection.style.display = 'none';
                    employmentSection.classList.add('show');
                    console.log('.employment section is now visible.');
                }, 1000); // 1 second delay to match the transition timing
            } else {
                console.error('Could not find .exp or .employment section');
            }
        });
    });
  
    // Handle Employment Section Transition
    var employmentOptions = document.querySelectorAll('.employment input[type="radio"]');
    employmentOptions.forEach(function(option) {
        option.addEventListener('change', function() {
            console.log('Selected employment option:', option.value);
            const employmentSection = document.querySelector('.employment');
            const challengesSection = document.querySelector('.challenges');
  
            if (employmentSection && challengesSection) {
                employmentSection.classList.remove('show');
                setTimeout(function() {
                    employmentSection.style.display = 'none';
                    challengesSection.classList.add('show');
                    console.log('.challenges section is now visible.');
                }, 1000); // 1 second delay to match the transition timing
            } else {
                console.error('Could not find .employment or .challenges section');
            }
        });
    });
  
    // Make the Done button visible only after clicking on any imageBubble in .challenges
    var challengeBubbles = document.querySelectorAll('.challenges .imageBubble');
    var doneButton = document.querySelector('.done-button');
  
    if (doneButton) {
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
  
            if (challengesSection && transitionChildSection) {
                challengesSection.classList.remove('show');
                setTimeout(function() {
                    challengesSection.style.display = 'none';
                    transitionChildSection.classList.add('show');
                    console.log('.transition-Child section is now visible.');
  
                    // Handle Initial Child Profile Transition
                    setTimeout(function() {
                        const childTransitionSection = document.querySelector('.transition-Child');
                        const genderSection = document.querySelector('.gender');
  
                        if (childTransitionSection && genderSection) {
                            childTransitionSection.classList.add('hidden');
                            setTimeout(function() {
                                childTransitionSection.style.display = 'none';
                                genderSection.classList.add('show');
                                console.log('.gender section is now visible.');
                            }, 1000); // 1 second delay to match the transition timing
                        } else {
                            console.error('Could not find .transition-Child or .gender section');
                        }
                    }, 5000); // 5 seconds delay for the initial display of child profile
                }, 1000); // 1 second delay to match the transition timing
            } else {
                console.error('Could not find .challenges or .transition-Child section');
            }
        });
    } else {
        console.error('Done button not found');
    }
  
    // Handle Gender Section Transition
    var genderOptions = document.querySelectorAll('.gender input[type="radio"]');
    genderOptions.forEach(function(option) {
        option.addEventListener('change', function() {
            console.log('Selected gender option:', option.value);
            const genderSection = document.querySelector('.gender');
            const conditionSection = document.querySelector('.condition');
  
            if (genderSection && conditionSection) {
                genderSection.classList.remove('show');
                setTimeout(function() {
                    genderSection.style.display = 'none';
                    conditionSection.classList.add('show');
                    console.log('.condition section is now visible.');
                }, 1000); // 1 second delay to match the transition timing
            } else {
                console.error('Could not find .gender or .condition section');
            }
        });
    });
  
    // Handle Condition Section Transition
    var conditionOptions = document.querySelectorAll('.condition .bubble');
    conditionOptions.forEach(function(bubble) {
        bubble.addEventListener('click', function() {
            console.log('Selected condition:', bubble.innerText.trim());
            const conditionSection = document.querySelector('.condition');
            const welcomeSection = document.querySelector('.welcome');
            const nameInput = document.getElementById("nameInput");
  
            if (conditionSection && welcomeSection) {
                conditionSection.classList.remove('show');
                setTimeout(function() {
                    conditionSection.style.display = 'none';
                    if (welcomeSection) {
                        welcomeSection.classList.add('show');
                        console.log('.welcome section is now visible.');
                        
                        // Check if the name input is accessible after the section is shown
                        if (nameInput) {
                            console.log('Name input found:', nameInput);
                        } else {
                            console.error('Name input not found.');
                        }
                    } else {
                        console.error('.welcome section not found.');
                    }
                }, 1000); // 1 second delay to match the transition timing
            } else {
                console.error('.condition or .welcome section not found.');
            }
        });
    });
  });
  
  // ==========================================================================================
  // Pre transition to home.html
  document.addEventListener("DOMContentLoaded", function() {
    var nameInput = document.getElementById('nameInput');
    var doneButton = document.getElementById('doneButton');
  
    // Initially hide the Done button
    doneButton.style.display = 'none';
  
    // Show the Done button when the user types something in the input field
    nameInput.addEventListener('input', function () {
        if (nameInput.value.trim() !== '') {
            doneButton.style.display = 'block';
        } else {
            doneButton.style.display = 'none';
        }
    });
  
    // Handle the done button click
    // Handle the done button click
  doneButton.addEventListener('click', function () {
      var userName = nameInput.value.trim();
      if (userName !== '') {
          // Redirect to profile.html with the entered name
          window.location.href = 'home.html?name=' + encodeURIComponent(userName);
      }
  });
  
  });
  
  // Post transition to home.html
  document.addEventListener("DOMContentLoaded", function() {
    var params = new URLSearchParams(window.location.search);
    var userName = params.get('name');
  
    var loadingScreen = document.getElementById('loading-screen');
    var welcomeMessage = document.getElementById('welcomeMessage');
    var userNameSpan = document.getElementById('userName');
    var features = document.querySelector('.features');
    var options = document.querySelectorAll('.features .option');
  
    // Set the user's name in the welcome message
    if (userName) {
        userNameSpan.textContent = userName;
    }
  
    // Show loading screen initially
    loadingScreen.style.display = 'flex';
    welcomeMessage.style.display = 'none';
    features.style.display = 'none';
  
    // Simulate loading spinner for 5 seconds
    setTimeout(function() {
        // Fade out the loading screen
        loadingScreen.style.transition = 'opacity 1s ease-out';
        loadingScreen.style.opacity = 0;
  
        setTimeout(function() {
            loadingScreen.style.display = 'none';
  
            // Show the welcome message
            welcomeMessage.style.display = 'block';
            welcomeMessage.style.opacity = 1;
  
            // Trigger the moveToCorner animation after a short delay
            setTimeout(function() {
                welcomeMessage.classList.add('moved');
            }, 500);
  
            // Fade in the features after the welcome message moves to the corner
            setTimeout(function() {
                features.style.display = 'flex';
                features.style.opacity = 1;
  
                // Fade in each option within the features section
                options.forEach(function(option, index) {
                    setTimeout(function() {
                        option.style.opacity = 1;
                    }, index * 500); // Stagger the fade-in effect for each option
                });
          //   });});});
            }, 2500); // Delay to match the welcomeMessage transition
  
        }, 1000); // Wait for the fade-out transition to complete
    }, 5000); // Keep the loading screen for 5 seconds
    
  
    profileButton.addEventListener('click', function () {
      if (userName !== '') {
          // Redirect to profile.html with the entered name
          window.location.href = 'profile.html?name=' + encodeURIComponent(userName);
      }
  });
  
  });
  
  
  
// ===========================================================================================
// account.html & newAccount.html
document.addEventListener('DOMContentLoaded', function() {

    // Function to toggle password visibility
    function togglePasswordVisibility(toggleIcon, passwordFieldId) {
        const passwordField = document.querySelector(`#${passwordFieldId}`);
        if (passwordField.type === "password") {
            passwordField.type = "text";
            toggleIcon.classList.replace("bi-eye-slash", "bi-eye");
        } else {
            passwordField.type = "password";
            toggleIcon.classList.replace("bi-eye", "bi-eye-slash");
        }
    }

    // Apply toggle functionality for all instances of password toggling
    const togglePasswordIcons = document.querySelectorAll('#togglePassword');
    togglePasswordIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // Use the previous sibling input field for toggling
            const passwordField = icon.previousElementSibling;
            togglePasswordVisibility(icon, passwordField.id);
        });
    });

    // Pre-set accounts for development
    const presetAccounts = [
        { email: "john@gmail.com", password: "password123", name: "John" },
        { email: "eithechatbot@gmail.com", password: "mypassword", name: "Jane" },
      // Add more accounts as needed
    ];

    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission

            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;

            // Simple client-side validation or fake login (could be expanded)
            const user = presetAccounts.find(
                (account) => account.email === email && account.password === password
            );

            if (user) {
                window.location.href = `home.html?name=${encodeURIComponent(user.name)}`;// Redirect to the home page or dashboard
            } else {
                loginError.innerHTML = "Invalid email or password.<br>Please try again.";
            }
        });
    }

    // Handle sign-up form submission
    const signUpForm = document.querySelector('form[action="/submit"]');

    if (signUpForm) {
        signUpForm.addEventListener('submit', function(event) {
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirmPassword").value;
            const signupError = document.getElementById("signupError");

            if (password !== confirmPassword) {
                event.preventDefault(); // Prevent form submission if passwords do not match
                signupError.textContent = "Passwords do not match.";
            } else {
                signupError.textContent = "";
                event.preventDefault(); // Prevent default form submission
                window.location.href = 'createProfile.html'; // Redirect to createProfile.html
            }
        });
    }


});

  