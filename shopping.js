const list = document.getElementById('shopping-list')
const submit_item_button = document.getElementById('button-add-element')
const item_field = document.getElementById('field-add-element')

function submit_item () {
    var item = document.createElement('DIV')
    item.classList.add('form-check')
    item.classList.add('shopping-element')

    var checkbox = document.createElement('INPUT')
    checkbox.classList.add('form-check-input')
    checkbox.id = 'flexCheckIndeterminate'
    checkbox.setAttribute('type', 'checkbox')

    var label = document.createElement('LABEL')
    label.classList.add('form-check-label')
    label.setAttribute('for', 'flexCheckIndeterminate')

    var text = document.createTextNode(item_field.value)

    item_field.value = ''

    label.appendChild(text)
    item.appendChild(checkbox)
    item.appendChild(label)
    document.getElementById('shopping-list').appendChild(item)
}

submit_item_button.addEventListener('click', submit_item)