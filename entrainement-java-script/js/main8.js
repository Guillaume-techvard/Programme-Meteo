 // Fonction pour analyser les sentiments d'un texte donné
 function analyseSentiments(monTexte) {
    // Liste des mots positifs
    const motsPositifs = ["heureux", "joie", "excellent", "positif", "amour"];
    // Liste des mots négatifs
    const motsNegatifs = ["triste", "mal", "horrible", "négatif", "haine"];
  
    // j'initialise a 0
    let score = 0;
    // Conversion du texte en minuscules pour eviter qu'il soit sensible a la casse  et séparation en mots individuels
    const mots = monTexte.toLowerCase().split(/\b\w+\b/);
  
    // Boucle pour vérifier chaque mot
    for (let mot of mots) {
      // Si le mot est dans la liste des mots positifs, on augmente le score
      if (motsPositifs.includes(mot)) {
        score++;
      // Si le mot est dans la liste des mots négatifs, on diminue le score
      } else if (motsNegatifs.includes(mot)) {
        score--;
      }
    }
  
    // Si le score est positif, on retourne "positif"
    if (score > 0) {
      return "positif";
    // Si le score est négatif, on retourne "négatif"
    } else if (score < 0) {
      return "négatif";
    // Si le score est neutre (0), on retourne "neutre"
    } else {
      return "neutre";
    }
  }
  
  // Exemple d'utilisation de la fonction analyseSentiments
  const texte = "Je suis très heureux aujourd'hui, c'est une excellente journée!";
  console.log(analyseSentiments(texte)); // Affiche "positif"
  
 