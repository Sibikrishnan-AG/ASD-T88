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
//   /////////////////////////////////////
   // Make the Done button visible only after clicking on any imageBubble in .challenges
    var challengeBubbles = document.querySelectorAll('.challenges input[type="checkbox"]');
    var doneButton = document.querySelector('.done-button');

    // Function to update Done button visibility based on selection
    function updateDoneButtonVisibility() {
        const anySelected = Array.from(challengeBubbles).some(bubble => bubble.checked);
        doneButton.style.display = anySelected ? 'block' : 'none';
        console.log(anySelected ? 'Done button displayed.' : 'Done button hidden.');
    }

    // Attach change event listener to each checkbox in the challenges section
    challengeBubbles.forEach(function(bubble) {
        bubble.addEventListener('change', function() {
            updateDoneButtonVisibility();
        });
    });

    // Initially hide the Done button
    doneButton.style.display = 'none';

    // Transition from Challenges to Child Profile Section when Done button is clicked
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

    let data = [];

    // Fetch User Data
    async function profileData() {
        try {
            const response = await fetch('/api/data');
            data = await response.json();

            // Now that the data is fetched, you can use it to find the item
            const item = data.find(d => d.name === userName);
            
            console.log(data); // Debugging: Check if data is fetched correctly

            // Use the fetched data (item) in your profile button event listener
            if (item) {
                profileButton.addEventListener('click', function () {
                    window.location.href = 'profile.html?userId=' + encodeURIComponent(item._id);
                });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    profileData();  // Call the async function to fetch data
  
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
    

    
  
//     profileButton.addEventListener('click', function () {
//         window.location.href = 'profile.html?userId=' + encodeURIComponent(item._id);
//   });
  
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
    let data = [];


    async function accountData() {
        try {
            const response = await fetch('/api/data');
            data = await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    accountData();

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission

            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;

            // Simple client-side validation or fake login (could be expanded)
            const user = data.find(
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

  
// ===========================================================================================
// profile.html

document.addEventListener('DOMContentLoaded', function() {
    
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Store previous selections for challenges
    let previousSelectedChallenges = [];

    // Function to switch tabs (same as before)
    function switchTab(event) {
      const tabs = document.querySelectorAll('.tab');
      const contents = document.querySelectorAll('.tab-content');
      
      tabs.forEach(tab => tab.classList.remove('active'));
      contents.forEach(content => content.classList.remove('active'));
      
      const index = Array.from(tabs).indexOf(event.target);
      tabs[index].classList.add('active');
      contents[index].classList.add('active');
    }

    // Attach click event listeners to all tabs for switching
    const tabElements = document.querySelectorAll('.tab');
    tabElements.forEach(tab => tab.addEventListener('click', switchTab));

    // Fetch and populate user data (same as before)
    async function fetchData() {
      try {
        const params = new URLSearchParams(window.location.search);
        const userId = params.get('userId');

        const response = await fetch('/api/data');
        const data = await response.json();

        const item = data.find(d => d._id === userId);

        if (item) {
          // Populate the fields with the user's data
          document.getElementById('name').value = item.name || '';
          document.getElementById('email').value = item.email || '';
          document.getElementById('employmentStatus').value = item.parents.employmentStatus || '';
          document.getElementById('firstTime').value = item.parents.firstTime ? "Yes" : "No";
          document.getElementById('childGender').value = item.child.gender || '';
          document.getElementById('childCondition').value = item.child.condition || '';

          // Populate challenges
          const challengesContainer = document.getElementById('challengesContainer');
          challengesContainer.innerHTML = ''; // Clear existing challenges

          const challenges = [
            { value: 'Emotional & Mental Distress', label: 'Emotional & Mental Distress', img: 'mental.png' },
            { value: 'Parenthood', label: 'Parenthood', img: 'parenthood.png' },
            { value: 'Lack Of Accessible Support', label: 'Lack of Accessible Support', img: 'support.png' },
            { value: 'Social Discrimination & Isolation', label: 'Social Discrimination & Isolation', img: 'social.png' }
          ];

          item.parents.challenges.forEach(selectedChallenge => {
            const challenge = challenges.find(ch => ch.value === selectedChallenge);
            if (challenge) {
              const label = document.createElement('label');
              const challengeImg = document.createElement('img');
              challengeImg.src = "images/" + challenge.img;
              challengeImg.alt = challenge.label;
              challengeImg.className = 'challenge-icon';

              label.appendChild(challengeImg);
              label.appendChild(document.createTextNode(challenge.label));
              challengesContainer.appendChild(label);
            }
          });

          // Store previous challenges for later
          previousSelectedChallenges = [...item.parents.challenges];
        } else {
          console.error('No matching user found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    // Call fetchData to populate the data
    fetchData();

    // Fields for Display Name, Email, and their pen icon functionality
    const textFields = [
      {
        inputField: document.getElementById('name'),
        penIcon: document.getElementById('editDisplayName')
      },
      {
        inputField: document.getElementById('email'),
        penIcon: document.getElementById('editEmail'),
        validate: function (value) {
          // Check if email format is valid
          return emailRegex.test(value);
        }
      }
    ];

    // Enable editing for Display Name and Email on pen click
    textFields.forEach(field => {
      field.penIcon.addEventListener('click', function() {
        field.penIcon.style.display = 'none'; // Hide pen icon
        field.inputField.readOnly = false; // Make field editable
        field.inputField.classList.add('editable'); // Add class for styling
        field.inputField.focus(); // Focus on the field for immediate typing
      });

      // Handle clicking outside the input field to prevent leaving empty
      document.addEventListener('click', function(event) {
        if (!field.inputField.contains(event.target) && !field.penIcon.contains(event.target)) {
          const value = field.inputField.value.trim();

          if (!value) {
            alert(`${field.inputField.id === 'name' ? 'Display Name' : 'Email'} cannot be left blank.`); // Show error message
            field.inputField.focus(); // Focus again on the field, don't let them leave
            field.inputField.readOnly = false; // Keep the field editable
          } else if (field.inputField.id === 'email' && !field.validate(value)) {
            alert('Please enter a valid email address.');
            field.inputField.focus(); // Focus again on the field, don't let them leave
            field.inputField.readOnly = false; // Keep the field editable
          } else {
            field.inputField.readOnly = true; // Make field static again if valid
            field.penIcon.style.display = 'block'; // Show pen icon again
            field.inputField.classList.remove('editable'); // Remove editable style
          }
        }
      });

      // Prevent document click handler from triggering immediately when clicked inside the field
      field.inputField.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent event propagation so they can keep typing
      });
    });

    // Handle the Challenges pen icon click
    const challengesPen = document.getElementById('editChallenges');
    const challengesPopup = document.getElementById('challengesPopup');
    const doneButton = document.getElementById('saveChlgsButton');
    const overlay = document.querySelector('.overlay');
    const popupChallengesContainer = document.getElementById('popupChallengesContainer');

    // Function to populate the challenges pop-up
    function populateChallengesInPopup() {
      popupChallengesContainer.innerHTML = ''; // Clear previous options
      const challenges = [
        { value: 'Emotional & Mental Distress', label: 'Emotional & Mental Distress', img: 'mental.png' },
        { value: 'Parenthood', label: 'Parenthood', img: 'parenthood.png' },
        { value: 'Lack Of Accessible Support', label: 'Lack of Accessible Support', img: 'support.png' },
        { value: 'Social Discrimination & Isolation', label: 'Social Discrimination & Isolation', img: 'social.png' }
      ];

      challenges.forEach(challenge => {
        const label = document.createElement('label');
        const img = document.createElement('img');
        img.src = "images/" + challenge.img;
        img.alt = challenge.label;
        img.classList.add('challenge-icon');
        label.appendChild(img);
        label.appendChild(document.createTextNode(challenge.label));
        label.dataset.value = challenge.value;

        // Click event for challenge selection
        label.addEventListener('click', function() {
          label.classList.toggle('selected'); // Toggle selection state
          doneButton.style.display = 'block'; // Show Done button once selected
        });

        popupChallengesContainer.appendChild(label);
      });
    }

    // Show challenges pop-up when the pen is clicked
    challengesPen.addEventListener('click', function() {
      challengesPen.style.display = 'none'; // Hide the pen icon
      overlay.style.display = 'block'; // Show overlay
      challengesPopup.style.display = 'block'; // Show the pop-up box
      populateChallengesInPopup(); // Populate the challenges
    });

    // Close the pop-up and display selected challenges when Done is clicked
    doneButton.addEventListener('click', function() {
      challengesPen.style.display = 'block'; // Show pen icon again
      challengesPopup.style.display = 'none'; // Hide the pop-up
      overlay.style.display = 'none'; // Hide the overlay

      // Collect selected challenges
      const selectedChallenges = Array.from(document.querySelectorAll('.popup-box .selected'))
        .map(label => label.dataset.value);

      // If no new challenges are selected, keep the previous selections
      if (selectedChallenges.length === 0) {
        selectedChallenges.push(...previousSelectedChallenges);
      }

      // Update the challenges container in the profile view with the selected challenges
      const challengesContainer = document.getElementById('challengesContainer');
      challengesContainer.innerHTML = ''; // Clear existing challenges

      // Iterate through the selected challenges and display them
      const challenges = [
        { value: 'Emotional & Mental Distress', label: 'Emotional & Mental Distress', img: 'mental.png' },
        { value: 'Parenthood', label: 'Parenthood', img: 'parenthood.png' },
        { value: 'Lack Of Accessible Support', label: 'Lack of Accessible Support', img: 'support.png' },
        { value: 'Social Discrimination & Isolation', label: 'Social Discrimination & Isolation', img: 'social.png' }
      ];

      selectedChallenges.forEach(selectedChallenge => {
        const challenge = challenges.find(ch => ch.value === selectedChallenge);
        if (challenge) {
          const label = document.createElement('label');
          const challengeImg = document.createElement('img');
          challengeImg.src = "images/" + challenge.img;
          challengeImg.alt = challenge.label;
          challengeImg.className = 'challenge-icon';

          label.appendChild(challengeImg);
          label.appendChild(document.createTextNode(challenge.label));
          challengesContainer.appendChild(label);
        }
      });

      // Update previousSelectedChallenges to match the latest selections
      previousSelectedChallenges = [...selectedChallenges];

      // Log the selected challenges (for debugging or sending to server)
      console.log('Selected Challenges:', selectedChallenges);
    });

    // Close pop-up if clicked outside
    overlay.addEventListener('click', function() {
      challengesPopup.style.display = 'none';
      overlay.style.display = 'none';
      challengesPen.style.display = 'block';
    });

    // Save profile changes with validation
    // async function saveProfile(userId, updatedProfile) {
        async function saveProfile(event) {
            // Prevent form submission and redirection
            event.preventDefault();
          
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const employmentStatus = document.getElementById('employmentStatus').value;
            const firstTime = document.getElementById('firstTime').value;
            const childGender = document.getElementById('childGender').value;
            const childCondition = document.getElementById('childCondition').value;
            const params = new URLSearchParams(window.location.search);
            const userId = params.get('userId');
          
            // Ensure Display Name and Email are not left blank
            if (!name) {
              alert('Display Name cannot be left blank.'); // Show error message
              return; // Stop further execution, let the user fix the error
            }
            if (!email || !emailRegex.test(email)) {
              alert('Please enter a valid email address.'); // Show error message
              return; // Stop further execution, let the user fix the error
            }
          
            const updatedProfile = {
              userId,
              name,
              email,
              employmentStatus,
              firstTime,
              childGender,
              childCondition,
              challenges: previousSelectedChallenges, // Include challenges for saving
            };
          
            console.log(updatedProfile);
          
            try {
              const response = await fetch('/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProfile),
              });
          
              if (response.ok) {
                showSuccessPopup(); // Show success if save is successful
              } else {
                const errorMessage = await response.text();
                console.error('Error saving profile:', errorMessage);
                alert('There was an issue updating your profile. Please try again.');
              }
            } catch (error) {
              console.error('Error saving profile:', error);
              alert('There was an issue updating your profile. Please try again.');
            }
          }
          

    // Save password changes with validation
    async function savePassword(event) {
      // Prevent form submission and redirection
      event.preventDefault();

      const newPassword = document.getElementById('newPassword').value.trim();
      const oldPassword = document.getElementById('oldPassword').value.trim();
      const params = new URLSearchParams(window.location.search);
      const userId = params.get('userId');

      const updatedProfile = {
        userId,
        oldPassword,
        newPassword
      };

      try {
        const response = await fetch('/changePassword', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedProfile)
        });

        if (response.ok) {
          showSuccessPopup(); // Show success if save is successful
        } else {
          const errorMessage = await response.text();
          console.error('Error saving profile:', errorMessage);
          alert('There was an issue updating your profile. Please try again.');
        }
      } catch (error) {
        console.error('Error saving profile:', error);
        alert('There was an issue updating your profile. Please try again.');
      }
    }

    // Attach the saveProfile function to the form's submit event
    document.getElementById('saveChangesProfile').addEventListener('click', saveProfile);

    // Attach the saveProfile function to the form's submit event
    document.getElementById('saveChangesPassword').addEventListener('click', savePassword);

    // Back button handler
    function handleBackButtonClick() {
      const userName = document.getElementById('name').value;
      sessionStorage.setItem('skipAnimation', 'true');
      window.location.href = `home.html?name=${encodeURIComponent(userName)}`;
    }

    document.getElementById('backButtonProfile').addEventListener('click', handleBackButtonClick);
    document.getElementById('backButtonAccount').addEventListener('click', handleBackButtonClick);

    // Show success popup
    function showSuccessPopup() {
      alert('Profile updated successfully!');
    }
});