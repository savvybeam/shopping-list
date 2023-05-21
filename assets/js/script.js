
//create shopping items

//declare array to hold items temporarily
let shoppingItems = [];

function checkControlledArea() {
    const isEmptyList = shoppingItems.length === 0 ? true : false;
    const controlledSection = document.getElementById("controlled-area");
    isEmptyList ? controlledSection.style.display = "none" : controlledSection.style.display = "block";
}

checkControlledArea();


//get form data
//form id=my-form
const formObj = document.getElementById("my-form");

//declare object variables
let shoppingItem, itemValue, itemPriority, priorityValue;

// input id=item-input
//checkbox id=checkbox
shoppingItem = document.getElementById("item-input");
itemPriority = document.getElementById("checkbox");


const ul = document.getElementById("list-items");

// get shopping item value
const getShoppingItem = (e) => {
    itemValue = e.target.value;
}

shoppingItem.addEventListener("input", getShoppingItem);


//validate input

const validateInput = () => {
    if(itemValue === undefined || itemValue === ""){
        alert("Values cannot be empty");
        return false;
    }else{
        formObj.addEventListener("submit", addData); //if validation is okay, submit scales through, then add shipping item
    }
}

//Add Data
const addData = (e) => {
    //grab new field content

    e.preventDefault();

    // console.log(priorityValue);

    //create object from new data
    const shoppingItemObject = {
        itemName: itemValue === undefined ? "" : itemValue,
        priority: priorityValue === undefined ? false : true
    }

    //update shopping array
    shoppingItems.push(shoppingItemObject);

    checkControlledArea();

    // Load items into page
    displayList();

    shoppingItem.value = "";

    priorityValue = undefined;

}



const displayList = () => {
    // clear page for refreshed data
    ul.innerHTML = "";

    // Spit out the data list all over;
    shoppingItems.forEach((item) => {

        const text = document.createTextNode(item.itemName);
        const li = document.createElement("li");
        li.className = item.priority ? "list-item priority" : "list-item"


        const button = document.createElement("button");
        button.className = "btn remove-item";
        button.addEventListener("click", removeItem);

        const icon = document.createElement("i");
        icon.className = "fa fa-trash";

        button.appendChild(icon);

        li.appendChild(text);
        li.appendChild(button);
        ul.appendChild(li);

        // console.log(`from display function - ${item.itemName}:`,item.priority);

    });
}

frmBtn.addEventListener("click", validateInput);


// remove an Item from List

const removeItem = (e) => {

    // console.log("to be removed:", e.target.parentElement.innerText);

    const filtered = shoppingItems.filter((item) => {

        return item.itemName !== e.target.parentElement.innerText

    })

    shoppingItems = [];
    shoppingItems = filtered;

    // console.log(filtered);

    checkControlledArea();

    displayList();

}


// filter the list

//filterbox id=search-input

const searchField = document.getElementById("search-input");

const searchItem = (e) =>{

   
    const filteredItems = shoppingItems.filter( (item)=>{

        console.log(item.itemName.indexOf(e.target.value) === -1);
        
    } );



}

searchField.addEventListener("input", searchItem);


// clear shopping list

const clearShoppingList = () => {
    shoppingItems = [];

    checkControlledArea();

    displayList();
}

const clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", clearShoppingList);









