function loadBlogs() {
  let blogs = JSON.parse(localStorage.getItem('blogs'));
  if (!blogs) {
    blogs = [
      {
        title: "How to Launch a Website in 2025: Step-by-Step Guide",
        author: "Priya S.",
        date: "July 15, 2025",
        content: "Learn the essentials of website development, from choosing a domain name to deploying your first project online. Tips and best practices for beginners."
      },
      {
        title: "Top 5 Digital Marketing Trends You Can't Ignore",
        author: "Raghav T.",
        date: "July 20, 2025",
        content: "Stay ahead with the latest strategies in SEO, social media, influencer marketing, and content creation that will dominate in the coming year."
      }
    ];
    localStorage.setItem('blogs', JSON.stringify(blogs));
  }
  return blogs;
}

// Render blogs as clickable cards
function renderBlogs() {
  const blogList = document.getElementById('blog-list');
  const blogs = loadBlogs();
  blogList.innerHTML = '';
  // Show most recent blog first
  blogs.slice().reverse().forEach((blog, i) => {
    const realIndex = blogs.length - 1 - i; // So index matches array
    const el = document.createElement('div');
    el.className = 'blog-card';
    el.tabIndex = 0;
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', 'Read full blog');
    el.style.cursor = 'pointer';
    el.onclick = () => {
      // Save selected blog index so blogView.html can load it
      localStorage.setItem('selectedBlogIndex', realIndex);
      window.location = 'blogView.html';
    };
    el.innerHTML = `
      <h4>${blog.title}</h4>
      <small>By ${blog.author} | ${blog.date}</small>
      <p style="max-height: 56px; overflow:hidden; text-overflow:ellipsis;">${blog.content.length > 130 ? blog.content.substring(0, 130) + '…' : blog.content}</p>
      <span style="color:#3D5CFC; font-size:.93rem; font-weight:600;letter-spacing:.1em;">Read More &rarr;</span>
    `;
    blogList.appendChild(el);
  });
}

window.onload = renderBlogs;
