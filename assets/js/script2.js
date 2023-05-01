const form = document.getElementById("my-form");
const list = document.getElementById("list-items");
const itemInput = document.getElementById("item-input");
const priority = document.getElementById("select-priority");
const checkbox = document.getElementById("checkbox");
const clearBtn = document.getElementById("clearBtn");
const searchField = document.getElementById("search-input");


// functions

const addItem = (e) =>{
    e.preventDefault();

    if(itemInput.value === ""){
        alert("Item field cannot be empty!");
        return;
    }

    // collect form data
    const formData = new FormData(form);
    
    // build up list items
    const li = document.createElement("li");
    li.className = "list-item";
    li.textContent = formData.get("item-input");
    
    // create Button
    const button = createButton("remove-item deleteBtn");

    li.appendChild(button);
    list.appendChild(li);

    itemInput.value = "";

    checkUI();
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

const removeItem = (e) =>{
    if(e.target.parentElement.classList.contains("remove-item")){
        if(confirm("Are you sure?")){
            e.target.parentElement.parentElement.remove();
        }

        checkUI();
    }
}

const clearItems = () =>{
    while (list.firstChild){
        list.removeChild(list.lastChild)

        checkUI();
    }
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




// Event Listerners

form.addEventListener("submit", addItem);

list.addEventListener("click", removeItem);

clearBtn.addEventListener("click", clearItems);


checkUI();

