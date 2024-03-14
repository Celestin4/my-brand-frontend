import Base_URL from '../../API/api.js';

const token = JSON.parse(localStorage.getItem('token'));

function fetchUsers() {
  try {
    if (token) {
      fetch(`${Base_URL}/users/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch users');
        }
      })
      .then(users => {
        console.log('List of users:', users);
        renderUserData(users);
      })
      .catch(error => {
        console.error('Error fetching users:', error.message);
      });
    } else {
      console.error('Token not found in local storage');
    }
  } catch (error) {
    console.error('Error accessing local storage:', error.message);
  }
}

function renderUserData(users) {
  console.log(users);
  const tableBody = document.getElementById('user-table-body');
  tableBody.innerHTML = '';

  users.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="user-td"><input type="checkbox" /></td>
      <img
        src="https://source.unsplash.com/random/50x50"
        alt="Avatar"
        class="user-avatar"
      />
      <td class="user-td">${user.fullName}</td>
      <td class="user-td">${user.email}</td>
      <td class="user-td">${user.role}</td>
      <td class="user-td">
        <button class="user-btn-delete" data-user-id="${user._id}">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);

    const deleteBtn = row.querySelector('.user-btn-delete');
    deleteBtn.addEventListener('click', () => {
      const userId = user._id;
      console.log('Delete button clicked for user:', userId);
      deleteUser(userId);
    });
  });
}

function deleteUser(userId) {
  if (confirm("Are you sure you want to delete this user?")) {
    fetch(`${Base_URL}/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (response.ok) {
        console.log(`User with ID ${userId} deleted successfully`);
        fetchUsers();
      } else {
        throw new Error(`Failed to delete user with ID ${userId}`);
      }
    })
    .catch(error => {
      console.error('Error deleting user:', error.message);
    });
  } else {
    console.log("Deletion canceled by user.");
  }
}


// function updateUser(userId) {
//   console.log('Update user with ID:', userId);
// }

fetchUsers();
