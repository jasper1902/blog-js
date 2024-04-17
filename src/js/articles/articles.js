import { formatDate } from "../../utils/formatDate.js";
import { userName } from "../../utils/defaultValue.js";
const feed = document.querySelector("#feed");

const urlSearchParams = new URLSearchParams(window.location.search);
const currentPage = urlSearchParams.get("page");
let page = parseInt(currentPage, 10);
page = !page || page < 1 ? 1 : page;

const getArticles = async () => {
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/blog/posts/${userName}?limit=5&page=${page}`
    );
    const result = await response.json();
    if (!response.ok) return alert(result.errors[0].message);

    if (Array.isArray(result.data)) {
      result.data.forEach((article) => {
        const articlePreview = document.createElement("div");
        articlePreview.className = "article-preview";
        articlePreview.innerHTML = `
      
         <div class="article-meta">
         <img src="${article.author.avatar.url}" />
             <div class="info">
              <p>${article.author.name}</p>
               <span class="date">${formatDate(article.created)}</span>
             </div>
    
           </div>
           <a href="/post.html?id=${article.id}" class="preview-link">
             <h1>${article.title}</h1>
             <p>${article.body}</p>
             <span>Read more...</span>
             <ul class="tag-list">
              ${article.tags.map((tag) => {
                return `<li class="tag-default tag-pill tag-outline">${tag}</li>`;
              })}
            </ul>
           </a>
        `;
        feed?.appendChild(articlePreview);
      });
      const pagination = document.createElement("ul");
      pagination.className = "pagination";

      Array.from({ length: result.meta.pageCount }).forEach((_, index) => {
        const liElement = document.createElement("li");
        liElement.className = "page-item";

        if (page === index + 1) {
          liElement.className = "page-item active";
        }

        const aElement = document.createElement("a");
        aElement.className = "page-link";
        aElement.innerHTML = index + 1;
        aElement.href = `/index.html?page=${index + 1}`;

        liElement.appendChild(aElement);
        pagination.appendChild(liElement);
        feed?.appendChild(pagination);
      });
    }

    if (result.data.length <= 0) {
      feed.innerHTML = "No Article";
    }
  } catch (error) {
    console.log(error);
  }
};

getArticles();
