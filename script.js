<<<<<<< HEAD
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
  
    // Validate the form data
    if (!postnom || !nom || !tel || !groupe || !email) {
      error.innerHTML = "All fields are required";
      error.style.color = "red";
      error.style.marginLeft = "5%";
      error.id = "error-message";
      form.appendChild(error);
      return;
    }
  
    if (!isValidEmail(email)) {
      emailInput.style.borderColor = 'red';
      //Ajouter un message d'erreur
      error.innerHTML = "Adresse e-mail non valide";
      error.style.color = "red";
      error.style.marginLeft = "5%";
      error.id = "email-error";
      form.appendChild(error);
      return;
    }
  
    if (!isValidTel(tel)) {
      telInput.style.borderColor = 'red';
      //Ajouter un message d'erreur
      errortel.innerHTML = "Numero de telephone non valide";
      errortel.style.color = "red";
      errortel.style.marginLeft = "5%";
      errortel.id = "tel-error";
      form.appendChild(errortel);
      return;
    }
    
    if (!isValidName(nom)) {
      nameInput.style.borderColor = 'red';
      //Ajouter un message d'erreur
      nameError.innerHTML = "Nom non valide";
      nameError.style.color = "red";
      nameError.style.marginLeft = "5%";
      nameError.id = "name-error";
      form.appendChild(nameError);
      return;
    }
  
    if (!isFirstNameValid(postnom)) {
      firstNameInput.style.borderColor = 'red';
      //Ajouter un message d'erreur
      firstNameError.innerHTML = "Prénom non valide";
      firstNameError.style.color = "red";
      firstNameError.style.marginLeft = "5%";
      firstNameError.id = "firstName-error";
      form.appendChild(firstNameError);
      return;
    }
  
    if (editingIndex === null) {
      if (listOfEmail.includes(email) || (lisfOfTel.includes(tel))) {
        emailInput.style.borderColor = 'red';
        //Ajouter un message d'erreur
        error.innerHTML = "Adresse e-mail ou Numero de telephone existant";
        error.style.color = "red";
        error.style.marginLeft = "5%";
        error.id = "email-error";
        form.appendChild(error);
        return;
     } else {
      contacts.push(newContact);
      lisfOfTel.push(newContact["tel"])
      listOfEmail.push(newContact["email"])
      console.log(listOfEmail)
       // Si l'adresse email est valide, changer la bordure en vert
       emailInput.style.borderColor = 'green';
       nameInput.style.borderColor = 'green';
       firstNameInput.style.borderColor = 'green';
       telInput.style.borderColor = 'green';
       // Supprimer le message d'erreur
       const error = document.getElementById("email-error");
       error?.remove();
       // Clear form
       form.reset();
       // Update the contact list
       updateContactList();
      }
    } else {
      // Update the existing contact
      contacts[editingIndex] = newContact;
      // Clear form
      form.reset();
      // Update the contact list
      updateContactList();
      // Reset editing index
      editingIndex = null;
    }
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

    contactContainer.appendChild(contact);

    const deleteBtn = contact.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", (e) => {
    
      contacts.splice(i, 1);
      renderContacts();
    });

    // handle edit button 
    const editBtn = contact.querySelector(".edit-btn");
    editBtn.addEventListener("click", (e) => {
      
      document.getElementById("postnom").value = contacts[i].postnom;
      document.getElementById("nom").value = contacts[i].nom;
      document.getElementById("tel").value = contacts[i].tel;
      document.getElementById("groupe").value = contacts[i].groupe;
      document.getElementById("email").value = contacts[i].email;
      document.getElementById("detail").value = contacts[i].detail;

      editingIndex = i;
    });
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getFormData();
  renderContacts();
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
=======
// Récupérer les éléments du formulaire
const prenom = document.getElementById("prenom");
const nom = document.getElementById("nom");
const telephone = document.getElementById("telephone");
const groupe = document.getElementById("groupe");
const email = document.getElementById("email");
const bio = document.getElementById("bio");
const image = document.getElementById("input-image");
const buttonCreer = document.getElementById("buttonCreer");
const buttonRenit = document.getElementById("buttonRenit");
let selectedContact;

