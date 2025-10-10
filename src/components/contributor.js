// // conributor loading script

// async function loadContributor() {
//   const container = document.getElementById("contributor-grid");
//   const repoOwner = "gyanshankar1708";
//   const repoName = "GrowCraft";
//   // 🔑 Replace "YOUR_GITHUB_TOKEN_HERE" with your own token
//   // Get one at: https://github.com/settings/tokens
//   const token = GITHUB_TOKEN // ⚠️ Don't upload this to GitHub!
//   console.log(token)
//   const errorMessage = document.getElementById("error-message");

//   try {
//     const res = await fetch(
//       `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
//       {
//         headers: { Authorization: `token ${token}` },
//       }
//     );
//     if (!res.ok) {
//       throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
//     }
//     const contributors = await res.json();
//     if (!Array.isArray(contributors) || contributors.length === 0) {
//       throw new Error("No contributors found for this repository.");
//     }
//     console.log(contributors);

//     contributors.forEach((user) => {
//       const card = document.createElement("div");
//       card.className = "contributor";
//       card.innerHTML = `
//                   <a href="${user.html_url}" target="_blank" class="contri-card">
//                     <img src="${user.avatar_url} alt="${user.login}" />
//                     <p>${user.login}</p>
//                     <p>Contribution: ${user.contributions}</p>
//                   </a>
//                `;
//       container.appendChild(card);
//     });
//   } catch (err) {
//     errorMessage.style.display = "block";
//     errorMessage.textContent =
//       "⚠️ Unable to load contributors. Please check your internet or token not defined or GitHub API limit.";
//   }
// }
// loadContributor();



// src/components/contributor.js

async function loadContributor() {
  const container = document.getElementById("contributor-grid");
  const errorMessage = document.getElementById("error-message");

  // The new URL points to our own function, not directly to GitHub
  const functionUrl = "/.netlify/functions/getContributors";

  try {
    // Notice: No more token or authorization headers here! It's much cleaner.
    const res = await fetch(functionUrl);
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `API error: ${res.status}`);
    }

    const contributors = await res.json();
    if (!Array.isArray(contributors) || contributors.length === 0) {
      throw new Error("No contributors found for this repository.");
    }
    console.log(contributors);

    contributors.forEach((user) => {
      const card = document.createElement("div");
      card.className = "contributor";
      card.innerHTML = `
        <a href="${user.html_url}" target="_blank" class="contri-card">
          <img src="${user.avatar_url}" alt="${user.login}" />
          <p>${user.login}</p>
          <p>Contribution: ${user.contributions}</p>
        </a>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    errorMessage.style.display = "block";
    errorMessage.textContent = `⚠️ Unable to load contributors. Error: ${err.message}`;
  }
}

loadContributor();