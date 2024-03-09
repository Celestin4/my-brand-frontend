import Base_URL from '../../API/api.js'

document.addEventListener("DOMContentLoaded", async function() {
  
  const messageTable = document.getElementById("messageTable");

  function displayMessages(messages) {
    const tbody = messageTable.querySelector("tbody");
    tbody.innerHTML = messages.map(message => `
      <tr>
        <td>${message.email}</td>
        <td>${message.subject}</td>
        <td>${message.message}</td>
        <td>${new Date(message.createdAt).toLocaleString()}</td>
      </tr>`).join('');
  }

  async function fetchMessagesFromBackend() {
    try {
      // Get the bearer token from local storage
      const token = localStorage.getItem('token');
  
      // If token is not available, redirect to login page
      if (!token) {
        window.location.href = '/login';
        return; // Stop further execution
      }
  
      // Fetch messages with authorization header
      const response = await fetch(`${Base_URL}/messages`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
  
      const data = await response.json();
      displayMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }
  
  // Call the function
  await fetchMessagesFromBackend();
   
});

