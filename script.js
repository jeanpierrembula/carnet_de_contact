// Fonction pour ajouter un contact à l'annuaire

function addContact(nom, postnom, tel, groupe, myemail, detail, myimage) {
    // Creation de la structure html de la partie contact 
    const htmlStructure = `
    <div class="contact">
      <img src="${myimage}" alt="Image de ${nom} ${postnom}">
      <h3>${nom} ${postnom}</h3>
      <p>${tel}</p>
      <p>${groupe}</p>
      <p>${myemail}</p>
      <p>${detail}</p>
      <button class="edit-button">Modifier</button>
      <button class="delete-button">Supprimer</button>
    </div>
  `;

  const contactsDiv = document.getElementById('contacts');
  contactsDiv.innerHTML += contactHTML;
  console.log(htmlStructure)
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
