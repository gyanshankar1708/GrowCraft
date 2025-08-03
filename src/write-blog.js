document.getElementById('blog-form').onsubmit = function(e) {
  e.preventDefault();
  const author = document.getElementById('author').value;
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  const blog = { title, author, date, content };

  // Fetch existing blogs, append new one, save back
  let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
  blogs.push(blog);
  localStorage.setItem('blogs', JSON.stringify(blogs));

  // Redirect back to blogs page
  window.location = 'blogListing.html';
};
