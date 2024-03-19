import Base_URL from "../../API/api.js";


const closeUpdatePortfolioModalBtn = document.getElementById("closeUpdatePortfolioModal");

closeUpdatePortfolioModalBtn.addEventListener("click", closeUpdatePortfolioModal())
const openAddNewPortfolioModal = document.getElementById(
  "openAddNewPortfolioModal"
);

async function getAllProjects() {
  try {
    const response = await fetch(`${Base_URL}/portfolio`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch projects: ${response.status} ${response.statusText}`
      );
    }
    const projects = await response.json();
    return projects;
  } catch (error) {
    console.error("Error getting projects:", error);
    return [];
  }
}

function displayProjects() {
  getAllProjects().then((projects) => {
    let portfolioWrapper = document.getElementById("portfolioWrapper");
    portfolioWrapper.innerHTML = "";
    projects.forEach((project, index) => {
      let projectCard = document.createElement("div");
      projectCard.classList.add("portfolio-card");
      projectCard.innerHTML = `
      <img src="http://localhost:3000/uploads/${project.image}" alt="Portfolio Image">
            <h3>${project.title}</h3>
            <a href="${project.githubLink}" class="portfolio-github-link">GitHub Link</a>
            <div class="portfolio-action-buttons">
                <button class="edit-project-btn" data-project-id="${project._id}" data-project-index="${index}">Edit</button>
                <button class="delete-project-btn" data-project-id="${project._id}" data-project-index="${index}">Delete</button>
            </div>
        `;
      portfolioWrapper.appendChild(projectCard);
    });
  });
}

openAddNewPortfolioModal.addEventListener("click", () => {
  document.getElementById("addNewPortfolioModal").style.display = "block";

  document
    .getElementById("addBlogForm")
    .addEventListener("submit", addPortfolioFormSubmitHandler);
});




function addPortfolioFormSubmitHandler(event) {
  event.preventDefault();
  const fileInput = document.getElementById("image");
  const file = fileInput.files[0];

  let project = new FormData();
  project.append("image", file);
  project.append("title", document.getElementById("title").value);
  project.append("githubLink", document.getElementById("headline").value);

  createNewPortfolio(project);

  closeAddNewPortfolioModal();
}

async function createNewPortfolio(project) {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    await fetch(`http://localhost:3000/api/portfolio`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: project,
    });
    displayProjects();
  } catch (error) {
    console.error("Error saving project:", error);
  }
}

document.addEventListener("click", async (event) => {
  const projectCard = event.target.closest(".portfolio-card");

  if (!projectCard) {
    return; // Clicked outside project card, exit early
  }

  const editButton = projectCard.querySelector(".edit-project-btn");
  const deleteButton = projectCard.querySelector(".delete-project-btn");

  if (event.target === editButton) {
    const projectId = editButton.dataset.projectId;
    openUpdatePortfolioModal(projectId);
  }

  if (event.target === deleteButton) {
    const projectId = deleteButton.dataset.projectId;
    await deleteProject(projectId);
  }
});

function closeAddNewPortfolioModal() {
  document.getElementById("addNewPortfolioModal").style.display = "none";
}

const openUpdatePortfolioModal = async (projectId) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const projectToUpdate = await fetchPortfolio(projectId, token);
    
    if (!projectToUpdate) {
      console.error("Project not found");
      return;
    }

    document.getElementById("portfolioTitle").value = projectToUpdate.title;
    document.getElementById("githubLink").value = projectToUpdate.githubLink;

    document.getElementById("updatePortfolioModal").style.display = "block";

    let updateForm = document.getElementById("updateBlogForm");
    updateForm.removeEventListener("submit", null);

    updateForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      const fileInput = document.getElementById("updateImage");
      const file = fileInput.files[0];

      let updatedProject = new FormData();
      updatedProject.append("updatedImage", file);
      updatedProject.append("title", document.getElementById("portfolioTitle").value);
      updatedProject.append("githubLink", document.getElementById("githubLink").value);

      await updateProject(projectId, updatedProject, token);
      closeUpdatePortfolioModal();
      displayProjects();
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
};

async function fetchPortfolio(projectId, token) {
  try {
    const response = await fetch(`${Base_URL}/portfolio/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return null;
  }
}

async function updateProject(projectId, updatedProject, token) {
  try {
    const response = await fetch(`${Base_URL}/portfolio/${projectId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: updatedProject,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating project:", error);
  }
}

function closeUpdatePortfolioModal() {
  document.getElementById("updatePortfolioModal").style.display = "none";
}

async function deleteProject(projectId) {
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    await fetch(`${Base_URL}/portfolio/${projectId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    displayProjects();
  } catch (error) {
    console.error("Error deleting project:", error);
  }
}

window.onload = function () {
  displayProjects();
};
