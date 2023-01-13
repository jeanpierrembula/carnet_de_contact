// on initialise le tableau de contact
let contacts = []

// Récupère les éléments du formulaire
const form = document.querySelector('#form');
const postnom = document.querySelector('#postnom');
const nom = document.querySelector('#nom');
const tel = document.querySelector('#tel');
const groupe = document.querySelector('#groupe');
const email = document.querySelector('#email');
const detail = document.querySelector('#detail');
const dropzone = document.querySelector('.dropzone');

// Récupère l'élément où les contacts seront affichés
const contactContainer = document.getElementById('contactContainer')


// Gère la soumission du formulaire
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // on Crée un objet contact avec les valeurs du formulaire
    const contact = {
        postnom : postnom.value,
        nom : nom.value,
        tel : tel.value,
        groupe : groupe.value,
        email : email.value,
        bio : detail.value,
    };
    
    // Récupère les images déposées dans la zone de dépôt
    const images = dropzone.querySelectorAll('img');

    // Ajoute les images au contact
    contact.images = [];
    images.forEach((image) => {
        contact.images.push(image.src);
    });

    // Vide la zone de dépôt
    dropzone.innerHTML = '<p>Glissez et déposez vos fichiers ici</p>';

    // Ajoute le contact au tableau de contacts
    contacts.push(contact);

    // Réinitialise le formulaire
    form.reset();

    // Met à jour la liste de contacts
    updateContactList();
});

// Gère la suppression d'un contact
function deleteContact(index) {
    // Supprime le contact du tableau
    contacts.splice(index, 1);
  
    // Met à jour la liste de contacts
    updateContactList();
}


// Gère la modification d'un contact
function editContact(index) {
    // Récupère le contact à modifier
    const contact = contacts[index];
  
    // Remplit le formulaire avec les données du contact
    postnom.value = contact.postnom;
    nom.value = contact.nom;
    tel.value = contact.tel;
    groupe.value = contact.groupe;
    email.value = contact.email;
    detail.value = contact.detail;
  
    // Vide la zone de dépôt
    dropzone.innerHTML = '<p>Glissez et déposez vos fichiers ici</p>';
  
    // Remplit la zone de dépôt avec les images du contact
    contact.images.forEach((imageSrc) => {
      const image = document.createElement('img');
      image.src = imageSrc;
      dropzone.appendChild(image);
    });

    // Modifie la fonction de soumission du formulaire pour mettre à jour le contact existant au lieu d'en créer un nouveau
    form.addEventListener('submit', (e) => {
        e.preventDefault();

     // Met à jour les valeurs du contact avec celles du formulaire
     contact.postnom = postnom.value;
     contact.nom = nom.value;
     contact.tel = tel.value;
     contact.groupe = groupe.value;
     contact.email = email.value;
     contact.detail = detail.value;
 
     // Récupère les images déposées dans la zone de dépôt
     const images = dropzone.querySelectorAll('img');
 
     // Met à jour les images du contact
     contact.images =  contact.images.src;
   
     // Vide la zone de dépôt
     dropzone.innerHTML = '<p>Glissez et déposez vos fichiers ici</p>';
 
     // Réinitialise le formulaire
     form.reset();
 
     // Met à jour la liste de contacts
     updateContactList();
   });
 }

 // Met à jour l'affichage de la liste de contacts
function updateContactList() {
    // Vide la liste de contacts
    
    contactContainer.innerHTML = '';
  
    // Pour chaque contact, crée un élément HTML et l'ajoute à la liste
    contacts.forEach((contact, index) => {
      const contactEl = document.createElement('div');
      contactEl.classList.add('contact');

      contactEl.innerHTML = `
      <div class="images">
        ${contact.images.map((imageSrc) => `<img src="${imageSrc}" alt="">`).join('')}
      </div>

      <div class="firstgoup">

          <div class="actions">
            <div><p>${contact.postnom} ${contact.nom} ${contact.groupe}</p></div>
            <div>
              <button onclick="editContact(${index})">Modifier</button>
              <button onclick="deleteContact(${index})">Supprimer</button>
            </div>
          </div>

        <div class="secondtgoup">
          <p>${contact.tel}</p>
          <p>${contact.email}</p>
          <p>${contact.detail}</p>
        </div>

      </div>
      `;
  
      contactContainer.appendChild(contactEl);
    });
  }

  // Gère le glisse-dépose de fichiers
dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
  
    // Pour chaque fichier, crée une image et l'ajoute à la zone de dépôt
    // for (let i = 0; i < files.length; i++) {
    //   const file = files[i];

    // Vérifie que le fichier est une image
    if (file.type.startsWith('image/')) {
        const reader = new FileReader();
  
        // Quand l'image est chargée, crée une image et l'ajoute à la zone de dépôt
        reader.addEventListener('load', () => {
          //const image = document.createElement('img');
          // image.src = reader.result;
          const image = `<img src="${reader.result}" alt="">`;
          dropzone.innerHTML = image;
        });
  
        // Lit les données de l'image
        reader.readAsDataURL(file);
      }
    });

  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
  });
  
  // Affiche la liste de contacts initiale
  updateContactList();
