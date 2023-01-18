const contacts = [];

// Récupération du formulaire
const form = document.querySelector('#form');

// Récupération du bouton "Réinit"
const resetBtn = document.querySelector('.btn-secondary');

const dropzone = document.getElementById('dropzone');

// Récupère l'élément où les contacts seront affichés
const contactContainer = document.getElementById('contactContainer')

const prenom = document.getElementById('postnom').value

function creatContact(e) {
    e.preventDefault()

    const div = document.createElement('div');
    div.classList.add('contact');

    div.innerHTML = `
    <p>${prenom}</p>
    `
    contactContainer.appendChild(div)

    form.reset()
}

// Gère la soumission du formulaire
form.addEventListener('submit', creatContact)

// form.addEventListener('submit', creatContact)

// dropzone.addEventListener('dragover', function(event){
//     event.preventDefault();
// });

// dropzone.addEventListener('drop', function(event){
//     event.preventDefault();

//     const file = event.dataTransfer.files[0];
//     const imgInput = document.getElementById('imglink');
//     if (file.type.startsWith('image/') && (file.type.endsWith('jpeg') || file.type.endsWith('jpg') || file.type.endsWith('png'))) {

//         const reader = new FileReader();
        
//         reader.readAsDataURL(file);
//         reader.onload = function(){

//             imgInput.value = reader.result;
//             const contact = {
//                 prenom : document.getElementById('prenom').value,
//                 nom : document.getElementById('nom').value,
//                 tel : document.getElementById('tel').value,
//                 groupe : document.getElementById('groupe').value,
//                 email : document.getElementById('email').value,
//                 bio : document.getElementById('detail').value,
//                 image : reader.result,
//             }
//             // Verifying if all required fields are filled
//             if(contact.prenom !== "" && contact.nom !== "" && contact.tel !== "" && contact.groupe !== "" && contact.email !== ""){
//                 contacts.push(contact);
//                 console.log(contacts);
//             }else{
//                 alert("Please fill all the required fields")
//             }
//         }
//     } else {
//         // Show an error message
//         alert("Please select a valid image file (jpg, jpeg, png)");
//     }
// });

// // Ajout de l'écouteur d'événement "click" sur le bouton "Réinit"
// resetBtn.addEventListener('click', () => {
//     // Réinitialisation du formulaire
//     form.reset();
// });
