window.addEventListener('load', () => {
  let sidebar = document.querySelector(".sidebar");
  let closeBtn = document.querySelector("#btn");
  const logoutBtn = document.getElementById('logout-btn');

  closeBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    menuBtnChange();
  });

  function menuBtnChange() {
    if (sidebar.classList.contains("open")) {
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
      closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
  }

  logoutBtn.addEventListener("click", (e) => {
    localStorage.removeItem("token");
    window.location.href = "/Login/login.html";
  });
});