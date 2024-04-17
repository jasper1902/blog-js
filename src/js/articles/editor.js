import { userName } from "../../utils/defaultValue.js";

const urlSearchParams = new URLSearchParams(window.location.search);
const articleIdParam = urlSearchParams.get("id");
const userToken = localStorage.getItem("token");

const formElement = document.querySelector("form");
const titleInputElement = formElement.querySelector("input[name='title']");
const bodyTextareaElement = formElement.querySelector("textarea[name='body']");
const tagListElement = document.querySelector(".tag-list");
const addTagButton = document.querySelector("#add-tag");
const tagInputElement = document.querySelector("#tag-input");

const selectedTags = [];

const API_BASE_URL = "https://v2.api.noroff.dev/blog/posts";

const fetchArticleDetails = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/${userName}/${articleIdParam}`
    );
    const articleDetails = await response.json();
    if (!response.ok) {
      alert(articleDetails.errors[0].message);
      return;
    }
    const { title, body, tags } = articleDetails.data;
    titleInputElement.value = title;
    bodyTextareaElement.value = body;
    tags.forEach((tag) => {
      addTagToDOM(tag);
      selectedTags.push(tag);
    });
    return articleDetails;
  } catch (error) {
    console.error("Error fetching article:", error);
  }
};

const addTagToDOM = (tag) => {
  const tagSpan = document.createElement("span");
  tagSpan.className = "tag-default tag-pill";
  tagSpan.textContent = tag;
  tagListElement.appendChild(tagSpan);
};

const handleFormSubmission = async (event) => {
  try {
    event.preventDefault();
    const title = titleInputElement.value;
    const body = bodyTextareaElement.value;

    const requestSettings = {
      method: articleIdParam ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({ title, body, tags: selectedTags }),
    };

    const apiUrl = articleIdParam
      ? `${API_BASE_URL}/${userName}/${articleIdParam}`
      : `${API_BASE_URL}/${userName}`;

    const response = await fetch(apiUrl, requestSettings);
    const result = await response.json();
    if (!response.ok) {
      alert(result.errors[0].message);
      return;
    }
    window.location.href = "/index.html";
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};

if (articleIdParam) {
  fetchArticleDetails();
}

formElement?.addEventListener("submit", handleFormSubmission);

const addTagToSelection = () => {
  const value = tagInputElement.value.trim();
  if (value) {
    addTagToDOM(value);
    selectedTags.push(value);
    tagInputElement.value = "";
  }
};

addTagButton.addEventListener("click", addTagToSelection);
