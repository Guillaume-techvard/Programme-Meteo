
  // //////////////////////////  // EXERCICE 2//////////////////////////////////
  

  
  const nombrePremier = (num)=>{
    // VERIFICATION QUE LA CONDITION INFERIEUR A 2 N'EST PAS REALISER CAR IL N'YA PAS DE NOMBRE ENTIER INFERIEUR A 2
   if (num<2){
    return false
   }
  //  FAIRE UNE BOUCLE POUR DIVISER NUM PAR TOUS LES NOMBRES JUSQU'A SA RACINE CAREE.
  
    for(i=2; i<=Math.sqrt(num); i++){
      // SI LE MODULO EST 0 ALORS IL EST DIVISIBLE PAR AUTRE CHOSE ET DONC N'EST PAS PREMIER
      if(num%i===0){
        return false;
      }
    }
    return true;
   }
  
  // CREATION DE LA FONCTION DE GENERATION DE NOMBRE
  const generation = (n)=>{
    
  let tableau=[];
  let num =2;
  // CREATION D'UNE BOUCLE POUR FAIRE LA RECHERCHE DE TOUS LES NOMBRES PREMIERS JUSAU'A N.
  while(tableau.length<n){
    // VERIFICATION DE LA FONCTION POUR SAVOIR SI ELLE EST VRAIE ALORS LE NUMERO EST DIRECTEMENT ENVOYE DANS UN TABLEAU.
    if(nombrePremier(num)){
      tableau.push(num);
    }
    // INCREMENTATION DE LA FONCTION.
    num++;
  }
  return tableau
  }
  console.log(generation(10));
  
 