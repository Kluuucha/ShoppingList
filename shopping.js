const itemList = [];

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

    let label = document.createElement('label');
    label.classList.add('form-check-label');
    label.setAttribute('for', checkbox.id);

    let text = document.createTextNode(item.name);

    label.appendChild(text);
    element.appendChild(checkbox);
    element.appendChild(label);
    return element;
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
        'id': itemList.length,
        'name': getName()
    }
    itemList.push(submitedItem);
}

function submitItem () {
    addItemToList();
    rebuildList();
    console.log(`Current item count: ${itemList.length}`);
}

newItemButton.addEventListener('click', submitItem);
