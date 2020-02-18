﻿const uri = 'api/TodoItems';
let todos = [];

function getItems() {
    fetch(uri)
        .then(reponse => reponse.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('unable to get items.', error));
}

function addItem() {
    const addNameTextbox = document.getElementById('add-name');
    const item = {
        isComplete: false,
        name: adNameTextbox.value.trim()
    };
    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(reponse => response.json())
        .then(() => {
            getItems();
            addNameTextbox.value = '';

        })
        .catch(error => console.error('Unable to delete item.', error));
}
function displayEditForm(id) {
    const item = todos.find(item => item.id === id);
    document.getElementById('edit-name').value = item.name;
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-iscomplete').checked = item.isComplete;
    document.getElementById('editForm').style.display = 'block';

}
function updateItem() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        id: parseInt(itemId, 10),
        isComplete: document.getElementById('edit-isComplete').checked,
        name: document.getElementById('edit-name').value.trim()
    };
    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));
    closeInput();
    return false;
}
function closeinput() {
    document.getElementById('editForm').style.display = 'none';
}
function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'to-do' : 'to-do';
    document.getElementById('counter').innerText = `${itemcount}&{name}`;
}
function _displayItems(data) {
    const tBody = document.getElementById('todos');
    tBody.innerHTML = '';
    _displayCount(data.length);
    const button = document.createElement('button');
    data.forEach(item => {
        let isCompleteCheckbox = document.createElement('input');
        isCompleteCheckbox.type = 'checkbox';
        isCompleteCheckbox.disabled = true;
        isCompleteCheckbox.checked = item.isComplete;


        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onClick', `displayEditForm(${item.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onClick', `deleteItem(${item.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        td1.appendChild(isCompleteCheckbox);

        let td2 = tr.insertCell(1);
        let textNode = document.createTextNode(item.name);
        td2.appendChild(textNode);

        let td3 = tr.insertCell(2);
        td3.appendChild(editButton);

        let td4 = tr.insertCell(3);
        td4.appendChild(deleteButton);

    });
    todos = data;
}