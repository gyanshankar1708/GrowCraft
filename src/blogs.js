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
      },
      {
        title: "Web Development : Fundamentals and Technologies in AI Era",
        author: "Vansh Garg",
        date: "October 07, 2025",
        content:`Web Development is the field of the creation of the website. But Web development is not limited to the implementation it has several stages as well. These stages are the part of the process and these stages includes planning , design , implementation or development , deployment and maintenance and testing. The backbone technologies of the Web Development are assumed to be HTML(Hypertext Markup Language), CSS(Cascading Style Sheets) and Js(Javascript). HTML is the markup language for the website which create the structure of the webpage. CSS provides the styles and designing to the elements of the HTML created the structure of the webpage. And Javascript provides the dynamic behaviour to the webpage and access the elements of the structure. The collection of the webpages is known as Website. 

Now a days, creators uses different frameworks and the Javascript library. One of the major library used by most of the programmers, web developers or creators is React js. React is one of the most popular and used library to build the reusable components for the website. React comes with different features to create more dynamic components. And Javascript is considered to be as the server side language as well as client side language. In the client side javascript language, we can also do DOM(Document Object Model) manipulation to change the element of the structure of the webpage of the website.

And databases are the most important component of the websites to store the information regarding different entities. The most famous and used databases are the Relational Database Management System(RDBMS) which we can utilize where we have tables for the different tables by writing the queries of the databases in SQL(Structured Query Language). But at present the people are using the document based databases where every document is the structure for the entities like tables in the RDBMS. One of the most used or popular Javascript based NoSQL(Not Only SQL) database where the databases have more power than SQL and have SQL features as well that is, MongoDB. 

Javascript is also known for server side scripting which is done by other frameworks like Express Js of the Node js. Node js is the runtime environment for the javascript where javascript could be run on the command line environment.  And Express Js simplifies the complexities of the Node Js. Based on routes path, different operations could be described as per the conditions what the developer wants to render to that page and how to render the elements on the page.

We have the DOM so that the Javascript could access the elements of the HTML and change the layout or content of the particular element. When the Developers use the React for the frontend creating components the browser create its own tree-like hierarchical structure which we call it as BOM(Browser Object Model) and this is created by the Browser to make the manipulation more easier. DOM is created by the Javascript in the Browser when the webpage is actually loading for the render of the page.
`

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
