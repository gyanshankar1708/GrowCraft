function toggleDarkMode() 
{
    const element1 = document.getElementById("main-body");
    console.log(document.getElementById('main-body'));
    element1.classList.toggle("dark");

  if (element1.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}

window.onload = function () {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }
}
