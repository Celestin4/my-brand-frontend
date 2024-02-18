function openAddNewPortfolioModal() {
  document.getElementById("addNewPortfolioModal").style.display = "block";

  document
    .getElementById("addBlogForm")
    .removeEventListener("submit", addPortfolioFormSubmitHandler);

  document
    .getElementById("addBlogForm")
    .addEventListener("submit", addPortfolioFormSubmitHandler);
}

function saveProject(project) {
  let projects = JSON.parse(localStorage.getItem("projects")) || [];
  projects.push(project);
  localStorage.setItem("projects", JSON.stringify(projects));
}

function getAllProjects() {
  return JSON.parse(localStorage.getItem("projects")) || [];
}

function updateProject(projectId, updatedProject) {
  let projects = JSON.parse(localStorage.getItem("projects")) || [];
  let index = projects.findIndex((project) => project.id === projectId);
  if (index !== -1) {
    projects[index] = updatedProject;
    localStorage.setItem("projects", JSON.stringify(projects));
  }
}

function deleteProject(projectId) {
  let projects = JSON.parse(localStorage.getItem("projects")) || [];
  let updatedProjects = projects.filter((project) => project.id !== projectId);
  localStorage.setItem("projects", JSON.stringify(updatedProjects));
}

function displayProjects() {
  let projects = getAllProjects();
  let portfolioWrapper = document.getElementById("portfolioWrapper");
  portfolioWrapper.innerHTML = "";
  projects.forEach((project) => {
    let projectCard = document.createElement("div");
    projectCard.classList.add("portfolio-card");
    projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <h3>${project.title}</h3>
            <a href="${project.githubLink}" class="portfolio-github-link">GitHub Link</a>
            <div class="portfolio-action-buttons">
                <button onclick="openUpdatePortfolioModal(${project.id})">Edit</button>
                <button onclick="deleteProjectHandler(${project.id})">Delete</button>
            </div>
        `;
    portfolioWrapper.appendChild(projectCard);
  });
}

function addPortfolioFormSubmitHandler(event) {
  event.preventDefault();
  const fileInput = document.getElementById("image");
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    let project = {
      id: Date.now(),
      image: event.target.result,
      title: document.getElementById("title").value,
      githubLink: document.getElementById("headline").value,
    };
    saveProject(project);
    closeAddNewPortfolioModal();
    displayProjects();
  };

  if (file) {
    reader.readAsDataURL(file);
  }
}

function openUpdatePortfolioModal(projectId) {
  document.getElementById("updatePortfolioModal").style.display = "block";

  let projects = getAllProjects();
  let projectToUpdate = projects.find((project) => project.id === projectId);

  document.getElementById("portfolioTitle").value = projectToUpdate.title;
  document.getElementById("githubLink").value = projectToUpdate.githubLink;

  let updateForm = document.getElementById("updateBlogForm");
  updateForm.removeEventListener("submit", null);

  updateForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const fileInput = document.getElementById("updateImage");
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      let updatedProject = {
        id: projectId,
        image: event.target.result,
        title: document.getElementById("portfolioTitle").value,
        githubLink: document.getElementById("githubLink").value,
      };
      updateProject(projectId, updatedProject);
      closeUpdatePortfolioModal();
      displayProjects();
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  });
}

function closeAddNewPortfolioModal() {
  document.getElementById("addNewPortfolioModal").style.display = "none";
}

function closeUpdatePortfolioModal() {
  document.getElementById("updatePortfolioModal").style.display = "none";
}

function deleteProjectHandler(projectId) {
  deleteProject(projectId);
  displayProjects();
}

window.onload = function () {
  displayProjects();
};
