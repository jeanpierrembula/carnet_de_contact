let contacts = [];
let lisfOfTel = [];
let listOfEmail = [];
let editingIndex = null; // variable pour stocker l'index du contact en cours d'édition
const error = document.createElement("p");

// Get the form and contact container elements
const form = document.getElementById("form");
const contactContainer = document.getElementById("contactContainer");

//Ajouter un message d'erreur
const errortel = document.createElement("p");
const nameError = document.createElement("p") 
const firstNameError = document.createElement("p") 

//mail validation
function isValidEmail(email) {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Fonction pour valider le numéro de téléphone
function isValidTel(tel) {
  let pattern = /^(080|081|082|083|084|085|090|097|099)\d{7}$/;
  return pattern.test(tel);
}

// Fonction pour valider le nom
function isValidName(nom) {
  let nm = /^[a-zA-Z]{3,50}$/;
  return nm.test(nom);
}

function isFirstNameValid(firstName) {
  let rn = /^[a-zA-Z]{3,50}$/;
  return rn.test(firstName)
}



// Get form data
function getFormData() {
  const postnom = document.getElementById("postnom").value;
  const nom = document.getElementById("nom").value;
  const tel = document.getElementById("tel").value;
  const groupe = document.getElementById("groupe").value;
  const email = document.getElementById("email").value;
  const detail = document.getElementById("detail").value;

  // Create a new contact object
  const newContact = {
    postnom: postnom,
    nom: nom,
    tel: tel,
    groupe: groupe,
    email: email,
    detail: detail,
  };


  if (!postnom || !nom || !tel || !groupe || !email) {
    error.innerHTML = "All fields are required";
    error.style.color = "red";
    error.style.marginLeft = "5%";
    error.id = "error-message";
    document.getElementById("form").appendChild(error);
  }

  // || !(newContact.email) || (lisfOfTel.includes(tel)) || !(newContact.tel) || !(isValidName)

  if (editingIndex === null) {
    if (listOfEmail.includes(email) || !isFirstNameValid(email)){
      emailInput.style.borderColor = 'red';
      //Ajouter un message d'erreur
      error.innerHTML = "Adresse e-mail ou Numero de telephone existant";
      error.style.color = "red";
      error.style.marginLeft = "5%";
      error.id = "email-error";
      document.getElementById("form").appendChild(error);
   } else{
    contacts.push(newContact);
    lisfOfTel.push(newContact["tel"])
    listOfEmail.push(newContact["email"])
    console.log(listOfEmail)
     // Si l'adresse email est valide, changer la bordure en vert
     emailInput.style.border = 'black';
     // Supprimer le message d'erreur
     const error = document.getElementById("email-error")
     error?.remove();
    }
    
  } else {
    contacts[editingIndex] = newContact;
  }
  editingIndex = null;
}

// Render the contacts in the contact container
function renderContacts() {
  contactContainer.innerHTML = "";
  for (let i = 0; i < contacts.length; i++) {
    // Create a new contact element
    const contact = document.createElement("div");
    contact.classList.add("contact");
    contact.innerHTML = `
    <div class="contacimg"></div>
    <div class="contactdesc">
      <div class="groupe1">
      <p>${contacts[i].postnom} ${contacts[i].nom} ${contacts[i].groupe}</p>
      <p><button class="edit-btn">Edit</button> <button class="delete-btn">Delete</button></p>
      </div>
      <p>${contacts[i].tel}</p>
      <p>${contacts[i].email}</p>
      <p>${contacts[i].detail}</p>
    </div>
    `;
    // Append the contact element to the container
    contactContainer.appendChild(contact);

    // handle delete button 
    const deleteBtn = contact.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", (e) => {
      // remove the contact from the array
      contacts.splice(i, 1);
      renderContacts();
    });

    // handle edit button 
    const editBtn = contact.querySelector(".edit-btn");
    editBtn.addEventListener("click", (e) => {
      // populate the form with the contact data
      document.getElementById("postnom").value = contacts[i].postnom;
      document.getElementById("nom").value = contacts[i].nom;
      document.getElementById("tel").value = contacts[i].tel;
      document.getElementById("groupe").value = contacts[i].groupe;
      document.getElementById("email").value = contacts[i].email;
      document.getElementById("detail").value = contacts[i].detail;

      editingIndex = i; // enregistrer l'index du contact en cours d'édition
    });
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getFormData();
  renderContacts();
  form.reset()
});

const emailInput = document.querySelector('#email');
emailInput.addEventListener('input', function(){
  // Vérifier si le contenu du champ email correspond à un format valide d'adresse email
  if(!isValidEmail(emailInput.value)){
      // Si l'adresse email est invalide, changer la bordure en rouge
      emailInput.style.borderColor = 'red';
      //Ajouter un message d'erreur
      error.innerHTML = "Veuillez saisir une adresse e-mail valide";
      error.style.color = "red";
      error.style.marginLeft = "5%";
      error.id = "email-error";
      emailInput.parentNode.appendChild(error);
  }else{
      // Si l'adresse email est valide, changer la bordure en noir
      emailInput.style.borderColor = 'black';
      // Supprimer le message d'erreur
      const error = document.getElementById("email-error")
      error?.remove();
  }
});
// Cibler le champ téléphone
const phoneInput = document.querySelector('#tel');
// Déclarer un élément pour afficher l'erreur
// const errortel = document.createElement('p');

// Écouter l'événement input
phoneInput.addEventListener('input', function(){
    // Vérifier si la valeur saisie est un nombre valide
    if(!isValidTel(phoneInput.value)){
        // Si la valeur saisie n'est pas un nombre, changer la bordure en rouge
        phoneInput.style.borderColor = 'red';
        errortel.innerHTML = "Ce n'est pas un numéro de téléphone valide";
        errortel.style.borderColor = "red";
        errortel.style.color="red"
        errortel.style.marginLeft = "5%";
        errortel.id = "phone-error";
        phoneInput.parentNode.appendChild(errortel);
     } else{
    // Si l'adresse email est valide, changer la bordure en noir
    phoneInput.style.borderColor = 'black';
    // Supprimer le message d'erreur
    const errortel = document.getElementById("phone-error");
    errortel?.remove();
    }
});


const nameInput = document.querySelector('#nom')

nameInput.addEventListener('input', function(){
  if (!isValidName(nameInput.value)) {
    nameError.innerHTML = "le nom doit être composé de 3 à 5 caractères"
    nameInput.style.borderColor = "red";
    nameError.style.color = "red"
    nameError.style.marginLeft = "5%";
    nameError.id = "name-error";
    nameInput.parentNode.appendChild(nameError);
  } else {
    nameInput.style.borderColor = 'black';
    const error = document.getElementById("name-error");
    error?.remove();
  }
})


const firstName = document.querySelector("#postnom")

firstName.addEventListener("input", function(){
  if (!isFirstNameValid(firstName.value)){
    firstNameError.innerHTML = "le prénom doit être composé de 3 à 5 caractères"
    firstNameError.style.color = "red"
    firstName.style.borderColor = "red"
    firstNameError.style.marginLeft = "5%";
    firstNameError.id = "firstName";
    firstName.parentNode.appendChild(firstNameError)
  } else {
    firstName.style.borderColor = 'black';
    const error = document.getElementById("firstName");
    error?.remove();
  }
})