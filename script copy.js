function getContact() {
  // Récupération des données du formulaire
  var prenom = document.getElementById("prenom").value;
  var nom = document.getElementById("nom").value;
  var tel = document.getElementById("tel").value;
  var groupe = document.getElementById("groupe").value;
  var email = document.getElementById("email").value;
  var bio = document.getElementById("detail").value;
  var img = document.getElementById("imglink").files[0];

  // Vérification des données saisies
  if (!prenom || !nom || !tel || !groupe || !email) {
    alert("Veuillez remplir tous les champs obligatoires");
    return;
  }

  // Création de l'objet contact
  var contact = {
    prenom: prenom,
    nom: nom,
    tel: tel,
    groupe: groupe,
    email: email,
    bio: bio,
    img: img
  };

  // Récupération de la div qui contiendra le contact
  var contactContainer = document.getElementById("contactContainer");

  // Création de la div qui contiendra les informations du contact
  var contactDiv = document.createElement("div");
  contactDiv.classList.add("contact");

  // Ajout des informations du contact à la div
  contactDiv.innerHTML = 
    "<h3>" + contact.prenom + " " + contact.nom + "</h3>" +
    "<p>Téléphone : " + contact.tel + "</p>" +
    "<p>Groupe : " + contact.groupe + "</p>" +
    "<p>Email : " + contact.email + "</p>" +
    "<p>Bio : " + contact.bio + "</p>" +
    "<img src='" + contact.img + "' alt='photo de profil'>"
  
  // Ajout de la div du contact à la div contenant les contacts
  contactContainer.appendChild(contactDiv);
}

// Ajout de l'écouteur d'événement pour la soumission du formulaire
var form = document.getElementById("form");
form.addEventListener("submit", function(event) {
  event.preventDefault();
  getContact();
});

