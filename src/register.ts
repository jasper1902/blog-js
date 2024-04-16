document
  .querySelector("form")
  ?.addEventListener("submit", async (e: { preventDefault: () => void }) => {
    try {
      e.preventDefault();
      const username = document.querySelector(
        "input[name='username']"
      ) as HTMLInputElement;
      const password = document.querySelector(
        "input[name='password']"
      ) as HTMLInputElement;
      const email = document.querySelector(
        "input[name='email']"
      ) as HTMLInputElement;

      const response = await fetch("https://v2.api.noroff.dev/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username?.value,
          password: password?.value,
          email: email?.value,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        alert(result.errors[0].message);
        return;
      }

      window.location.href = "/account/login";
    } catch (error) {
      console.error("Error registering user:", error);
    }
  });
