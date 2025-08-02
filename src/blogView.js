window.onload = function() {
  const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
  const idx = localStorage.getItem('selectedBlogIndex');
  const section = document.getElementById('full-blog-content');
  if (idx === null || !blogs[idx]) {
    section.innerHTML = '<p style="color:#B00;font-size:1.1rem;">Sorry, blog not found.</p>';
    return;
  }
  const blog = blogs[idx];
  section.innerHTML = `
    <h2 style="margin-bottom:10px; text-align:left;">${blog.title}</h2>
    <small style="display:block; margin-bottom:18px; color:#8492a6;">By ${blog.author} | ${blog.date}</small>
    <div style="color:#293241; font-size:1.09rem; line-height:1.7;">${blog.content.replace(/\n/g, '<br>')}</div>
  `;
};

