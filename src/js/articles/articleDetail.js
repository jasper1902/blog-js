import { formatDate } from "../../utils/formatDate.js";
import { userName } from "../../utils/defaultValue.js";

const searchParams = new URLSearchParams(window.location.search);
const articleId = searchParams.get("id");
const articlePageElement = document.querySelector(".article-page");
const userToken = localStorage.getItem("token");

const API_URL = "https://v2.api.noroff.dev/blog/posts";

const fetchArticleById = async () => {
  try {
    const response = await fetch(`${API_URL}/${userName}/${articleId}`);

    const articleDetail = await response.json();
    const bannerElement = document.createElement("div");
    bannerElement.className = "banner";

    bannerElement.innerHTML = `
      <div class="banner">
        <div class="container">
          <h1>${articleDetail.data.title}</h1>
          <div class="article-meta">
            <img src="${articleDetail.data.author.avatar.url}" />
            <div class="info">
              <p class="author">${articleDetail.data.author.name}</p>
              <span class="date">${formatDate(
                articleDetail.data.created
              )}</span>
            </div>
            ${
              userToken
                ? ` <a href="/post/edit.html?id=${articleDetail.data.id}"><button class="btn btn-sm btn-outline-secondary" >
                    <i class="ion-edit"></i> Edit Article
                  </button></a> 
                  <button class="btn btn-sm btn-outline-danger" id="deleteBtn" name="deleteBtn">
                    <i class="ion-trash-a"></i> Delete Article
                  </button>`
                : ""
            }
          </div>
        </div>
      </div>`;

    const articleContainerElement = document.createElement("div");
    articleContainerElement.className = "container page";
    articleContainerElement.innerHTML = `
      <div class="container page">
        <div class="row article-content">
          <div class="col-md-12">
            <p>${articleDetail.data.body}</p>
            <ul class="tag-list">
            ${articleDetail.data.tags.map((tag) => {
              return `<li class="tag-default tag-pill tag-outline">${tag}</li>`;
            })}
          </ul>
            
          </div>
        </div>
        <hr />
      </div>`;

    articlePageElement?.appendChild(bannerElement);
    articlePageElement?.appendChild(articleContainerElement);

    if (userToken) {
      const deleteBtn = document.querySelector("#deleteBtn");
      deleteBtn.onclick = deleteArticle;
    }
  } catch (error) {
    console.log(error);
  }
};

if (articleId) {
  fetchArticleById();
}

const deleteArticle = async () => {
  try {
    const response = await fetch(`${API_URL}/${userName}/${articleId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });
    if (response.status === 204) {
      return (window.location.href = "/index.html");
    }
    const result = await response.json();
    alert(result.errors[0].message);
  } catch (error) {
    console.log(error);
  }
};
