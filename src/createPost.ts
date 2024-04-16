document
  .querySelector("form")
  ?.addEventListener("submit", async (e: { preventDefault: () => void }) => {
    try {
      e.preventDefault();
      const title = document.querySelector(
        "input[name='title']"
      ) as HTMLInputElement;
      const body = document.querySelector(
        "textarea[name='body']"
      ) as HTMLTextAreaElement;

      const name = localStorage.getItem("name");
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://v2.api.noroff.dev/blog/posts/${name}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: title?.value,
            body: body?.value,
          }),
        }
      );
      const result = await response.json();
      if (!response.ok) {
        alert(result.errors[0].message);
        return;
      }

      window.location.href = "/";
    } catch (error) {
      console.error("Error login user:", error);
    }
  });