// Ajouter un écouteur d'événement sur le bouton "Créer"
buttonCreer.addEventListener("click", function (event) {
  event.preventDefault(); // empêche la soumission du formulaire

  // Récupérer les valeurs des champs du formulaire
  const prenomValue = prenom.value;
  const nomValue = nom.value;
  const telephoneValue = telephone.value;
  const groupeValue = groupe.value;
  const emailValue = email.value;
  const bioValue = bio.value;

  // Créer une nouvelle div qui va contenir les informations du contact
  const newContact = document.createElement("div");
  newContact.classList.add("contact");
  const contactsList = document.querySelector(".contacts-list");
  contactsList.appendChild(newContact);

  // Créer une div pour afficher la photo
  const contactImage = document.createElement("div");
  contactImage.classList.add("contact-image");
  newContact.appendChild(contactImage);

  // Créer un element du type img qui sera dans la div de class contact-image
  const contactPhoto = document.createElement("img");
  contactPhoto.classList.add("contact-photo");
  contactImage.appendChild(contactPhoto);

  // Récupérer l'image
  const file = image.files[0];
  // vérifier si un fichier a été sélectionné
  if (!file) {
    console.log("Aucune image sélectionnée");
    return;
  }
  // créer un lecteur pour lire le contenu de l'image
  const reader = new FileReader();
  // quand le fichier est chargé, utiliser la propriété result pour afficher l'image dans l'élément img
  reader.onload = function (e) {
    contactPhoto.src = e.target.result;
  };
  // lire le fichier
  reader.readAsDataURL(file);

  // Créer une div pour afficher les informations genre les noms et autres de contact
  const contactInfo = document.createElement("div");
  contactInfo.classList.add("contact-info");
  newContact.appendChild(contactInfo);

  // Créer les elements p dans la div de class contact-info
  const contactNoms = document.createElement("p");
  contactNoms.classList.add("contact-noms");
  contactInfo.appendChild(contactNoms);

  // Mettre le prénom, nom et groupe dans l'element p
  contactNoms.textContent =
    prenomValue + " " + nomValue + " " + "-" + " " + groupeValue;
  const contactTelephone = document.createElement("p");
  contactTelephone.classList.add("contact-telephone");
  contactInfo.appendChild(contactTelephone);

  // Mettre le numero telephone et l'email dans l'element p
  contactTelephone.textContent = telephoneValue + " " + "/" + " " + emailValue;

  // Idem pour la bio du contact
  const contactBio = document.createElement("p");
  contactBio.classList.add("contact-bio");
  contactInfo.appendChild(contactBio);

  // Mettre la biographie dans l'element p
  contactBio.textContent = bioValue;

  // Créer une div pour afficher les icons edit et delete
  const contactIcons = document.createElement("div");
  contactIcons.classList.add("icons");
  newContact.appendChild(contactIcons);

  // Créer les icônes pour éditer et supprimer
  const editIcon = document.createElement("img");
  editIcon.src = "edit.svg";
  editIcon.classList.add("contact-edit");
  contactIcons.appendChild(editIcon);

  // Mettre un event sur l'icon éditer les informations d'un contact
  document.querySelectorAll(".contact-edit").forEach(function (editIcon) {
    editIcon.addEventListener("click", function (event) {
      event.preventDefault(); // empêche la soumission du formulaire

      // Récupérer les informations du contact sélectionné
      const contact = this.parentNode.parentNode;
      const prenomValue = contact
        .querySelector(".contact-noms")
        .textContent.split(" ")[0];
      const nomValue = contact
        .querySelector(".contact-noms")
        .textContent.split(" ")[1];
      const groupeValue = contact
        .querySelector(".contact-noms")
        .textContent.split("-")[1]
        .trim();
      const telephoneValue = contact
        .querySelector(".contact-telephone")
        .textContent.split("/")[0]
        .trim();
      const emailValue = contact
        .querySelector(".contact-telephone")
        .textContent.split("/")[1]
        .trim();
      const bioValue = contact.querySelector(".contact-bio").textContent;
      // const imageValue = contact.querySelector(".contact-photo").src;
      const imageValue = "";

      // Ouvrir une nouvelle fenêtre pour afficher le formulaire de modification
      const newWindow = window.open(
        "modification_form.html",
        "Modification de contact",
        "width=1000, height=1000"
      );

      // Attendre que la nouvelle fenêtre soit prête
      newWindow.onload = function () {
        // Récupérer les champs de formulaire dans la nouvelle fenêtre
        const newPrenom = newWindow.document.getElementById("prenom");
        const newNom = newWindow.document.getElementById("nom");
        const newTelephone = newWindow.document.getElementById("telephone");
        const newGroupe = newWindow.document.getElementById("groupe");
        const newEmail = newWindow.document.getElementById("email");
        const newBio = newWindow.document.getElementById("bio");
        const newImage = newWindow.document.getElementById("input-image");
        const newButtonCreer = newWindow.document.getElementById("buttonCreer");
        const newButtonRenit = newWindow.document.getElementById("buttonRenit");

        // Remplir les champs de formulaire avec les informations du contact sélectionné
        newPrenom.value = prenomValue;
        newNom.value = nomValue;
        newTelephone.value = telephoneValue;
        newGroupe.value = groupeValue;
        newEmail.value = emailValue;
        newBio.value = bioValue;
        // newImage.src = imageValue;
        newImage.value = imageValue;

        // Changer le bouton "Créer" en "Modifier"
        newButtonCreer.textContent = "Modifier";
        // Montrer le bouton "Annuler"
        newButtonRenit.style.display = "inline-block";

        // Ajouter les écouteurs d'événements pour la modification et l'annulation
        newButtonRenit.addEventListener("click", function () {
          newWindow.close();
        });
        newButtonCreer.addEventListener("click", function () {
          event.preventDefault(); // empêche la soumission du formulaire

          // Récupérer les valeurs des champs de formulaire
          const newPrenomValue = newPrenom.value;
          const newNomValue = newNom.value;
          const newTelephoneValue = newTelephone.value;
          const newGroupeValue = newGroupe.value;
          const newEmailValue = newEmail.value;
          const newBioValue = newBio.value;
          // const newimageValue = newImage.files[0];
          // Récupérer l'image
          const newimageValue = newImage.files[0];
          // vérifier si un fichier a été sélectionné
          if (!file) {
            console.log("Aucune image sélectionnée");
            return;
          }
          // créer un lecteur pour lire le contenu de l'image
          const reader = new FileReader();
          // quand le fichier est chargé, utiliser la propriété result pour afficher l'image dans l'élément img
          reader.onload = function (e) {
            contactPhoto.src = e.target.result;
          };
          // lire le fichier
          reader.readAsDataURL(newimageValue);

          // Mettre à jour les informations du contact sélectionné dans la liste des contacts
          contact.querySelector(".contact-noms").textContent =
            newPrenomValue +
            " " +
            newNomValue +
            " " +
            "-" +
            " " +
            newGroupeValue;
          contact.querySelector(".contact-telephone").textContent =
            newTelephoneValue + " " + "/" + " " + newEmailValue;
          contact.querySelector(".contact-bio").textContent = newBioValue;
          contact.querySelector(".contact-photo").src = newimageValue;

          // fermer la nouvelle fenêtre
          newWindow.close();
        });
      };
    });
  });

  const deleteIcon = document.createElement("img");
  deleteIcon.src = "delete.svg";
  deleteIcon.classList.add("contact-delete");
  contactIcons.appendChild(deleteIcon);
  // Mettre un evenement sur l'icon delete
  deleteIcon.addEventListener("click", function () {
    // Confirmer la suppression avant de supprimer le contact
    const confirmation = confirm("Voulez-vous vraiment supprimer ce contact ?");
    if (confirmation) {
      newContact.remove();
>>>>>>> 116e04c (fix: merge master with develop)
    }
  });

  // Vider les champs du formulaire
  prenom.value = "";
  nom.value = "";
  telephone.value = "";
  groupe.value = "1";
  email.value = "";
  bio.value = "";
  image.value = "";
});

// Ajout de l'événement "click" au bouton Rénit
buttonRenit.addEventListener("click", function (event) {
  event.preventDefault(); // empêche l'envoi du formulaire
  // Récupération du formulaire
  var form = document.getElementById("form");
  // Réinitialisation du formulaire
  form.reset();
});
