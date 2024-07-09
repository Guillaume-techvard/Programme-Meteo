 // ////////////////////////////Exercice 4//////////////////////////////////////
  
  // Creation d'une fonction pour trier des chaines de caracteres dans l'ordre croissant. 
  function trierChaine(chaine) {
    // dans l'ordre, on sépare la chaine ou chaque lettre devient un element, puis on les classes et enfin on les remet ensemble.
    return chaine.split('').sort().join('');
  }
  
  const texte = "javascript";
  console.log(trierChaine(texte));
   // Affichera 'aacijprstv'
  
  
