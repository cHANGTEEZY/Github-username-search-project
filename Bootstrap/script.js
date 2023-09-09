let searchCount = localStorage.getItem("searchCount") || 0; // Initialize the search count from local storage

const usernameInput = document.getElementById("username");
const searchButton = document.getElementById("search");
const clearButton = document.getElementById("clear");
const resultDiv = document.getElementById("result");
const searchCountElement = document.getElementById("searchCount");

// Function to update the search count
const updateSearchCount = () => {
  searchCount++;
  searchCountElement.textContent = `Search Count: ${searchCount}`;
  // Store the search count in local storage
  localStorage.setItem("searchCount", searchCount);
};

// Function to perform the search
const performSearch = () => {
  const username = usernameInput.value.trim(); // Remove leading/trailing spaces
  if (!username) {
    alert("Please enter a GitHub username.");
    return; // Exit the function if no username is entered
  }

  updateSearchCount(); // Increment the search count

  fetch(`https://api.github.com/users/${username}`)
    .then((response) => response.json())
    .then((data) => {
      resultDiv.innerHTML = `
        <div class="col-md-6 mx-auto text-center">
          <img
            src="${data.avatar_url}"
            alt="${data.name} Avatar"
            class="avatar"
          />
          <h2>${data.name}</h2>
          <p>Username: ${data.login}</p>
          <p>Followers: ${data.followers}</p>
          <p>Following: ${data.following}</p>
          <p>Public Repositories: ${data.public_repos}</p>
        </div>
      `;
    })
    .catch((error) => {
      resultDiv.innerHTML = `<div class="col-md-6 mx-auto text-center"><p>User not found.</p></div>`;
    });
};

searchButton.addEventListener("click", performSearch);

usernameInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    performSearch();
  }
});

clearButton.addEventListener("click", () => {
  usernameInput.value = "";
  resultDiv.innerHTML = "";
});