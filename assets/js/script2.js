const form = document.getElementById("my-form");
const list = document.getElementById("list-items");
const itemInput = document.getElementById("item-input");
const priority = document.getElementById("select-priority");
const checkbox = document.getElementById("checkbox");


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
    const button = createButton("btn remove-item");

    li.appendChild(button);
    console.log(li);
    list.appendChild(li);
}

const createButton = (classes) =>{
    const button = document.createElement("button");
    button.className = classes;
    const icon = createIcon("fa fa-trash");
    button.appendChild(icon);
    return button;
}

const createIcon = (classes) =>{
    const icon = document.createElement("i");
    icon.className = classes;
    return icon;
}




// Event Listerners

form.addEventListener("submit", addItem);

