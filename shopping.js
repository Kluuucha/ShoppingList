var itemList = [];

const elementList = document.getElementById('shopping-list');
const newItemButton = document.getElementById('button-add-element');
const newItemField = document.getElementById('field-add-element');

function createItemElement (item) {
    let element = document.createElement('div');
    element.classList.add('form-check');
    element.classList.add('shopping-element');
    element.id = `item-${item.id}`;

    let checkbox = document.createElement('input');
    checkbox.classList.add('form-check-input');
    checkbox.id = `checkbox-${element.id}`;
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('data-item', item.id);
    checkbox.checked = item.checked;

    let label = document.createElement('label');
    label.classList.add('form-check-label');
    label.id = `label-${element.id}`;
    label.setAttribute('for', checkbox.id);

    let text = document.createTextNode(item.name);

    label.appendChild(text);
    element.appendChild(checkbox);
    element.appendChild(label);
    return element;
}

function changeItemStatus(e){
    e.preventDefault();
    if(e.target != e.currentTarget){
        item = itemList.find(t => findItem(t, e.target.getAttribute('data-item')));
        item.checked = !item.checked;
        console.log(`Current status of "${item.name}": ${item.checked}`);
    }
    saveList();
}

function findItem(item, searchID){
    return item.id == searchID;
}

function clearChildNodes(parent) {
    parent.innerHTML = '';
}

function rebuildList(){
    clearChildNodes(elementList);
    itemList.forEach(item => elementList.appendChild(createItemElement(item)))
}

function getName(){
    let name = newItemField.value;
    newItemField.value = '';
    return name;
}

function addItemToList(){
    let submitedItem = {
        'id': (itemList.length === 0 ? 0 : itemList[itemList.length - 1].id + 1),
        'name': getName(),
        'checked': false
    }
    itemList.push(submitedItem);
}

function submitItem () {
    addItemToList();
    rebuildList();
    console.log(`Current item count: ${itemList.length}`);
    saveList();
}

function saveList(){
    localStorage.setItem('itemList', JSON.stringify(itemList));
}

function loadList(){
    itemList = JSON.parse(localStorage.getItem('itemList'));
}

window.onload = function(){
    loadList();
    rebuildList();
}

newItemButton.addEventListener('click', submitItem);
elementList.addEventListener('change', (e) => changeItemStatus(e));
