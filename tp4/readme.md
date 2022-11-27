<p align="center">
  <a href="https://master3ir2020.slack.com/messages/aw">
     <img src="https://github.com/bilelz/tpaw/blob/master/galilee.png?raw=true" alt="Logo Master" width=100/>
  </a>  
  <br/>
<h3 align="center">TP AW #4 : 
Ajout de fonctionnalités HTML5 au formulaire
</h3>
</p>

### Prérequis (⚠️ important)

- Lire **tout** l'énoncé avant de commencer le TP.

❓❓Si vous avez des questions ou des erreurs dans votre code :

- formater (indenter) bien votre code (raccourci Visual Studio Code : Ctrl + K puis Ctrl + F)
- demander à Google 🔍
- demander à vos camarades 👩‍🎓👨‍🎓
- demander au professeur 🙋

# Table des matières

- [Table des matières](#table-des-matières)
  - [1. Objectif du TP](#1-objectif-du-tp)
  - [2. Plateforme de dév (idem que le TP3)](#2-plateforme-de-dév-idem-que-le-tp3)
  - [3. Geolocalisation HTML5](#3-geolocalisation-html5)
    - [1. JavaScript **gps.js**](#1-javascript-gpsjs)
    - [2. Ajouter un bouton à coté du champ de saisie de l’adresse](#2-ajouter-un-bouton-à-coté-du-champ-de-saisie-de-ladresse)
    - [3. Mapping du bouton HTML et de la fonction javaScript](#3-mapping-du-bouton-html-et-de-la-fonction-javascript)
    - [4. 💡 Simuler d'autres coordonées GPS depuis l'outil de dev. de Chrome](#4--simuler-dautres-coordonées-gps-depuis-loutil-de-dev-de-chrome)
  - [4. Afficher le nombre de caractère saisie](#4-afficher-le-nombre-de-caractère-saisie)
  - [5. Ajouter le contact à un tableau JSON (store.js)](#5-ajouter-le-contact-à-un-tableau-json-storejs)
  - [6. Afficher la liste des contacts dans un tableau HTML](#6-afficher-la-liste-des-contacts-dans-un-tableau-html)


## 1. Objectif du TP

- HTML5: Commencer à utiliser les capacités avancées (géolocalisation)
- JS : écrire un code modulaire (
  - Article à ce sujet: https://medium.freecodecamp.org/javascript-modules-a-beginner-s-guide-783f7d7a5fcc
- JS : Manipuler des objets JSON
  - voir documentation sur https://www.w3schools.com/js/js_json_intro.asp

Reprenez le formulaire et les règles de validationdu [TP 3](../tp3/) :

- Nom (5 caractères mininum)
- Prénom (5 caractères mininum)
- Date de naissance (ne peut pas être dans le futur)
- Adresse postale (5 caractères mininum)
- Adresse mail (doit être bien formaté)

![Texte alternatif](tp4.PNG "texte pour le titre, facultatif")

## 2. Plateforme de dév (idem que le TP3)

Votre répertoire doit ressembler à ça:

```
tp3/
├── index.html
├── css/
│   ├── bootstrap.css
└── js/
    ├── bootstrap.bundle.js
    └── form-validation.js
```

- Clé Google Map Image à utiliser
  `AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg`

Exemple avec une image centrée sur Paris: <a href="https://maps.googleapis.com/maps/api/staticmap?markers=Paris&zoom=14&size=400x300&scale=2&key=AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg">
<img src="https://maps.googleapis.com/maps/api/staticmap?markers=Paris&zoom=14&size=400x300&scale=2&key=AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg" alt='google map' width=200/>
</a><br/>
`https://maps.googleapis.com/maps/api/staticmap?markers=Paris&zoom=14&size=400x300&scale=2&key=AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg`

## 3. Geolocalisation HTML5

- L'API Géolocalisation HTML5 est utilisée pour obtenir la position géographique d'un utilisateur (si il utilise un navigateur récent)
- Documentation et fonction JS de géolocalisation disponibles ici : https://www.w3schools.com/html/html5_geolocation.asp

### 1. JavaScript **gps.js** 

Dans un fichier **gps.js**, copier le code ci-dessous:
```javascript
// demande de la localisation à l'utilisateur
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    document.querySelector("#map").innerHTML =
      "Geolocation is not supported by this browser.";
  }
}

// Si l"utilisateur l'autorise, on récupère les coordonnées dans l'objet "position"
function showPosition(position) {
  var latlon = position.coords.latitude + "," + position.coords.longitude;
  var img_url = `https://maps.googleapis.com/maps/api/staticmap?center=${latlon}&zoom=14&size=400x300&key=AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg`;

  document.querySelector("#map").innerHTML = `<img src='${img_url}'>`;
}

// Au cas ou l'utilisateur refuse
// Ou si une erreur arrive
function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      document.querySelector("#map").innerHTML =
        "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      document.querySelector("#map").innerHTML =
        "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      document.querySelector("#map").innerHTML =
        "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      document.querySelector("#map").innerHTML = "An unknown error occurred.";
      break;
  }
}
```

### 2. Ajouter un bouton à coté du champ de saisie de l’adresse

### 3. Mapping du bouton HTML et de la fonction javaScript
Dans votre script **form-validation.js** intercepter le click sur ce bouton et utiliser la fonction getLocation() pour demander la géolocalisation à l’utilisateur

La géolocalisation vous donnera la **latitude** et la **longitude** de l’utilisateur.

Afficher une image (dans le code JS ci-dessus ça s'affiche dans une DIV avec id="map") de Google Maps centrée sur ces coordonnées GPS (documentation de l’API google maps)

URL de l’image : https://maps.googleapis.com/maps/api/staticmap?markers=latitude,longitude&zoom=14&size=400x300&scale=2&key=AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg


### 4. 💡 Simuler d'autres coordonées GPS depuis l'outil de dev. de Chrome 
Dans l'outil de developpement de Google Chrome, il est possible de surcharger la localisation de l'utilisateur. 

Pour ce faire :
-  Aller dans l'outil de dévelopmment : touche **F12** ou **⁝**(Menu de Chrome)/**Plus d'outils**/**Outils de developpement**
-  Cliquez sur les "**...**", choisir **More Tools** puis **Sensors**
-  <img src="sensors.jpg" alt="sensors">
-  Vous aurez accés à l'onglet "Sensors", dans la section **Location**, vous pourrez choisir l'une des villes préselectionnée (par exemple **Mountain View**)
-  <img src="mountain.jpg" alt="mountain view">
-  Cliquez sur le bouton "GPS" de votre page web pour actualiser et vérifier les coordonnées lat/lon et l'image Google Maps de votre formulaire.


## 4. Afficher le nombre de caractère saisie

![Texte alternatif](image3.png "texte pour le titre, facultatif")

A coté de chaque champ de saisie, afficher le nombre de caractère saisie en temps réel, c’est-à-dire à chaque fois que l’utilisateur change le contenu du champ.
Pour intercepter l'appui sur le clavier de l'utilsateur, on peut intercepter l'un des ces 3 évévements (**à vous de voir lequel est le plus efficace**)

- onkeydown https://www.w3schools.com/jsref/event_onkeydown.asp
- onkeypress https://www.w3schools.com/jsref/event_onkeypress.asp
- onkeyup https://www.w3schools.com/jsref/event_onkeyup.asp

Exemple de code avec onkeypress.
Le nombre de caractère sera affiché dans une balise `span` que l'on positionne juste aprés la balise `input`.
On pourra la cibler en CSS et JS, grâce à un selecteur
**combinateur de voisin direct** (https://developer.mozilla.org/fr/docs/Web/CSS/Adjacent_sibling_combinator)


<div  align="center">Extrait de code HTML</div>

```html
<form>
  <div class="row mb-3">
    <label for="name" class="col-sm-2 col-form-label">Nom</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="name" onkeypress="calcNbChar(this.id)" />
      <span></span> <!-- balise mise à jour dynamiquement en JS -->
    </div>
  </div>
</form>
```



<div  align="center">Extrait de code JS</div>

```js
function calcNbChar(id) {
  document.querySelector(`#${id} + span`).textContent = document.querySelector(`#${id}`).value.length;
}
```

<!---
## 5. Stockage du formulaire dans le LocalStorage du navigateur

![Texte alternatif](image1.png "texte pour le titre, facultatif")

1. Au click sur le bouton “Valider” du formulaire, enregistrer les valeurs de tous les champs de saisie dans le localStorage du navigateur
2. Afficher un message “Bravo! Le formulaire est sauvegardé.” à l’utilisateur.

HTML Local storage permet de stocker des données dans le navigateur web (comme les cookies) via une combinaison clé:valeur (key:value)
Exemple

* Pour stocker la valeur “smith” dans la clé “lastname” :
```js
localStorage.setItem("lastname", "Smith");
```
* Pour lire la valeur de la clé  :
```js
var prenom = localStorage.getItem("lastname");
```

* Documentation : http://www.w3schools.com/html/html5_webstorage.asp
-->

## 5. Ajouter le contact à un tableau JSON (store.js)

1. créer un fichier **store.js**

   - Ce script stockera le contact dans une liste JSON
   - Cette liste sera sauvegardé dans une base de données local (localStorage https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage)
   - Les méthodes disponibles seront:
     - Ajout d'un contact à la liste **contactStore.add(\_name, \_firsname, \_date, \_adress, \_mail);**
     - Listing des contacts **contactStore.getList();**
     - Remise à zéro de la liste **contactStore.reset();**

- Code à reprendre:

```js
/*
store.js
Script pour gérer la liste de contact en JSON

Pour ajouter un contact:  contactStore.add(_name, _firsname, _date, _adress, _mail);
Pour récuper la liste:    contactStore.getList();
*/
var contactStore = (function () {
  // variable privée
  let contactListString = localStorage.getItem('contactList')
  var contactList = contactListString ? JSON.parse(contactListString) : [];

  // Expose these functions via an interface while hiding
  // the implementation of the module within the function() block

  return {
    add: function (_name, _firsname, _date, _adress, _mail) {
      var contact = {
        name: _name,
        firstname: _firsname,
        date: _date,
        adress: _adress,
        mail: _mail,
      };
      // ajout du contact à la liste
      contactList.push(contact);

      // persistence de la liste dans une base de données local du navigateur web
      // https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage
      localStorage.setItem('contactList', JSON.stringify(contactList));

      return contactList;
    },
    reset: function () {
     
      localStorage.removeItem('contactList');

      return contactList;
    },

    getList: function () {
      return contactList;
    },
  };
})();
```

2. Si le formulaire est valide, appeler la méthode qui ajoute toutes les informations au tableau JSON

## 6. Afficher la liste des contacts dans un tableau HTML

![Texte alternatif](tp4.PNG "texte pour le titre, facultatif")

- Créer une fonction pour afficher les contacts sous forme de tableau HTML:

```js
function displayContactList(){
  const contactListString = localStorage.getItem('contactList'); // ici on va récupérer la liste en forme de chaine de caractère (string)
  const contactList = contactListString ? JSON.parse(contactListString) : [];

  for(const contact of contactList){
document.querySelector("table tbody").innerHTML +=
  `<tr>
  <td>${contact.name}</td>
  <td> ${contact.firstName} </td>
  <!-- CODE à compléter pour insérer les autres données du contact -->
  <tr>`;
}
```

- Appeler la fonction displayContactList() au chargement de la page
De cette façon, la liste des contacts (sauvegardé dans le localStore) sera affiché.

```js
window.onload = function(){ 
  displayContactList();
 };
```


- à coté du bouton "Ajouter", ajouter un bouton supprimer qui va appeler la fonction ``