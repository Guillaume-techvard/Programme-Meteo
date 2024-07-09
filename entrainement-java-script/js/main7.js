// Creation de la fonction
function rechercheSousChaine(chaine, sousChaine) {
    // debut de la boucle. Nous avons cette limite car cela nous permet de voir en fonction du nombre de caractere possede le nombre que l'on recherche, a combien de caractere de la fin on doit se placer maximum pour etre sur que il soit encore trouvable ici.
  
    for (let i = 0; i <= chaine.length - sousChaine.length; i++) {
      let trouve = true;
      // for (let i = 0; i <= chaine.length - sousChaine.length; i++): On parcourt chaque position possible où la sous-chaîne pourrait commencer.
      for (let j = 0; j < sousChaine.length; j++) {
        if (chaine[i + j] !== sousChaine[j]) {
          trouve = false;
          break;
        }
      }
      if (trouve) {
        return i;
      }
    }
    return -1;
  }
  // EXEMPLE
  const mid = "bonjour tout le monde";
  const sousChaine = "tout";
  console.log(rechercheSousChaine(mid, sousChaine)); // Affiche 8
  
  
  /////////////////////////////////////EXERCICE 8///////////////////////////////
 