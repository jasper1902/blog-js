addEventListener("load", () => {
  const logoutButton = document.querySelector("#logout");
  if (logoutButton) {
    logoutButton.onclick = function () {
      localStorage.removeItem("token");
      window.location.href = "/account/login.html";
    };
  }
});
