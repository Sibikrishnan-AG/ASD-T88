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

// parents.html
document.addEventListener("DOMContentLoaded", function() {
    console.log('Document fully loaded.');

    // Transition from .transition to .exp after 5 seconds
    setTimeout(function() {
        console.log('Starting transition from .transition to .exp.');
        const transitionSection = document.querySelector('.transition');
        const expSection = document.querySelector('.exp');

        transitionSection.classList.add('hidden');
        setTimeout(function() {
            transitionSection.style.display = 'none';
            expSection.classList.add('show');
            console.log('.exp section is now visible.');
        }, 1000); // Wait for the transition to complete before hiding
    }, 5000); // 5000 milliseconds = 5 seconds

    // Add event listeners to radio buttons in .exp section
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
            }, 1000);
        });
    });

    // Add event listeners to radio buttons in .employment section
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
            }, 1000);
        });
    });

    // Show the Done button if any checkbox in the challenges section is checked
    var challengeOptions = document.querySelectorAll('.challenges input[type="checkbox"]');
    var doneButton = document.querySelector('.done-button');

    challengeOptions.forEach(function(option) {
        option.addEventListener('change', function() {
            var anyChecked = Array.from(challengeOptions).some(function(checkbox) {
                return checkbox.checked;
            });
            console.log('Is any challenge option checked?', anyChecked);
            if (anyChecked) {
                doneButton.style.display = 'block';
                console.log('Done button displayed.');
            } else {
                doneButton.style.display = 'none';
                console.log('Done button hidden.');
            }
        });
    });
});
/////////////////////////////////////////


// child.html
document.addEventListener("DOMContentLoaded", function() {
    // Initial transition from .transition to .gender after 5 seconds
    setTimeout(function() {
        const transitionSection = document.querySelector('.transition');
        const genderSection = document.querySelector('.gender');

        transitionSection.classList.add('hidden');
        setTimeout(function() {
            transitionSection.style.display = 'none';
            genderSection.classList.add('show');
        }, 1000); // Wait for the transition to complete before hiding
    }, 5000); // 5000 milliseconds = 5 seconds

    // Add event listeners to radio buttons in .gender section
    var genderOptions = document.querySelectorAll('.gender input[type="radio"]');
    genderOptions.forEach(function(option) {
        option.addEventListener('change', function() {
            const genderSection = document.querySelector('.gender');
            const conditionSection = document.querySelector('.condition');

            // Apply the same fade out effect as .transition.hidden
            genderSection.style.transition = 'opacity 1s ease-in-out';
            conditionSection.style.transition = 'opacity 1s ease-in-out';

            // Hide the .gender section with a fade out
            genderSection.classList.remove('show');
            setTimeout(function() {
                genderSection.style.display = 'none';

                // Show the .condition section with a fade in
                conditionSection.style.display = 'flex';
                setTimeout(function() {
                    conditionSection.classList.add('show');
                }, 10); // Slight delay to ensure display is set before opacity change
            }, 1000); // Match the 1-second transition time
        });
    });

    // Add event listeners to .bubble elements in .condition section
    var conditionOptions = document.querySelectorAll('.condition .bubble');
    conditionOptions.forEach(function(bubble) {
        bubble.addEventListener('click', function() {
            // Perform any needed actions based on the selected option
            var selectedCondition = bubble.innerText.trim(); // Get the text inside the bubble
            
            const conditionSection = document.querySelector('.condition');

            // Apply fade out effect
            conditionSection.classList.remove('show');
            setTimeout(function() {
                // Redirect to a different page (replace 'nextpage.html' with your actual page)
                window.location.href = 'home.html';
            }, 1000); // Match the 1-second transition time
        });
    });
});

// home.html
document.addEventListener('DOMContentLoaded', function () {
    var input = document.getElementById('nameInput');
    var doneButton = document.getElementById('doneButton');
    var loadingScreen = document.getElementById('loading-screen');
    var loadingLogo = document.getElementById('loading-logo');
    var yourNameDiv = document.querySelector('.yourName');
    var welcomeScreen = document.getElementById('welcomeScreen');
    var welcomeMessage = document.getElementById('welcomeMessage');
    var userNameSpan = document.getElementById('userName');
    var features = document.querySelector('.features');
    var options = document.querySelectorAll('.option');
    // Add a click event listener to each option
    // options.forEach(option => {
    //     option.addEventListener('click', function() {
    //         // Get the URL from the data-link attribute
    //         var link = option.getAttribute('data-link');
    //         // Redirect to the new page
    //         window.location.href = link;
    //     });
    // });
    // Show the done button when at least one character is entered
    input.addEventListener('input', function () {
        if (input.value.trim().length > 0) {
            doneButton.style.display = 'inline-block';
        } else {
            doneButton.style.display = 'none';
        }
    });

    // Handle the done button click
    doneButton.addEventListener('click', function () {
        // Hide the input field, button, and welcome screen message
        yourNameDiv.style.display = 'none';
        doneButton.style.display = 'none';
        welcomeScreen.style.display = 'none';

        // Show the loading screen with the spinning logo
        loadingScreen.style.display = 'flex';
        loadingLogo.style.opacity = 1;

        // Simulate loading animation for 5 seconds
        setTimeout(function () {
            // Fade out the loading logo
            loadingLogo.style.transition = 'opacity 1s ease-out';
            loadingLogo.style.opacity = 0;

            // Show the welcome message with fade-in effect
            setTimeout(function() {
                loadingScreen.style.display = 'none';
                userNameSpan.textContent = input.value.trim();
                welcomeMessage.style.display = 'block';
                welcomeMessage.style.opacity = 1;

                // Start the animation to move to the corner and shrink
                welcomeMessage.style.animation = 'moveToCorner 2s forwards';

                // Show features after the welcome message animation
                setTimeout(function() {
                    features.style.display = 'block';
                    options.forEach((option, index) => {
                        setTimeout(function () {
                            option.style.opacity = 1;
                        }, index * 500); // Delay each option by 500ms
                    });
                }, 2000); // Wait for the welcome message animation to finish
            }, 1000); // Wait for the logo to fade out before showing the welcome message
        }, 5000);
    });
    
});