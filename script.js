// Targeting input boxces for taking value

let amount = document.getElementsByClassName("form-control")[0];

let item = document.getElementsByClassName("form-control")[1];

let button = document.getElementById("btn");

const addExpences = () => {
  let amountValue = amount.value;
  let itemValue = item.value;

  let expenceObject = {
    amountValue,
    itemValue,
  };
  // Convert the object to a string
  const jsonString = JSON.stringify(expenceObject);

  localStorage.setItem(expenceObject.itemValue, jsonString);

  // Reset the input box values
  amount.value = "";
  item.value = "";
  // Refresh the page
  location.reload();
};

const displayItems = () => {
  // Get the total number of items in localStorage
  let itemCount = localStorage.length;

  // Array to store all the keys
  let keys = [];

  // Iterate over each key and add it to the keys array
  for (let i = 0; i < itemCount; i++) {
    let key = localStorage.key(i);
    keys.push(key);
  }

  // Retrieve the values for each key
  let values = [];
  keys.forEach(function (key) {
    let value = JSON.parse(localStorage.getItem(key));
    values.push(value);
  });

  let ulElement = document.querySelector(".list-group");

  values.forEach(function (item) {
    let liElement = document.createElement("li");
    liElement.className = "list-group-item";
    liElement.textContent =
      "Item: " + item.itemValue + ", Amount: " + item.amountValue;

    // Create the delete button
    let delButton = document.createElement("button");

    // Set the button text
    delButton.appendChild(document.createTextNode("Delete"));

    // Set the button class
    delButton.className = "btn btn-info";

    // Set the button position to the right side
    delButton.style.float = "right";

    // Delete button function
    delButton.addEventListener("click", () => {
      // Remove item from local storage
      localStorage.removeItem(item.itemValue);

      // Remove the list item from the DOM
      ulElement.removeChild(liElement);
      location.reload();
    });

    // Append the button to the list item
    liElement.appendChild(delButton);

    // Append the list item to the list
    ulElement.appendChild(liElement);
  });

  const totalExpenses = () => {
    let sum = 0;
    values.forEach(function (item) {
      let amount = parseInt(item.amountValue);
      sum += amount;
    });
    document.getElementById('totalAmount').innerText = `Total : ${sum}`
  };

  totalExpenses();
};

button.addEventListener("click", () => {
  if (amount.value === "") {
    alert("Add amount Please");
  } else if (item.value === "") {
    alert("Add Items Please");
  } else {
    addExpences();
  }
});


displayItems();
