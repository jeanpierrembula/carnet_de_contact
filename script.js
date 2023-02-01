// <<<<<<< HEAD
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

const dropzone = document.querySelector(".dropzone")
const childP = dropzone.firstElementChild;

dropzone.addEventListener('dragover', (e) => {
  e.preventDefault();
  e.stopPropagation();
  childP.innerHTML = 'Relacher image';
  childP.classList.add('active');
});

dropzone.addEventListener('dragleave', () => {
  dropzone.innerHTML = `<p class="text-image">Déposez la photo ici ou <span class="span-click">Cliquer ici</span></p>`;
  dropzone.classList.remove('active');
});

dropzone.addEventListener('drop', (event) => {
  event.preventDefault();
  file = event.dataTransfer.files[0];
  let fileType = file.type;
  let validExt = ['image/jpeg','image/jpg','image/png'];
  if(file.size >1000000){
    dropzone.style.borderColor = "red"
    dropzone.innerHTML = `<p class="text-image">Déposez la photo ici ou <span class="span-click">Cliquer ici</span></p>`
    document.getElementById("imgErr").style.color="red"
    document.getElementById("imgErr").innerHTML = `<p><span class="warning__Icon"><i class="fa-solid fa-circle-exclamation"></i></span>le poids de l’image doit être inférieur à 1 Mo</p>`;
    Object.defineProperty(erreurs, 'image', {
      value: 'le poids de l’image doit être inférieur à 1 Mo',
      writable : true,
      enumerable : true,
      configurable : true
      });
  }else if(!validExt.includes(fileType)){
    dropzone.style.borderColor = "red"
    dropzone.innerHTML = `<p class="text-image">Déposez la photo ici ou <span class="span-click">Cliquer ici</span></p>`
    document.getElementById("imgErr").style.color="red"
    document.getElementById("imgErr").innerHTML = `<p><span class="warning__Icon"><i class="fa-solid fa-circle-exclamation"></i></span>Ce fichier n'est pas une image</p>`;
    Object.defineProperty(erreurs, 'image', {
        value: "Le fichier n'est pas une image",
        writable : true,
        enumerable : true,
        configurable : true
    });
  }
  else{
    dropzone.style.borderColor = ""
    document.getElementById("imgErr").style.color=""
    document.getElementById("imgErr").innerHTML = "";
    displayImg();
    delete erreurs.image;
  }
});
function displayImg(){
  let fileReader = new FileReader()
  fileReader.onload = () => {
    fileURL = fileReader.result;
    let imgTag = `<img src = "${fileURL}" alt = "" >`;
    dropzone.innerHTML = imgTag;
  }
  fileReader.readAsDataURL(file);
}


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
  
    const emailInput = document.getElementById("email")
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
    
    const telInput = document.getElementById("tel")
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
    
    const nameInput = document.getElementById("nom")
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
    
    const firstNameInput = document.getElementById("postnom")
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
      //  renderContacts();
      }
    } else {
      // Update the existing contact
      contacts[editingIndex] = newContact;
      // Clear form
      form.reset();
      // Update the contact list
      // renderContacts();
      // Reset editing index
      editingIndex = null;
    }

   
  }
  
  
  

// Render the contacts in the contact container
function renderContacts() {
  // contactContainer.innerHTML = "";
  const contactList = document.querySelector("#contacts-list")
  for (let i = 0; i < contacts.length; i++) {
    // Create a new contact element
    const contact = document.createElement("div");
    contact.classList.add("contact");
    contact.innerHTML = `
    <div class="contacimg"></div>
    <div class="contactdesc">
      <div class="groupe1">
      <p>${contacts[i].postnom} ${contacts[i].nom} ${contacts[i].groupe}</p>
      <p class="button"> <button class="edit-btn"></button>
      <button class="delete-btn"></i></button>
     </p>
      </div>
      <p>${contacts[i].tel}</p>
      <p>${contacts[i].email}</p>
      <p>${contacts[i].detail}</p>
    </div>
    `;
    console.log(`${contacts[i].tel}`)
    contactList.appendChild(contact);

    const deleteBtn = contact.querySelector(".delete-btn");
    // Mettre un evenement sur l'icon delete
    deleteBtn.addEventListener("click", (e) => {
    const confirmation = confirm("Voulez-vous vraiment supprimer ce contact ?");
      if (confirmation) {
        contact.remove();

      }
    });

    // // Mettre un evenement sur l'icon edite 
    const form = document.getElementById("form");
    const editBtn = contact.querySelector(".edit-btn");
    editBtn.addEventListener("click", function (event) {
      event.preventDefault(); // empêche la soumission du formulaire
      
      document.getElementById("postnom").value = contacts[i].postnom;
      document.getElementById("nom").value = contacts[i].nom;
      document.getElementById("tel").value = contacts[i].tel;
      document.getElementById("groupe").value = contacts[i].groupe;
      document.getElementById("email").value = contacts[i].email;
      document.getElementById("detail").value = contacts[i].detail;

      // Changer le bouton "Créer" en "Modifier"
      const newButtonCreer = document.getElementById("buttonCreer");
      newButtonCreer.textContent = "Modifier";
      // Changer le bouton "Créer" en "Annuler"
      const newButtonRenit = document.getElementById("buttonRenit");
      newButtonRenit.textContent = "Annuler";
      // Afficher les deux boutons
      newButtonCreer.style.display = "inline-block";
      newButtonRenit.style.display = "inline-block";

      //Ajouter les écouteurs d'événements pour la modification et l'annulation

      newButtonCreer.addEventListener("click", function (){
        event.preventDefault();
        // Mettre à jour les informations du contact sélectionné dans la liste des contacts
        function updateContact(i) {
          contacts[i].postnom = document.getElementById("postnom").value;
          contacts[i].nom = document.getElementById("nom").value;
          contacts[i].tel = document.getElementById("tel").value;
          contacts[i].groupe = document.getElementById("groupe").value;
          contacts[i].email = document.getElementById("email").value;
          contacts[i].detail = document.getElementById("detail").value;
         };

      });
      newButtonRenit.addEventListener("click",function(){
        const annuler = confirm("Voulez-vous annuler les modifications apportées à ce contact ?");
        if (annuler) {
          contact.Index(i);
  
        }

      } );


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
     }
});

