import Base_URL from '../../API/api.js'

document.addEventListener("DOMContentLoaded", async function() {
  
  const messageTable = document.getElementById("messageTable");

  function displayMessages(messages) {
    const tbody = messageTable.querySelector("tbody");
    tbody.innerHTML = "";

    messages.forEach(message => {
        const row = createMessageRow(message);
        tbody.appendChild(row);
    });
}
function displayMessages(messages) {
  const tbody = messageTable.querySelector("tbody");
  tbody.innerHTML = "";

  messages.forEach(message => {
      const row = createMessageRow(message);
      tbody.appendChild(row);
  });
}

function createMessageRow(message) {
  const row = document.createElement('tr');
  row.innerHTML = `
      <td>${message.email}</td>
      <td>${message.subject}</td>
      <td>${message.message}</td>
      <td>${new Date(message.createdAt).toLocaleString()}</td>
      `;
      
      // <td><button class="reply-button" data-message-id="${message._id}">Reply</button></td>
  // const replyButton = row.querySelector('.reply-button');
  // replyButton.addEventListener('click', () => handleReply(message._id));

  return row;
}

function handleReply(messageId) {
 
  console.log(`Reply to message with ID: ${messageId}`);
}



  async function fetchMessagesFromBackend() {
    try {
      
const token = JSON.parse(localStorage.getItem('token'));
  
      if (!token) {
        window.location.href = '/login';
        return;
      }
  
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
  
  await fetchMessagesFromBackend();
   
});

