//Item-related code

class Item {
    constructor(id = 0, listId = 0, name = '', checked = false) {
        this.id = id;
        this.listId = listId;
        this.name = name;
        this.checked = checked;
    }
}

function buildItem(item) {
    let element = document.createElement('div');
    element.classList.add('form-check');
    element.classList.add('shopping-element');
    element.id = `shopping-list-${item.listId}-item-${item.id}`;

    let checkbox = document.createElement('input');
    checkbox.classList.add('form-check-input');
    checkbox.id = `${element.id}-checkbox`;
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('data-list', item.listId);
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
        let item = l.items.find(t => t.id == e.target.getAttribute('data-item'));
        item.checked = !item.checked;
        console.log(`Current status of "${item.name}": ${item.checked}`);
    }
    saveData();
}

//List-related code

class List {
    constructor(id = 0, name = '', items = [], current = 0) {
        this.id = id;
        this.name = name;
        this.items = items;
        this.current = current;
    }
}

function submitItemToList(l) {
    l.items.push(new Item(l.current++, l.id, getName(`shopping-list-${l.id}-field-add`)));
    saveData();
    refreshList(l);
    console.log(`Current item count: ${l.items.length}`);
}

function resetList(l){
    l.items = [];
    l.current = 0;

    saveData();
    refreshList(l);
    console.log(`List reset.`);
}

function refreshList(l){
    let listContainer = document.getElementById(`shopping-list-${l.id}`);
    let listHeader = listContainer.querySelector(`#shopping-list-${l.id}-title`);
    let listView = listContainer.querySelector(`#shopping-list-${l.id}-view`);

    clearChildNodes(listView);
    clearChildNodes(listHeader);
    listHeader.appendChild(document.createTextNode(l.name));
    l.items.forEach(item => listView.appendChild(buildItem(item)));
}

function buildList(l){
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
    add.addEventListener('click', function() {submitItemToList(l);});
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

//Catalog-related code

class Catalog {
    constructor(id = 0, lists = [], current = 0) {
        this.id = id;
        this.lists = lists;
        this.current = current;
    }
}



function resetCatalog(){
    catalog = new Catalog();
    saveData();
    buildCatalog();
    console.log(`Shopping lists cleared.`);
}

function buildCatalog(){
    clearChildNodes(listArea);
    if('shoppingLists' in localStorage){
        loadData();
        catalog.lists.forEach(l => listArea.appendChild(buildList(l)));
        catalog.lists.forEach(l => refreshList(l));
        console.log(`Lists loaded.`);
    }
    else saveData();
}

function addListToCatalog(){
    let submitedItem = {
        'id': catalog.current++,
        'listName': getName(`field-add-list`),
        'itemList': [],
        'currentItemID': 0
    }
    catalog.lists.push(submitedItem);
}

function submitListToCatalog() {
    catalog.lists.push(new List(catalog.current++, getName(`field-add-list`)));
    saveData();
    buildCatalog();
    console.log(`New list added.`);
}

//Utility

//TODO: change serialization method to allow saving class data

function saveData(){
    localStorage.setItem('catalog', JSON.stringify(catalog));
}

function loadData(){
    catalog = JSON.parse(localStorage.getItem('catalog'));
}

function clearChildNodes(parent) {
    parent.innerHTML = '';
}

function getName(idString){
    let newItemField = document.getElementById(idString);
    let name = newItemField.value;
    newItemField.value = '';
    return name;
}

//Event-related code

var catalog = new Catalog();

const listArea = document.getElementById('shopping-list-area');
const listElement = document.getElementById('shopping-list');

const newListButton = document.getElementById('button-add-list');
const resetListsButton = document.getElementById('button-reset');

window.onload = function(){
    buildCatalog();
}

newListButton.addEventListener('click', submitListToCatalog);
resetListsButton.addEventListener('click', resetCatalog)
