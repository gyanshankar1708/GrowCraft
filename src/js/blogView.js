window.onload = function() {
  const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
  const idx = localStorage.getItem('selectedBlogIndex');
  const section = document.getElementById('full-blog-content');
  
  // If no blogs exist, create a sample blog for testing
  if (blogs.length === 0 || idx === null || !blogs[idx]) {
    const sampleBlog = {
      title: "Sample Blog Post for Dark Mode Testing",
      author: "GrowCraft Team",
      date: new Date().toLocaleDateString(),
      content: "This is a sample blog post to test the dark mode functionality. When you toggle the dark mode button in the navbar, the entire page background should switch from light to dark mode.\n\nThe blog section container has its own dark mode styling, but the page background behind it should also switch to dark mode for a consistent user experience.\n\nIf you can see this text, the blog view is working correctly and you can now test the dark mode toggle button."
    };
    
    section.innerHTML = `
      <h2 class="blog-title" style="margin-bottom:10px; text-align:left;">${sampleBlog.title}</h2>
      <small class="blog-meta" style="display:block; margin-bottom:18px; color:#8492a6;">By ${sampleBlog.author} | ${sampleBlog.date}</small>
      <div class="blog-content" style="color:#293241; font-size:1.09rem; line-height:1.7;">${sampleBlog.content.replace(/\n/g, '<br>')}</div>
    `;
    return;
  }
  
  const blog = blogs[idx];
  section.innerHTML = `
    <h2 class="blog-title" style="margin-bottom:10px; text-align:left;">${blog.title}</h2>
    <small class="blog-meta" style="display:block; margin-bottom:18px; color:#8492a6;">By ${blog.author} | ${blog.date}</small>
    <div class="blog-content" style="color:#293241; font-size:1.09rem; line-height:1.7;">${blog.content.replace(/\n/g, '<br>')}</div>
  `;
};

