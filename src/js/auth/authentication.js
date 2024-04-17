const userToken = localStorage.getItem("token");
const authenticatedElements = document.querySelectorAll("#authenticated");
const navElement = document.querySelector("#nav");

if (userToken) {
  authenticatedElements.forEach((element) => element.remove());
  const newArticleItem = document.createElement("li");
  newArticleItem.classList.add("nav-item");
  newArticleItem.innerHTML = `<a class="nav-link" href="/post/edit.html"> <i class="ion-gear-a"></i>&nbsp;New Article </a>`;

  const logoutItem = document.createElement("li");
  logoutItem.classList.add("nav-item");
  logoutItem.setAttribute("id", "logout");
  logoutItem.setAttribute("name", "logout");
  logoutItem.innerHTML = `<a class="nav-link" href="#"> <i class="ion-gear-a"></i>&nbsp;logout </a>`;

  navElement?.appendChild(newArticleItem);
  navElement?.appendChild(logoutItem);
}
