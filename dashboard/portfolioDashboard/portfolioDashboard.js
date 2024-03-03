import Base_URL from '../../API/api.js'

const openAddNewPortfolioModal = document.getElementById('openAddNewPortfolioModal')
const portifolioList  = document.getElementById('portifolioList')
// Getting existing portfolio

async function getAllProjects() {
  try {
    const response = await fetch(`${Base_URL}/portfolios/getAllPortfolios`);
    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.status} ${response.statusText}`);
    }
    const projects = await response.json();
    return projects;
  } catch (error) {
    console.error('Error getting projects:', error);
    return []; // or throw error if needed
  }
}

// Dsiplaying all exisiting portfolio

function displayProjects() {
  getAllProjects().then(projects => {
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

  })
}



// Create  new portfolio 

openAddNewPortfolioModal.addEventListener('click', () => {
  document.getElementById("addNewPortfolioModal").style.display = "block";

  document
    .getElementById("addBlogForm")
    .removeEventListener("submit", addPortfolioFormSubmitHandler);

  document
    .getElementById("addBlogForm")
    .addEventListener("submit", addPortfolioFormSubmitHandler);
})


function addPortfolioFormSubmitHandler(event) {
  event.preventDefault();
  const fileInput = document.getElementById("image");
  const file = fileInput.files[0];

    let project = {
      id: Date.now(),
      image: file,
      title: document.getElementById("title").value,
      githubLink: document.getElementById("headline").value,
    };

    console.log(project);
    createNewPortfolio(project);
    displayProjects();
    closeAddNewPortfolioModal();

}

async function createNewPortfolio(project) {
  try {
    const response = await fetch(`http://localhost:3000/api/portfolios/createPortfolio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error saving project:', error);
  }
}


// Event delegation for update and delete buttons

document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("edit-project-btn")) {
    const index = event.target.dataset.index;
    const projectId = document.querySelector('.edit-project-btn').getAttribute('data-project-id');;
    console.log(projectId);
    openUpdatePortfolioModal(index, projectId);
  }
  if (event.target.classList.contains("delete-project-btn")) {
    const projectId = document.querySelector('.delete-project-btn').getAttribute('data-project-id');;
    console.log('id' + projectId);
    await deleterPoject(projectId);
  }
});



function closeAddNewPortfolioModal() {
  document.getElementById("addNewPortfolioModal").style.display = "none";
}

// Update a portfolio

const openUpdatePortfolioModal = async (index, projectId) => {
  document.getElementById("updatePortfolioModal").style.display = "block";

  try {
    let projects = await getAllProjects();
  
    // Find the project with the matching ID
    let projectToUpdate = projects.find((project) => project._id === projectId);
    console.log(projectToUpdate);

    // Check if the project was found
    if (!projectToUpdate) {
      console.error("Project not found");
      return;
    }

    // Set values in the modal
    document.getElementById("portfolioTitle").value = projectToUpdate.title;
    document.getElementById("githubLink").value = projectToUpdate.githubLink;

    let updateForm = document.getElementById("updateBlogForm");
    updateForm.removeEventListener("submit", null);

    updateForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      const fileInput = document.getElementById("updateImage");
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = async function (event) {
        let updatedProject = {
          id: projectId,
          image:"https://source.unsplash.com/random/50x50",
          title: document.getElementById("portfolioTitle").value,
          githubLink: document.getElementById("githubLink").value,
        };

        // Update the project
        await updateProject(projectId, updatedProject);
        closeUpdatePortfolioModal();
        displayProjects();
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    });

  } catch (error) {
    console.error("Error fetching projects:", error);
  }
}



async function updateProject(projectId, updatedProject) {
  try {
    const response = await fetch(`${Base_URL}/portfolios/updatePortfolio/${projectId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProject),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating project:', error);
  }
}

function closeUpdatePortfolioModal() {
  document.getElementById("updatePortfolioModal").style.display = "none";
}


async function deleterPoject(projectId) {
  let projects = await getAllProjects();
  const projectToDelete = projects.find((project) => project._id === projectId);
  console.log(projectToDelete);
  console.log(projectId);
  try {
    await fetch(`${Base_URL}/portfolios/deletePortfolio/${projectId}`, {
      method: 'DELETE',
    });
    displayProjects();
  } catch (error) {
    console.error('Error deleting project:', error.JSON());
  }
}


window.onload = function () {
  displayProjects();
};
