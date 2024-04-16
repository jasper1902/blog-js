import { formatDate } from "./utils/formatDate";
const feed = document.querySelector("#feed");

const getArticles = async () => {
  try {
    let name = "art12499";
    const response = await fetch(
      `https://v2.api.noroff.dev/blog/posts/${name}`
    );
    const result = await response.json();

    if (Array.isArray(result.data)) {
      result.data.forEach((article: any) => {
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
           <a href="/post?id=${article.id}" class="preview-link">
             <h1>${article.title}</h1>
             <p>${article.body}</p>
             <span>Read more...</span>
           </a>
        `;
        feed?.appendChild(articlePreview);
      });
    }
  } catch (error) {
    console.log(error);
  }
};

getArticles();
