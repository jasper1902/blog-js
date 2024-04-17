addEventListener("load", () => {
  const logoutButton = document.querySelector("#logout") as HTMLButtonElement;
  if (logoutButton) {
    logoutButton.onclick = function () {
      localStorage.removeItem("token");
      window.location.href = "/account/login";
    };
  }
});
