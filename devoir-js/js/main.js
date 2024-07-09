document.addEventListener('DOMContentLoaded', () => {

 

  // NOUS AVONS ICI TOUTES LES VARIABLES PRÉPARÉES AFIN DE POUVOIR TRAVAILLER SUR LES BOUTONS ET LES INPUTS.
  const taskInput = document.getElementById('taskInput');
  const taskDate = document.getElementById('taskDate');
  const taskTime = document.getElementById('taskTime');
  const taskCategory = document.getElementById('taskCategory');  // Cet élément doit être un input de type texte
  const addTaskButton = document.getElementById('addTaskButton');
  const taskList = document.getElementById('taskList');
  const clearAllTasksButton = document.getElementById('clearAllTasksButton');

  // Fonction afin de savoir combien de taches il y a pour pouvoir savoir quand faire apparaître le bouton supprimer. 
  const checkTaskCount = () => {
    // Elle compte le nombre d'éléments <li> présents dans la liste des tâches (taskList).
    const taskCount = taskList.querySelectorAll('li').length;
    // En fonction de ce nombre, elle décide d'afficher ou de cacher le bouton "supprimer toutes les tâches" (clearAllTasksButton).
    clearAllTasksButton.style.display = (taskCount >= 2) ? 'block' : 'none';
  };

  addTaskButton.addEventListener('click', () => {
    // Création de la condition, que chaque champ de réponse soit rempli, et suppression des espaces blancs potentiels.
    if (taskInput.value.trim() && taskDate.value && taskTime.value && taskCategory.value.trim()) {
      // Création d'un objet qui contiendra les données.
      const task = {
        date: taskDate.value,
        time: taskTime.value,
        category: taskCategory.value.trim(),
        text: taskInput.value.trim(),
        completed: false
      };
      // Appel de la fonction afin de rajouter les événements et qu'ils soient visibles sur le DOM.
      addTaskToDOM(task);
      // Mise à jour du storage.
      saveTasks();
      // Remise à zéro des entrées afin de pouvoir définir de nouvelles tâches.
      taskInput.value = '';
      taskDate.value = '';
      taskTime.value = '';
      taskCategory.value = 'Travail';
    }
  });

  // Charger les tâches depuis le stockage local
  const loadTasks = () => {
    // la ligne suivante me permet de transformer en tableau d'objet la chaîne de caractères contenue dans le storage.
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // la ligne suivante me permet de parcourir les éléments du tableau tasks, et que chaque élément task représente un élément que l'on a nommé de paramètre "task"
    tasks.forEach(task => {
      // Cette boucle forEach parcourt chaque élément du tableau tasks. Pour chaque tâche, elle appelle la fonction addTaskToDOM(task), qui ajoute la tâche au DOM, c'est-à-dire à la liste affichée sur la page.
      addTaskToDOM(task);
    });
    // Cette ligne appelle la fonction updateRemainingTime pour mettre à jour le temps restant pour chaque tâche affichée.
    checkTaskCount();
  };

  // Ajouter une tâche au DOM
  const addTaskToDOM = (task) => {
    // CREATION D'UNE VARIABLE "LI" A QUI L'ON VA ATTRIBUER UN ELEMENT HTML "LI".
    const li = document.createElement('li');

    // CETTE LIGNE ME PERMET DE RAJOUTER DIRECTEMENT DANS LE HTML LES ELEMENTS QUE JE LUI AURAIT DONNÉS. 
    // ICI J'AI CONCATÉNÉ LES ELEMENTS DE LA DATE, DE L'HEURE ET AINSI QUE LE TEXTE DE MA TÂCHE.
    li.innerHTML = `
      <span class="task-date-time" contenteditable="true">${task.date} ${task.time}</span>
      <span contenteditable="true">${task.category}</span>
      <span contenteditable="true">${task.text}</span>
      <span class="remaining-time"></span> <!-- Ajout du conteneur pour le temps restant -->
    `;
    // LA LIGNE SUIVANTE DONNE LA CONDITION D'AJOUTER LE STYLE CSS DE LA CLASSE "COMPLETED" SI J'AI COMPLETÉ LA TÂCHE.
    if (task.completed) {
      li.classList.add('completed');
    }

    // Bouton de suppression
    // LA LIGNE SUIVANTE S'OCCUPE DE CRÉER UNE VARIABLE OÙ L'ON Y METTRA UN BOUTON QUE L'ON A CRÉÉ À PARTIR DU JAVASCRIPT.
    const deleteButton = document.createElement('button');
    // LA LIGNE SUIVANTE ME PERMET D'AFFICHER LE TEXTE PRÉSENT SUR LE BOUTON DANS LA PAGE WEB.
    deleteButton.textContent = 'Supprimer';
    // CREATION D'UN ÉVÈNEMENT LORS DU CLICK SUR LE BOUTON SUPPRIMER
    deleteButton.addEventListener('click', (event) => {
      // LA LIGNE SUIVANTE ME PERMET D'EMPÊCHER LES ACTIONS SUR LES PARENTS DU BOUTON DELETE QUE L'ON VIENT DE CRÉER, C'EST À DIRE ICI "LI".
      event.stopPropagation();
      // LA LIGNE SUIVANTE TE PERMET DE RETIRER L'ENFANT DE LI, DONC LA TÂCHE. 
      taskList.removeChild(li);
      // CETTE LIGNE EST LÀ POUR METTRE À JOUR LES CHANGEMENTS DANS LE LOCAL STORAGE
      saveTasks();
      checkTaskCount();
    });

    // Ajout des boutons de modification et de duplication
    const editButton = document.createElement('button');
    editButton.textContent = 'Modifier';
    editButton.addEventListener('click', (event) => {
      event.stopPropagation();
      taskInput.value = task.text;
      taskDate.value = task.date;
      taskTime.value = task.time;
      taskCategory.value = task.category;
      taskList.removeChild(li);
      saveTasks();
      checkTaskCount();
    });

    const duplicateButton = document.createElement('button');
    duplicateButton.textContent = 'Dupliquer';
    duplicateButton.addEventListener('click', (event) => {
      event.stopPropagation();
      const duplicateTask = { ...task };
      addTaskToDOM(duplicateTask);
      saveTasks();
      checkTaskCount();
    });

    // Ajout des boutons au li
    li.appendChild(deleteButton);
    li.appendChild(editButton);
    li.appendChild(duplicateButton);

    // Marquer comme terminé
    li.addEventListener('click', () => {
      li.classList.toggle('completed');
      saveTasks();
    });

    // Ajouter des écouteurs d'événements pour sauvegarder les modifications lorsqu'un champ éditable perd le focus
    li.querySelectorAll('[contenteditable="true"]').forEach(span => {
      span.addEventListener('blur', saveTasks);
    });

    // Ajouter le li au taskList dans le HTML afin de mettre à jour les tâches si elles ont été simplement rentrées ou si elles ont été effacées.
    taskList.appendChild(li);
    checkTaskCount();
  };

  // Sauvegarder les tâches dans le stockage local
  const saveTasks = () => {
    // Je crée un tableau qui va stocker toutes les tâches que je vais rajouter à taskList qui est la classe ou les taches vont s'afficher.
    const tasks = [];
    // La ligne suivante me permet de parcourir tous les li présents dans taskList s'il y en a.
    taskList.querySelectorAll('li').forEach(li => {
      // LA LIGNE SUIVANTE ME PERMET D'ATTRIBUER LES SPANS QUE J'AI DÉJÀ DÉFINI ULTÉRIEUREMENT À "LI" À LA VARIABLE "SPANS".
      const spans = li.querySelectorAll('span');
      // LA LIGNE SUIVANTE EST LÀ POUR RAJOUTER LES ELEMENTS SUIVANTS DANS LE TABLEAU TASKS.
      tasks.push({
        // LES DEUX PROCHAINES LIGNES SONT LÀ POUR ASSOCIER CORRECTEMENT LES DONNÉES À LEURS CLÉS.
        date: spans[0].textContent.split(' ')[0],
        // ATTENTION, ICI LE SPLIT EST OBLIGATOIRE CAR J'AI MIS SUR LA MÊME LIGNE LA DATE ET L'HEURE ALORS IL ME PERMET DE FAIRE UNE SÉPARATION AFIN DE FAIRE COMPRENDRE À L'ORDINATEUR QUE CE SONT DES DONNÉES DIFFÉRENTES.
        time: spans[0].textContent.split(' ')[1],
        // Deuxième élément de la collection.
        category: spans[1].textContent,
        text: spans[2].textContent,
        // LA LIGNE SUIVANTE NOUS PERMET DE SAVOIR SI "LI" A REÇU LA CLASSE "COMPLETED".
        completed: li.classList.contains('completed')
      });
    });
    // On convertit le tableau tasks en une chaîne de caractères JSON et on le sauvegarde dans le stockage local du navigateur sous la clé 'tasks'.
    localStorage.setItem('tasks', JSON.stringify(tasks));
    checkTaskCount();
  };



  // Mettre à jour le temps restant toutes les secondes
 
  loadTasks();

  // bouton de la suppression totale de toutes les taches.
  clearAllTasksButton.addEventListener('click', () => {
    // je fais une boucle, tant que tasklist a un enfant alors je réalise l'action après
    while (taskList.firstChild) {
      // retrait des enfants de la liste et du stockage.
      taskList.removeChild(taskList.firstChild);
    }
    localStorage.removeItem('tasks');
    checkTaskCount();
  });

});
