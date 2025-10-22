// src/components/contributor.js

async function loadContributor() {
  const container = document.getElementById("contributor-grid");
  const errorMessage = document.getElementById("error-message");

  // Optional: Add a section header above the grid
  const header = document.createElement("div");
  header.innerHTML = `
    <h2 class="text-2xl font-bold mb-2">Cyber Security Highlights</h2>
    <p class="text-gray-600 mb-4">Meet our contributors and their contributions.</p>
  `;
  container.parentNode.insertBefore(header, container);

  // URL for secure serverless function (no token needed)
  const functionUrl = "/.netlify/functions/getContributors";

  try {
    const res = await fetch(functionUrl);

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({
        message: `Server returned an error: ${res.status}`,
      }));
      throw new Error(errorData.message);
    }

    const contributors = await res.json();
    if (!Array.isArray(contributors) || contributors.length === 0) {
      throw new Error("No contributors were found.");
    }

    console.log("Successfully loaded contributors:", contributors);

    contributors.forEach((user) => {
      const card = document.createElement("div");
      card.className =
        "contributor shadow-lg rounded-lg p-4 text-center transition-transform transform hover:-translate-y-1 hover:shadow-xl";

      card.innerHTML = `
        <a href="${user.html_url}" target="_blank" class="contri-card" tabindex="0">
          <img src="${user.avatar_url}" alt="${user.login}" class="rounded-full w-24 h-24 object-cover" />
          <p class="font-semibold text-lg mt-2">${user.login}</p>
          <p class="text-gray-600 text-sm">Contribution: ${user.contributions}</p>
        </a>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    errorMessage.style.display = "block";
    errorMessage.textContent = `⚠️ Error loading contributors: ${err.message}`;
    console.error(err);
  }
}

loadContributor();
