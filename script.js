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

function getContactValue(){
    const nom = document.getElementById("nom").value;
    const postnom = document.getElementById("postnom").value;
    const tel = document.getElementById("tel").value;
    const groupe = document.getElementById("groupe").value;
    const myemail = document.getElementById("myemail ").value;
    const detail = document.getElementById("detail").value;

    return {
        nom,
        postnom,
        tel,
        groupe,
        myemail,
        detail
    }

}