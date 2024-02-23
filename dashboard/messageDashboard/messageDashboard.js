document.addEventListener("DOMContentLoaded", async function() {
  const messageTable = document.getElementById("messageTable");

  // Function to populate the table with messages
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
      const response = await fetch('http://localhost:3000/api/messages/getAllMessages');
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      const data = await response.json();
      displayMessages(data); // Display messages in the table
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }

  await fetchMessagesFromBackend(); 
});
