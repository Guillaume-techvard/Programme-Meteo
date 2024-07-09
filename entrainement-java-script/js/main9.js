 
  // ////////////////////////Exercice 9/////////////////////////////
  function permuter(chaine) {
    if (chaine.length <= 1) {
      return [chaine];
    }
    
    let permutations = [];
    
    for (let i = 0; i < chaine.length; i++) {
      let char = chaine[i];
      let reste = chaine.slice(0, i) + chaine.slice(i + 1);
      for (let permutation of permuter(reste)) {
        permutations.push(char + permutation);
      }
    }
    
    return permutations;
  }
  
  const texte = "abc";
  console.log(permuter(texte)); // Affiche ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']
