// Variables
const urlSearchParams = new URLSearchParams(window.location.search);
const articleIdParam = urlSearchParams.get("id");
const authToken = localStorage.getItem("token");
const userName = localStorage.getItem("name");

const titleInput = document.querySelector(
  "input[name='title']"
) as HTMLInputElement;
const bodyTextarea = document.querySelector(
  "textarea[name='body']"
) as HTMLTextAreaElement;
const form = document.querySelector("form");

const API_URL = "https://v2.api.noroff.dev/blog/posts";

// Functions
const fetchArticle = async () => {
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/blog/posts/${userName}/${articleIdParam}`
    );
    const result = await response.json();
    if (!response.ok) {
      alert(result.errors[0].message);
      return;
    }
    titleInput.value = result.data.title;
    bodyTextarea.value = result.data.body;
    return result;
  } catch (error) {
    console.log(error);
  }
};

const handleSubmit = async (event: { preventDefault: () => void }) => {
  try {
    event.preventDefault();
    const title = titleInput.value;
    const body = bodyTextarea.value;

    const requestOptions: RequestInit = {
      method: articleIdParam ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        title,
        body,
      }),
    };

    const url = articleIdParam
      ? `${API_URL}/${userName}/${articleIdParam}`
      : `${API_URL}/${userName}`;

    const response = await fetch(url, requestOptions);
    const result = await response.json();
    if (!response.ok) {
      alert(result.errors[0].message);
      return;
    }
    window.location.href = "/";
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};

// Event Listeners
if (articleIdParam) {
  fetchArticle();
}

form?.addEventListener("submit", handleSubmit);
