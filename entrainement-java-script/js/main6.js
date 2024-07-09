  /////////////////////////////////exercice6 //////////////////////////////////////////
  
  
  function verifierParentheses(expression) {
    // initialisation d'un tableau pour empiler
    let stack = [];
    for (let char of expression) {
      // on verifie si un des characteres est "("
      if (char === '(') {
        // si c'est le cas, on l'envoie dans le tableau pour empiler
        stack.push(char);
        // sinon si on tombe sur l'autre ")" et que le tableau est vide, on retourne faux et on sait qu'il y a un probleme. 

      } else if (char === ')') {
        if (stack.length === 0) {
          return false;
        }
        // Sinon a chaque fois que l'on tombe sur une parenthsese fermante on retire une parathese qu'il y avait dans le tableau pour empiler.
        stack.pop();
      }
    }
    // si tout va bien on retourne un tableau vide.
    return stack.length === 0;
  };
  
  ////////////////////////////////// exercie 7 ////////////////////////////////////
  