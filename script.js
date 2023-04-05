// Get the form element
const form = document.querySelector('form');

// Get the table element
const table = document.querySelector('table');

// Get the tbody element
const tbody = table.querySelector('tbody');

// Retrieve the saved data from localStorage
let savedData = JSON.parse(localStorage.getItem('tableData'));

// Initialize tableData with saved data or an empty array
let tableData = savedData || [];

// Function to save data to localStorage
function saveData() {
  localStorage.setItem('tableData', JSON.stringify(tableData));
}

// Render the existing data in the table
tableData.forEach((data, index) => {
  const newRow = tbody.insertRow();
  const cell1 = newRow.insertCell();
  const cell2 = newRow.insertCell();
  const cell3 = newRow.insertCell();
  const updateButton = document.createElement('button');
  updateButton.textContent = 'Update';
  updateButton.addEventListener('click', () => {
    // create popup
    const popup = document.createElement('div');
    popup.className = 'popup';

    // create new password input
    const newPasswordInput = document.createElement('input');
    newPasswordInput.type = 'text';
    newPasswordInput.placeholder = 'Enter new password';
    newPasswordInput.required = true;

    // create save button
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.addEventListener('click', () => {
      // update data
      const newPassword = newPasswordInput.value;
      const currentDate = new Date().toLocaleString();
      data.newPassword = newPassword;
      data.date = currentDate;

      // save updated data to localStorage
      saveData();

      // update table cell values
      cell2.textContent = newPassword;
      cell3.textContent = currentDate;

      // remove popup
      popup.remove();
    });

    // add inputs and button to popup
    popup.appendChild(newPasswordInput);
    popup.appendChild(saveButton);

    // add popup to page
    document.body.appendChild(popup);
  });
  cell1.textContent = data.websiteName;
  cell2.textContent = data.newPassword;
  cell3.textContent = data.date;
  cell3.appendChild(updateButton);
});

// Add event listener to form submit button
form.addEventListener('submit', (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the website name input value
  const websiteNameInput = document.querySelector('#websiteName');
  const websiteName = websiteNameInput.value;

  // Get the new password input value
  const newPasswordInput = document.querySelector('#newPassword');
  const newPassword = newPasswordInput.value;

  // Get the current date and time
  const date = new Date().toLocaleString();

  // Add the new data to tableData
  tableData.push({websiteName, newPassword, date});

  // Save the updated data to localStorage
  saveData();

  // Create a new row and append it to the tbody element
  const newRow = tbody.insertRow();
  const cell1 = newRow.insertCell();
  const cell2 = newRow.insertCell();
  const cell3 = newRow.insertCell();
  const updateButton = document.createElement('button');
  updateButton.textContent = 'Update';
  updateButton.addEventListener('click', () => {
    // create popup
    const popup = document.createElement('div');
    popup.className = 'popup';

    // create new password input
    const newPasswordInput = document.createElement('input');
    newPasswordInput.type = 'text';
    newPasswordInput.placeholder = 'Enter new password';
    newPasswordInput.required = true;

    // create save button
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.addEventListener('click', () => {
        // update data
        const newPassword = newPasswordInput.value;
        const currentDate = new Date().toLocaleString();
        const index = tableData.length - 1;
        tableData[index].newPassword = newPassword;
        tableData[index].date = currentDate;
      
        // save updated data to localStorage
        saveData();
      
        // update table cell values
        cell2.textContent = newPassword;
        cell3.textContent = currentDate;
      
        // remove popup
        popup.remove();
      });
      
      // add inputs and button to popup
      popup.appendChild(newPasswordInput);
      popup.appendChild(saveButton);
      
      // add popup to page
      document.body.appendChild(popup);
    });
    cell1.textContent = websiteName;
    cell2.textContent = newPassword;
    cell3.textContent = date;
    cell3.appendChild(updateButton);

    const deleteButton = document.createElement('button');
deleteButton.textContent = 'Delete';
deleteButton.addEventListener('click', () => {
  // Remove the row from the table
  tbody.removeChild(newRow);

  // Remove the data from tableData array
  tableData.splice(index, 1);

  // Save the updated data to localStorage
  saveData();
});
cell3.appendChild(deleteButton);
    
    // Reset the form inputs
    websiteNameInput.value = '';
    newPasswordInput.value = '';
    });
