// CREATION D'UNE FONCTION DE PARAMETRE N ET B, POUR POUVOIR CONVERTIR UN NOMBRE ENTIER EN UNE BASE SPECIFIEE. 

const nombreEntier = (n,b)=>{
  // STRUCTURE DE CONTROLE, POUR ETRE SUR QUE LE NOMBRE EN BASE SOIT COMPRIS ENTRE 2 ET 36.
   if(b<2 || b>36){
      
     return false
   }
   // UTILISATION DE LA METHODE TOsTRING AFIN DE CONVERTIR LES ELEMENTS.
   return n.toString(b)
  }
  
  // exemple d'utilisation 
  n =12
  b=16
  console.log(nombreEntier(n,b));
  // CELA AFFICHERA "c"
  
  // salut maher