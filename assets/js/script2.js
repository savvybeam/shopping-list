const form = document.getElementById("my-form");
const list = document.getElementById("list-items");
const itemInput = document.getElementById("item-input");
const clearBtn = document.getElementById("clearBtn");
const searchField = document.getElementById("search-input");

let itemsFromStorage;
let isEditMode = false;

// functions

const displayItems = () =>{

    itemsFromStorage = getItemsFromStorage();

    if(localStorage.getItem("items") !== null ){
        Array.from(itemsFromStorage).forEach( (item) =>{
            addItemToDOM(item);
        })
    }
}


const getItemsFromStorage = () =>{

    if(localStorage.getItem("items") === null){
        itemsFromStorage = []; 
    }else{
        itemsFromStorage = JSON.parse(localStorage.getItem("items"))
    }

   return itemsFromStorage; 
}

const onAddItemSubmit = (e) =>{

    itemsFromStorage = getItemsFromStorage();

    e.preventDefault();

    if(itemInput.value === ""){
        alert("Item field cannot be empty!");
        return;
    }

    if(itemsFromStorage.includes(itemInput.value)){
        alert("Item already exists in the list")

        return;
    }

    //check if in edit mode

    if(isEditMode){
        const itemToEdit = list.querySelector(".editMode");
        itemToEdit.remove();
        removeItemFromStorage(itemToEdit.textContent);
    }

    // collect form data
    const formData = new FormData(form);

    let item = formData.get("item-input");

    addItemToDOM(item);

    addItemToStorage(item);
   
    itemInput.value = "";

    checkUI();
}


const addItemToDOM = (item) => {

     
    // build up list items
    const li = document.createElement("li");
    li.className = "list-item";
    li.textContent = item;
    
    // create Button
    const button = createButton("remove-item deleteBtn");

    li.appendChild(button);
    list.appendChild(li);

}


const addItemToStorage = (item) =>{

    itemsFromStorage = getItemsFromStorage();

    // check if item already exists
        itemsFromStorage.push(item);
        localStorage.setItem("items", JSON.stringify(itemsFromStorage));   

}

const createButton = (classes) =>{
    const button = document.createElement("button");
    button.className = classes;
    const icon = createIcon("fa fa-times");
    button.appendChild(icon);
    return button;
}

const createIcon = (classes) =>{
    const icon = document.createElement("i");
    icon.className = classes;
    return icon;
}


const onItemClicked = (e) =>{
    //if icon on button was clicked
    if(e.target.parentElement.classList.contains("remove-item")){
        removeItemFromUI(e.target.parentElement.parentElement)
    }else{
        //if list item was clicked
        setItemToEdit(e)
        
    }

}

const setItemToEdit = (item) =>{

    list
    .querySelectorAll("li")
    .forEach(i=>i.classList.remove("editMode"))

    isEditMode = true;
    item.target.classList.add("editMode");
    frmBtn.innerHTML = "<i class='fas fa-pen'></i> Update Item";
    frmBtn.style.backgroundColor = "green";
    itemInput.value = item.target.textContent;

}

const removeItemFromUI = (item) =>{
   
        if(confirm("Are you sure?")){

            //remove item from DOM/UI
            item.remove();

            //remove item from local storage 
            removeItemFromStorage(item.firstChild.textContent);

        }
                checkUI();
}


const removeItemFromStorage = (item) =>{
    itemsFromStorage = getItemsFromStorage();

    //mine
    // indexToRemove = itemsFromStorage.indexOf(item.target.parentElement.parentElement.firstChild.textContent);
    // itemsFromStorage.splice(indexToRemove, 1);

    //brad traversy
    itemsFromStorage = itemsFromStorage.filter(data => data !== item)
    
    localStorage.setItem("items",JSON.stringify(itemsFromStorage));


}

const clearItems = () =>{
    while (list.firstChild){
        list.removeChild(list.lastChild)
    }

    localStorage.removeItem("items");
    checkUI();
}

const checkUI = () =>{
   const allListsItems = document.querySelectorAll("li");

   if(allListsItems.length === 0){
        searchField.style.display = "none";
        clearBtn.style.display = "none";
    }else{
        searchField.style.display = "block";
        clearBtn.style.display = "block";
    };

    
}

const filterItems = (e) =>{

    const allListsItems = document.querySelectorAll("li");
    const text = e.target.value.toLocaleLowerCase();
    

    allListsItems.forEach( (item)=>{
        const itemValue = item.firstChild.textContent.toLocaleLowerCase();
        if(itemValue.indexOf(text) === -1){
            item.style.display = "none";
        }else{
            item.style.display = "flex";
        }
    })

}


// Event Listerners

form.addEventListener("submit", onAddItemSubmit);

list.addEventListener("click", onItemClicked);

clearBtn.addEventListener("click", clearItems);

searchField.addEventListener("input", filterItems);


// Onload Function Calls

displayItems();
checkUI();