function addContact(event) {
  // Empêcher la soumission du formulaire
  event.preventDefault();

  // Récupérer les valeurs du formulaire
  let name = document.getElementById('nom').value;
  let postname = document.getElementById('postnom').value;
  let phone = document.getElementById('tel').value;
  let group = document.getElementById('groupe').value;
  let email = document.getElementById('myemail').value;
  let details = document.getElementById('detail').value;
  let image = document.getElementById('myimage').files[0];

  // Vérifier que les valeurs du formulaire ne sont pas vides
  if (name === '' || phone === '') {
    alert('Le nom et le numéro de téléphone sont obligatoires');
    return;
  }

  // Créer un nouvel élément de la liste de contacts
  var contact = document.createElement('div');
  contact.className = 'contact';

  // Ajouter les détails du contact à l'élément
  contact.innerHTML = '<p class="name">' + image +'</p>' +
                      '<p class="name">' + name + ' ' + postname + '</p>' +
                      '<p class="phone">' + phone + '</p>' +
                      '<p class="group">' + group + '</p>' +
                      '<p class="email">' + email + '</p>' +
                      '<p class="details">' + details + '</p>';

  // Ajouter un bouton d'édition
  let editButton = document.createElement('button');
  editButton.className = 'edit';
  editButton.textContent = 'Modifier';
  contact.appendChild(editButton);

  // Ajouter un bouton de suppression
  var deleteButton = document.createElement('button');
  deleteButton.className = 'delete';
  deleteButton.textContent = 'Supprimer';
  contact.appendChild(deleteButton);

  // Ajouter l'élément de la liste de contacts au DOM
  var contactsList = document.querySelector('.contacts');
  contactsList.appendChild(contact);

  // Enregistrer l'image téléchargée dans le stockage local
  if (image) {
    var reader = new FileReader();
    reader.onload = function(e) {
      window.localStorage.setItem(name, e.target.result);
    }
    reader.readAsDataURL(image);
  }

  // Réinitialiser le formulaire
  event.target.reset();
}

// Ajouter un gestionnaire d'événements de soumission du formulaire
var form = document.querySelector('form');
form.addEventListener('submit', addContact);

// Fonction pour éditer un contact
// Fonction pour éditer un contact
function editContact(event) {
  // Récupérer l'élément de la liste de contacts à éditer
  var contact = event.target.parentNode;

  // Récupérer les valeurs du contact
  var name = contact.querySelector('.name').textContent;
  var phone = contact.querySelector('.phone').textContent;
  var group = contact.querySelector('.group').textContent;
  var email = contact.querySelector('.email').textContent;
  var details = contact.querySelector('.details').textContent;

  // Remplir le formulaire avec les valeurs du contact
  document.getElementById('nom').value = name;
  document.getElementById('tel').value = phone;
  document.getElementById('groupe').value = group;
  document.getElementById('myemail').value = email;
  document.getElementById('detail').value = details;

  // Changer le texte du bouton de soumission du formulaire
  var submitButton = document.querySelector('button.submit');
  submitButton.textContent = 'Enregistrer';

  // Ajouter une classe à l'élément de la liste de contacts pour indiquer qu'il est en cours d'édition
  contact.classList.add('editing');
}

// Fonction pour supprimer un contact
function deleteContact(event) {
  // Récupérer l'élément de la liste de contacts à supprimer
  var contact = event.target.parentNode;

  // Supprimer l'élément de la liste de contacts du DOM
  contact.parentNode.removeChild(contact);
}

// Ajouter des gestionnaires d'événements aux boutons d'édition et de suppression
var contactsList = document.querySelector('.contacts');
contactsList.addEventListener('click', function(event) {
  if (event.target.className === 'edit') {
    editContact(event);
  } else if (event.target.className === 'delete') {
    deleteContact(event);
  }
});

