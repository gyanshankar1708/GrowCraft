// netlify/functions/getContributors.js

exports.handler = async function (event, context) {
  const repoOwner = "gyanshankar1708";
  const repoName = "GrowCraft";
  const token = process.env.GITHUB_TOKEN; // This securely reads the token on Netlify's server

  if (!token) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "GitHub token is not configured on the server." }),
    };
  }

  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ message: `GitHub API error: ${response.statusText}` }),
      };
    }

    const contributors = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(contributors),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `Internal server error: ${error.message}` }),
    };
  }
};