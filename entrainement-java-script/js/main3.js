 
  ////////////////////////////EXERCIE 3/////////////////////////////////
  // 
  
  const texte = "Avec ces corrections, le code devrait fonctionner correctement pour générer les n premiers nombres premiers.";
  
  const occurence = (texte) => {
    // initialisation d'un objet pour y mettre mes mots et leurs repetitions.
    const obj = {};
    // Utilisation d'une expression régulière pour extraire les mots
    const mots = texte.match(/\b\w+\b/g); 
  
    for (let mot of mots) {
      mot = mot.toLowerCase(); // Convertir le mot en minuscule pour une comparaison insensible à la casse
  
      // structure de controle ou l'on rajoute 1 a la valeur de la clé mot si elle existe deja sinon on lui donne la valeur 1
      if (obj[mot]) {
        obj[mot]++;
      } else {
        obj[mot] = 1;
      }
    }
    // ici c'est pour afficher l'objet une fois le travail effectuer.
    return obj;
  }
  
  console.log(occurence(texte));
  
 