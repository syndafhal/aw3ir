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
      displayContactList: function () {
        let tableHTML = '<table><thead><tr><th>Nom</th><th>Prénom</th><th>Date de naissance</th><th>Adresse</th><th>Email</th></tr></thead><tbody>';

        for (const contact of contactList) {
            tableHTML += `<tr>
                            <td>${contact.name}</td>
                            <td>${contact.firstname}</td>
                            <td>${contact.date}</td>
                            <td>${contact.adress}</td>
                            <td>${contact.mail}</td>
                         </tr>`;
        }

        tableHTML += '</tbody></table>';
        return tableHTML;
    },
    };
  })();