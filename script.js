function displayContact(name, postnom, phone, group, email, details, imageData) {
  // Create a new div element for the contact
  var contactDiv = document.createElement("div");
  contactDiv.classList.add("contact");

  // Add the contact information and image to the div
  contactDiv.innerHTML = `
    <div>
      ${name ? `<p>Nom: ${name}</p>` : ""}
      ${postnom ? `<p>Postnom: ${postnom}</p>` : ""}
      ${phone ? `<p>Téléphone: ${phone}</p>` : ""}
      ${group ? `<p>Groupe: ${group}</p>` : ""}
      ${email ? `<p>Email: ${email}</p>` : ""}
      ${details ? `<p>Détails: ${details}</p>` : ""}
      ${imageData ? `<img src="${imageData}" alt="Image du contact">` : ""}
      <button class="edit-button">Modifier</button>
      <button class="delete-button">Supprimer</button>
    </div>
  `;

  // Append the contact div to the "partie_droite" div
  document.querySelector(".partie_droite").appendChild(contactDiv);

  // Add event listeners to the edit and delete buttons
  contactDiv.querySelector(".edit-button").addEventListener("click", function() {
    // TODO: Add code to edit the contact
  });
  contactDiv.querySelector(".delete-button").addEventListener("click", function() {
    // Remove the contact div from the page
    contactDiv.remove();

    // Remove the contact from local storage
    var contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    var index = contacts.findIndex(function(c) {
      return c.name === name && c.postnom === postnom && c.phone === phone && c.group === group && c.email === email && c.details === details && c.imageData === imageData;
    });
    if (index !== -1) {
      contacts.splice(index, 1);
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  });
}

function createContact() {
  // Get the values of the form inputs
  var name = document.getElementById("nom").value;
  var postnom = document.getElementById("postnom").value;
  var phone = document.getElementById("tel").value;
  var group = document.getElementById("groupe").value;
  var email = document.getElementById("myemail").value;
  var details = document.getElementById("detail").value;
  var image = document.getElementById("myimage").files[0];

  // Read the image file and get the data as a base64-encoded string
  var reader = new FileReader();
  reader.readAsDataURL(image);
  reader.onloadend = function() {
    // Get the image data as a base64-encoded string
    var imageData = reader.result;

    // Display the contact
    displayContact(name, postnom, phone, group, email, details, imageData);

    // Save the contact information to local storage
    var contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts.push({ name: name, postnom: postnom, phone: phone, group: group, email: email, details: details, imageData: imageData });
    localStorage.setItem("contacts", JSON.stringify(contacts));
  };
}

// Load the saved contacts from local storage when the page loads
window.addEventListener("load", function() {
  var contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  contacts.forEach(function(contact) {
    displayContact(contact.name, contact.postnom, contact.phone, contact.group, contact.email, contact.details, contact.imageData);
  });
});

// Get the form element
var form = document.querySelector("form");

// Add an event listener to the form that listens for the "submit" event
form.addEventListener("submit", function(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Create the contact
  createContact();
});

function saveContact(contactDiv) {
  // Get the edited contact information and image
  var name = document.getElementById("edit-nom").value;
  var postnom = document.getElementById("edit-postnom").value;
  var phone = document.getElementById("edit-tel").value;
  var group = document.getElementById("edit-groupe").value;
  var email = document.getElementById("edit-email").value;
  var details = document.getElementById("edit-details").value;
  var image = document.getElementById("edit-image").files[0];

  // Read the image file and get the data as a base64-encoded string
  var reader = new FileReader();
  reader.readAsDataURL(image);
  reader.onloadend = function() {
    // Get the image data as a base64-encoded string
    var imageData = reader.result;

    // Update the contact div with the new information and image
    contactDiv.innerHTML = `
      <div>
        <p>Nom: ${name}</p>
        <p>Postnom: ${postnom}</p>
        <p>Téléphone: ${phone}</p>
        <p>Groupe: ${group}</p>
        <p>Email: ${email}</p>
        <p>Détails: ${details}</p>
        <img src="${imageData}" alt="Image du contact">
        <button type="button" class="edit-button">Modifier</button>
        <button type="button" class="delete-button">Supprimer</button>
      </div>
    `;

    // Save the updated contact information to local storage
    var contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    var index = contacts.findIndex(function(c) {
      return c.name === name && c.postnom === postnom && c.phone === phone && c.group === group && c.email === email && c.details === details && c.imageData === imageData;
    });
    if (index !== -1) {
      contacts[index] = { name: name, postnom: postnom, phone: phone, group: group, email: email, details : details, imageData: imageData };
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }

    // Add an event listener to the contact div to allow it to be edited again
    contactDiv.addEventListener("click", function(event) {
      if (event.target.classList.contains("edit-button")) {
        editContact(contactDiv);
      } else if (event.target.classList.contains("delete-button")) {
        deleteContact(contactDiv);
      }
    });
  };
}


