import { formatDate } from "./utils/formatDate";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const articlePage = document.querySelector(".article-page");
const token = localStorage.getItem("token");

const getArticleById = async () => {
  try {
    const name = localStorage.getItem("name");

    const response = await fetch(
      `https://v2.api.noroff.dev/blog/posts/${name}/${id}`
    );

    const result = await response.json();

    const banner = document.createElement("div");
    banner.className = "banner";

    banner.innerHTML = `
        <div class="banner">
        <div class="container">
          <h1>${result.data.title}</h1>
          <div class="article-meta">
           <img src="${result.data.author.avatar.url}" />
            <div class="info">
              <p class="author">${result.data.author.name}</p>
              <span class="date">${formatDate(result.data.created)}</span>
            </div>
            ${
              token
                ? ` <a href="/post/edit?id=${result.data.id}"><button class="btn btn-sm btn-outline-secondary" >
                <i class="ion-edit"></i> Edit Article
              </button></a> 
          <button class="btn btn-sm btn-outline-danger" onclick="deleteArticle()">
          <i class="ion-trash-a"></i> Delete Article
        </button>`
                : ""
            }
          </div>
        </div>
      </div>`;

    const container = document.createElement("div");
    container.className = "container";
    container.className = "page";
    container.innerHTML = `<div class="container page">
    <div class="row article-content">
      <div class="col-md-12">
        <p>${result.data.body}</p>

      </div>
    </div>
    <hr />
  </div>`;

    articlePage?.appendChild(banner);
    articlePage?.appendChild(container);
  } catch (error) {
    console.log(error);
  }
};

if (id) {
  getArticleById();
}
