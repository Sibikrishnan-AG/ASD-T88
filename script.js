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
    window.location.href = "createProfile.html";
}

// ==========================================================================================

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
            console.log('Bubble clicked:', bubble.innerText.trim());
            const conditionSection = document.querySelector('.condition');
            const welcomeSection = document.querySelector('.welcome'); // Ensure this is correctly defined

            if (conditionSection && welcomeSection) {
                console.log('Condition and Welcome sections found.');
                conditionSection.classList.remove('show');
                setTimeout(function() {
                    conditionSection.style.display = 'none';
                    welcomeSection.classList.add('show');
                    console.log('.welcome section is now visible.');
                }, 1000); // 1 second delay to match the transition timing
            } else {
                console.error('Condition or Welcome section not found.');
            }
        });
    });

    // Show Done button when input is not empty in the welcome section
    var input = document.getElementById('nameInput');
    var doneButtonWelcome = document.getElementById('doneButton');
    var loadingScreen = document.getElementById('loading-screen');
    var loadingLogo = document.getElementById('loading-logo');
    var welcomeMessage = document.getElementById('welcomeMessage');
    var features = document.querySelector('.features');

    // Ensure the .welcome section exists
    var welcomeSection = document.querySelector('.welcome');
    if (!welcomeSection) {
        console.error('The .welcome section was not found in the DOM.');
        return;
    }

    // Initially hide the Done button
    doneButtonWelcome.style.display = 'none';

    // Show the Done button when the user types something in the input field
    input.addEventListener('input', function () {
        if (input.value.trim() !== '') {
            doneButtonWelcome.style.display = 'block';
        } else {
            doneButtonWelcome.style.display = 'none';
        }
    });

    // Handle the Done button click in the welcome section
    doneButtonWelcome.addEventListener('click', function () {
        const userName = input.value.trim();
        // Save the name in localStorage or sessionStorage
        sessionStorage.setItem('userName', userName);

        // Show the loading screen with the spinning logo
        welcomeSection.style.display = 'none';
        loadingScreen.style.display = 'flex';
        loadingLogo.style.opacity = 1;

        // Simulate loading animation for 5 seconds
        setTimeout(function () {
            loadingLogo.style.transition = 'opacity 2s ease-out';
            loadingLogo.style.opacity = 0;

            setTimeout(function () {
                loadingScreen.style.display = 'none';
                welcomeMessage.style.display = 'block';
                welcomeMessage.style.opacity = 1;

                setTimeout(function () {
                    welcomeMessage.style.animation = 'moveToCorner 2s forwards';
                }, 500); // Delay the move to the corner

                setTimeout(function () {
                    features.style.display = 'block';
                    features.style.opacity = 1;
                    
                    // Redirect to home.html after all animations
                    setTimeout(function () {
                        window.location.href = 'home.html';
                    }, 1500); // Adjust timing as needed
                }, 2500); // Wait for the welcome message animation to finish
            }, 2000); // Wait for the logo to fade out before showing the welcome message
        }, 5000);
    });
});

// ==========================================================================================

// home.html
document.addEventListener('DOMContentLoaded', function () {
    var userName = sessionStorage.getItem('userName');
    var userNameSpan = document.getElementById('userName');

    if (userName) {
        // Display the welcome message with the user's name
        userNameSpan.textContent = userName;
        const welcomeMessage = document.getElementById('welcomeMessage');
        welcomeMessage.style.display = 'block';
        welcomeMessage.style.opacity = 1;

        setTimeout(function () {
            welcomeMessage.style.animation = 'moveToCorner 2s forwards';
        }, 500); // Delay the move to the corner

        const features = document.querySelector('.features');
        setTimeout(function () {
            features.style.display = 'block';
            features.style.opacity = 1;
        }, 2500); // Delay showing the features until after the welcome message moves
    }
});
