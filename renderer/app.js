const { ipcRenderer } = require("electron")

// Dom Nodes
let showModal = document.getElementById('show-modal')
let closeModal = document.getElementById('close-modal')
let modal = document.getElementById('modal')
let addItem = document.getElementById('add-item')
let itemUrl = document.getElementById('url')

// Disable and enable modal buttons
const toggleModalButtons = () => {
    // check state
    if(addItem.disabled === true) {
        addItem.disabled = false;
        addItem.style.opacity = 1;
        addItem.innerText = 'Add Item';
        closeModal.style.display = 'inline'
    } else {
        addItem.disabled = true;
        addItem.style.opacity = 0.5;
        addItem.innerText = 'Adding...';
        closeModal.style.display = 'none'
    }
}

// Show modal
showModal.addEventListener('click', e=> {
    modal.style.display = 'flex'
    itemUrl.focus()
})

// Close modal
closeModal.addEventListener('click', e=> {
    modal.style.display = 'none'
})

// Handle new items being added

addItem.addEventListener('click', e => {
    //check a url exists
    if(itemUrl.value) {
        console.log(itemUrl.value)

        //Send new item url to main process
        ipcRenderer.send('new-item', itemUrl.value)

        //Disable the buttons
        toggleModalButtons()
    }
})

//Listen for new item from main process
ipcRenderer.on('new-item-success', (e, newItem) => {
    console.log(newItem)

    // Enable buttons
    toggleModalButtons()

    //Hide modal and clear input
    modal.style.display = 'none'
    itemUrl.value = ''
})

// Listen for keyboard submit
itemUrl.addEventListener('keyup', e => {
    if(e.key === 'Enter') addItem.click()
})