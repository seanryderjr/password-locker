const form = document.querySelector('form');
const table = document.querySelector('table');
const tbody = table.querySelector('tbody');
let savedData = JSON.parse(localStorage.getItem('tableData'));
let tableData = savedData || [];

function saveData() {
  localStorage.setItem('tableData', JSON.stringify(tableData));
}

function createRow(data, index) {
  const newRow = tbody.insertRow();
  const cell1 = newRow.insertCell();
  const cell2 = newRow.insertCell();
  const cell3 = newRow.insertCell();
  const updateButton = document.createElement('button');
  updateButton.textContent = 'Update';
  updateButton.addEventListener('click', () => {
    const popup = document.createElement('div');
    popup.className = 'popup';
    const newPasswordInput = document.createElement('input');
    newPasswordInput.type = 'text';
    newPasswordInput.placeholder = 'Enter new password';
    newPasswordInput.required = true;
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.addEventListener('click', () => {
      const newPassword = newPasswordInput.value;
      const currentDate = new Date().toLocaleString();
      data.newPassword = newPassword;
      data.date = currentDate;
      saveData();
      cell2.textContent = newPassword;
      cell3.textContent = currentDate;
      popup.remove();
    });
    popup.appendChild(newPasswordInput);
    popup.appendChild(saveButton);
    document.body.appendChild(popup);
  });
  cell1.textContent = data.websiteName;
  cell2.textContent = data.newPassword;
  cell3.textContent = data.date;
  cell2.appendChild(updateButton);
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    tbody.removeChild(newRow);
    tableData.splice(index, 1);
    saveData();
  });
  cell3.appendChild(deleteButton);
}

tableData.forEach((data, index) => {
  createRow(data, index);
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const websiteNameInput = document.querySelector('#websiteName');
  const websiteName = websiteNameInput.value;
  const newPasswordInput = document.querySelector('#newPassword');
  const newPassword = newPasswordInput.value;
  const date = new Date().toLocaleString();
  tableData.push({ websiteName, newPassword, date });
  saveData();
  createRow({ websiteName, newPassword, date }, tableData.length - 1);
  websiteNameInput.value = '';
  newPasswordInput.value = '';
});
