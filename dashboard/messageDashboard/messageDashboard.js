document.addEventListener("DOMContentLoaded", function() {
  const messageTable = document.getElementById("messageTable");
  const messages = JSON.parse(localStorage.getItem("messages")) || [];

  // Function to populate the table with messages
  function populateTable() {
    const tbody = messageTable.querySelector("tbody");
    tbody.innerHTML = ""; // Clear existing rows

    messages.forEach((message, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${message.email}</td>
        <td>${message.subject}</td>
        <td>${message.message}</td>
        <td>${message.date}</td>
      `;
      tbody.appendChild(row);
    });
  }

  // Populate the table when the page loads
  populateTable();
});
