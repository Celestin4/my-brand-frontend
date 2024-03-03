import Base_URL from '../../API/api.js'

fetch(`${Base_URL}/users/listOfUsers/`)
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
        <td class="user-td" data-user-id="${user._id}">${user._id}</td>
        <td class="user-td">${user.fullName}</td>
        <td class="user-td">${user.role}</td>
        <td class="user-td">
          <button class="user-btn-delete" data-user-id="${user._id}">Delete</button>
        </td>
        <td class="user-td">
          <button class="user-btn-update" data-user-id="${user._id}">Update</button>
        </td>
      `;
      tableBody.appendChild(row);

      const updateBtn = row.querySelector('.user-btn-update');
      updateBtn.addEventListener('click', () => {
        const userId = user._id;
        console.log('Update button clicked for user:', userId);
        updateUser(userId);
      });

      const deleteBtn = row.querySelector('.user-btn-delete');
      deleteBtn.addEventListener('click', () => {
        const userId = user._id;
        console.log('Delete button clicked for user:', userId);
        deleteUser(userId);
      });
    });
}

function deleteUser(userId) {
    fetch(`${Base_URL}/users/deleteUser/${userId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        console.log(`User with ID ${userId} deleted successfully`);
      } else {
        throw new Error(`Failed to delete user with ID ${userId}`);
      }
    })
    .catch(error => {
      console.error('Error deleting user:', error.message);
    });
}

function updateUser(userId) {
    console.log('Update user with ID:', userId);
}
