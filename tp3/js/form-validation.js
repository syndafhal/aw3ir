function calcNbChar(id) {
    document.querySelector(`#${id}_count`).textContent = document.querySelector(`#${id}`).value.length;
}
window.onload = function () {
    console.log("DOM ready!");

    
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        
        event.preventDefault();

        
        const firstName = document.getElementById("inputFirstName3").value;
        const lastName = document.getElementById("inputLastName3").value;
        const email = document.getElementById("inputEmail").value;
        const dateOfBirth = new Date(document.getElementById("inputDate").value);
        const currentDate = new Date();
        const address = document.getElementById("inputAddress").value;


        if (firstName.length === 0 || lastName.length === 0 || email.length === 0 || dateOfBirth === "Invalid Date" || address.length === 0) {
            displayModal("Erreur dans le formulaire", "Veuillez remplir tous les champs du formulaire.");
            return;
        }
       
        if (firstName.length < 5 || lastName.length < 5) {
            displayModal("Erreur dans le formulaire", "les champs texte doivent avoir 5 caractères mininum");
            return;
        }


         
         if (dateOfBirth > currentDate) {
            displayModal("Date de naissance invalide", "La date de naissance ne peut pas être dans le futur.");
            return;
        }

        if (!validateEmail(email)) {
            displayModal("Email non valide", "L'adresse e-mail n'est pas valide.");
            return;
        }

        displayWelcomeModal(firstName, lastName, dateOfBirth, address,email);
        getLocation();
        print (getLocation());
    });

   
    function displayWelcomeModal(firstName, lastName, dateOfBirth, address, email) {
        const modalTitle = document.getElementById("modalTitle");
        const modalMessage = document.getElementById("modalMessage");

        modalTitle.textContent = "Bienvenue " + firstName + " " + lastName;
        modalMessage.innerHTML = "Vous êtes né(e) le " + dateOfBirth.toDateString() + " et vous habitez à l'adresse suivante: " + address + "<br><br><a href='https://www.google.com/maps?q=" + address + "' target='_blank'><img src='https://maps.googleapis.com/maps/api/staticmap?center=" + address + "&zoom=15&size=400x300&markers=" + address + "&key=AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg' alt='Adresse sur Google Maps'></a>";

        
        const modal = new bootstrap.Modal(document.getElementById("myModal"));
        modal.show();
        
        // Ajout du contact à la liste
        contactStore.add(lastName, firstName, dateOfBirth, address, email);

        // Mise à jour du tableau HTML
        document.getElementById("contactTable").innerHTML = contactStore.displayContactList();
    }

   
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }


   
    function displayModal(title, message) {
        const modalTitle = document.getElementById("modalTitle");
        const modalMessage = document.getElementById("modalMessage");

        modalTitle.textContent = title;
        modalMessage.textContent = message;

      
        const modal = new bootstrap.Modal(document.getElementById("myModal"));
        modal.show();
    }

    // Ajout d'un gestionnaire de clic pour le bouton GPS
const btnGPS = document.getElementById("btnGPS");

btnGPS.addEventListener("click", function () {
    // Appel à la fonction getLocation() lorsque le bouton GPS est cliqué
    getLocation();
});
};
