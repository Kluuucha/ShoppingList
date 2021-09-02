var shoppingLists = [{
    'id': 0,
    'listName': 'List Name #1',
    'itemList': [],
    'currentItemID': 0
},
{
    'id': 1,
    'listName': 'List Name #2',
    'itemList': [],
    'currentItemID': 0
}]

var currentListID = 0;

const listArea = document.getElementById('shopping-list-area');
const listElement = document.getElementById('shopping-list');

const newListButton = document.getElementById('button-add-list');
const resetListsButton = document.getElementById('button-reset');

function buildListContainer (l){
    let container = document.createElement('div');
    container.id = `shopping-list-${l.id}`;

    let title = document.createElement('h3');
    title.id = `${container.id}-title`;

    let view = document.createElement('div');
    view.id = `${container.id}-view`;

    let newItem = document.createElement('div');
    newItem.classList.add('input-group');
    newItem.classList.add('mb-3');

    let reset = document.createElement('button');
    reset.id = `${container.id}-button-reset`;
    reset.classList.add('btn');
    reset.classList.add('btn-outline-secondary');
    reset.appendChild(document.createTextNode("Reset list"));

    let del = document.createElement('button');
    del.id = `${container.id}-button-delete`;
    del.classList.add('btn');
    del.classList.add('btn-outline-secondary');
    del.appendChild(document.createTextNode("Delete list"));

    let field = document.createElement('input');
    field.id = `${container.id}-field-add`;
    field.setAttribute('type', 'text');
    field.setAttribute('placeholder', 'New element');
    field.classList.add('form-control');

    let add = document.createElement('button');
    add.id = `${container.id}-button-add`;
    add.classList.add('btn');
    add.classList.add('btn-outline-secondary');
    add.appendChild(document.createTextNode("Add"));

    view.addEventListener('change', (e) => changeItemStatus(l, e));
    add.addEventListener('click', function() {submitItem(l);});
    reset.addEventListener('click', function() {resetList(l);});

    newItem.appendChild(field);
    newItem.appendChild(add);
    container.appendChild(title);
    container.appendChild(view);
    container.appendChild(newItem);
    container.appendChild(reset);
    container.appendChild(del);

    return container;
}

function createItemElement (listID, item) {
    let element = document.createElement('div');
    element.classList.add('form-check');
    element.classList.add('shopping-element');
    element.id = `shopping-list-${listID}-item-${item.id}`;

    let checkbox = document.createElement('input');
    checkbox.classList.add('form-check-input');
    checkbox.id = `${element.id}-checkbox`;
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('data-list', listID);
    checkbox.setAttribute('data-item', item.id);
    checkbox.checked = item.checked;

    let label = document.createElement('label');
    label.classList.add('form-check-label');
    label.id = `${element.id}-label`;
    label.setAttribute('for', checkbox.id);

    let text = document.createTextNode(item.name);

    label.appendChild(text);
    element.appendChild(checkbox);
    element.appendChild(label);
    return element;
}

function changeItemStatus(l, e){
    e.preventDefault();
    if(e.target != e.currentTarget){
        item = l.itemList.find(t => findItem(t, e.target.getAttribute('data-item')));
        item.checked = !item.checked;
        console.log(`Current status of "${item.name}": ${item.checked}`);
    }
    saveLists();
}

function findItem(item, searchID){
    return item.id == searchID;
}

function clearChildNodes(parent) {
    parent.innerHTML = '';
}

function rebuildList(l){
    let listContainer = document.getElementById(`shopping-list-${l.id}`);
    let listHeader = listContainer.querySelector(`#shopping-list-${l.id}-title`);
    let listView = listContainer.querySelector(`#shopping-list-${l.id}-view`);

    clearChildNodes(listView);
    clearChildNodes(listHeader);
    listHeader.appendChild(document.createTextNode(l.listName));
    l.itemList.forEach(item => listView.appendChild(createItemElement(l.id, item)));
}

function getName(l){
    let listContainer = document.getElementById(`shopping-list-${l.id}`);
    let newItemField = listContainer.querySelector(`#shopping-list-${l.id}-field-add`);
    let name = newItemField.value;
    newItemField.value = '';
    return name;
}

function addItemToList(l){
    let submitedItem = {
        'id': l.currentItemID++,
        'name': getName(l),
        'checked': false
    }
    l.itemList.push(submitedItem);
}

function submitItem (l) {
    addItemToList(l);
    saveLists();
    rebuildList(l);
    console.log(`Current item count: ${l.itemList.length}`);
}

function resetList(l){
    l.itemList = [];
    l.currentItemID = 0;

    saveLists();
    rebuildList(l);
    console.log(`List reset.`);
}

function saveLists(){
    localStorage.setItem('shoppingLists', JSON.stringify(shoppingLists));
    localStorage.setItem('currentID', currentListID);
}

function loadLists(){
    shoppingLists = JSON.parse(localStorage.getItem('shoppingLists'));
    currentListID = Number(localStorage.getItem('currentID'));
}

function resetLists(){
    shoppingLists = [];
    currentListID = 0;

    saveLists();
    buildListArea();
    console.log(`Shopping lists cleared.`);
}

function buildListArea(){
    clearChildNodes(listArea);
    if('shoppingLists' in localStorage){
        loadLists();
        shoppingLists.forEach(l => listArea.appendChild(buildListContainer(l)));
        shoppingLists.forEach(l => rebuildList(l));
        console.log(`Lists loaded.`);
    }
    else saveLists();
}

function addList(){
    let submitedItem = {
        'id': currentListID++,
        'listName': getListName(),
        'itemList': [],
        'currentItemID': 0
    }
    shoppingLists.push(submitedItem);
}

function submitList () {
    addList();
    saveLists();
    buildListArea();
    console.log(`New list added.`);
}

function getListName(){
    let newListField = document.getElementById(`field-add-list`);
    let name = newListField.value;
    newListField.value = '';
    return name;
}

window.onload = function(){
    buildListArea();
}

newListButton.addEventListener('click', submitList);
resetListsButton.addEventListener('click', resetLists)
