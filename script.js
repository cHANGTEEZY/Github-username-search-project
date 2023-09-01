const usernameInput = document.getElementById("username"); // Input field for entering GitHub username
const searchButton = document.getElementById("search"); // Button to initiate the search
const clearButton = document.getElementById("clear"); // Button to clear displayed information
const resultArea = document.getElementById("result"); // Area where user information will be displayed

// Add a click event listener to the search button
// which operates when we click on the search
searchButton.addEventListener("click", () => {
// Get the value entered in the username input field
  const username = usernameInput.value;
  
  // Check if a username has been entered
  if (username) {
    // If the username has been entered
    // Make a fetch request to the GitHub API using the entered username
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        // Check if the user does not exist (based on API response)
        if (data.message === "Not Found") {
          // Display a message indicating that the user does not exist
          resultArea.innerHTML = `
            <h2>User does not exist.</h2>
          `;
        } else {
          // Display user information, including profile picture, name, bio, and location etc
          // also displays a message indicating that the user have not set username,Bio and location etc.
          resultArea.innerHTML = `
            <a target="_blank" href="https://github.com/${username}"> 
              <img src="${data.avatar_url}" alt="Profile picture" > 
            </a>
            <h2>${data.name || " Username not set!!"}</h2> 
            <p>${data.bio || ' Bio not set!!'}</p>
            <p>${data.location || ' Location not set!!'}</p>
            <p>Repositories: ${data.public_repos > 0 ? data.public_repos : "No repositories"}</p>
            <p>Followers: ${data.followers > 0 ? data.followers : "No followers"}</p>
            <p>Following: ${data.following > 0 ? data.following : "No following"}</p>
          `;
        }
        // intially the result area is hidden from the user.
        // the result area is displayed when the api generates the information 
        resultArea.style.display = "block";
      })
      .catch(error => {
        // If there's an error during the fetch request, display an error message
        console.error("Error fetching user data:", error);
        resultArea.innerHTML = `
          <p>Error fetching user data.</p>
        `;
        // Display the error message
        resultArea.style.display = "block";
      });
  } else {
    // If no username is entered, hide the result area
    resultArea.style.display = "none";
  }
});

//user can press enter to search rather than pressing the search button
usernameInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchButton.click(); // Trigger the search button click
  }
});

// to clear the screen when pressed clear button
clearButton.addEventListener("click", () => {
  resultArea.innerHTML = ""; // Clear the result content
  resultArea.style.display = "none"; // Hide the result div
  usernameInput.value = ""; // Clear the input field
});




