document.querySelector("form")?.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    const password = document.querySelector("input[name='password']");
    const email = document.querySelector("input[name='email']");

    const response = await fetch("https://v2.api.noroff.dev/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password?.value,
        email: email?.value,
      }),
    });

    if (!response.ok) {
      const result = await response.json();
      alert(result.errors[0].message);
    }
    const result = await response.json();
    localStorage.setItem("token", result.data.accessToken);
    localStorage.setItem("name", result.data.name);
    window.location.href = "/index.html";
  } catch (error) {
    console.error("Error login user:", error);
  }
});
