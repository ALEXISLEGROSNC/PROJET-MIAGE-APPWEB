# ☕ CoffeeScene | Simulation de scène 3D

## 📒 Description
CoffeeScene est une simulation 3D interactive utilisant Babylon.js. L'objectif est de manipuler des objets dans une scène comprenant un mug, du café et deux joueurs, tout en explorant les interactions physiques et les effets visuels. Ce projet met en œuvre des concepts avancés de rendu 3D, de physique et de gestion des entrées utilisateur.

## 🎮 Fonctionnalités
- Simulation physique avec Havok Physics.
- Scène 3D interactive avec un mug, du café et des joueurs.
- Gestion des ombres, des lumières et des matériaux.
- Détection des interactions entre les joueurs et les objets.
- Caméra dynamique suivant les objets de la scène.

## 🛠️ Setup
### Prérequis
- Un navigateur moderne avec WebGL activé (Chrome, Firefox, Edge, etc.).
- Un serveur local pour exécuter les fichiers HTML (par exemple, [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) pour Visual Studio Code).

### Installation
1. Clonez le dépôt :
   ```bash
   git clone https://github.com/votre-repo/coffeescene.git
   ```
2. Ouvrez le projet dans votre éditeur de code.
3. Lancez un serveur local et ouvrez le fichier `index.html` dans votre navigateur.

## 🧰 Stack Technique
- **Babylon.js** : Moteur de rendu 3D et gestion des interactions.
- **Havok Physics** : Simulation physique avancée.
- **JavaScript** : Gestion de la logique de la scène et des interactions.
- **HTML5** : Structure de la scène et des éléments.
- **CSS3** : Styles et mise en page.

<img style="height:30px;" src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Babylonjs_logo.svg" alt="Babylon.js" title="Babylon.js"/> <img style="height:30px;" src="https://i.pinimg.com/736x/13/40/7c/13407c12f50f08d328800c3caef43f61.jpg" alt="JavaScript" title="JavaScript"/> <img style="height:30px;" src="https://cdn-icons-png.flaticon.com/512/1216/1216733.png" alt="HTML5" title="HTML5"/> <img style="height:30px;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/CSS3_logo.svg/2048px-CSS3_logo.svg.png" alt="CSS3" title="CSS3"/>

## 🚀 Comment jouer ?
1. Lancez la scène en ouvrant le fichier `index.html` dans votre navigateur.
2. Interagissez avec la scène :
   - Cliquez sur la scène pour verrouiller le pointeur.
   - Utilisez les touches `Z`, `Q`, `S`, `D` pour déplacer le joueur 1.
   - Observez les interactions physiques entre les objets (mug, café, joueurs).
3. Explorez les effets visuels comme les ombres et les matériaux.

## 📊 Simulation physique
La simulation utilise Havok Physics pour gérer les interactions physiques :
- **Gravité** : Les objets tombent avec une gravité de -9.8 m/s².
- **Collisions** : Les joueurs et les objets interagissent avec des forces et des rebonds.
- **Matériaux** : Chaque objet a des propriétés physiques spécifiques (masse, restitution).

## 👨‍💻 Contributeurs

<table>
<thead>
<tr>
<th>Nom</th>
<th>Github</th>
<th>Contact</th>
</tr>
</thead>
<tbody>
<tr>
<td>Alexis LEGROS</td>
<td>@ALEXISLEGROSNC</td>
<td>alexis.legros@etu.unice.fr</td>
</tr>
<tr>
<td>Beatriz MOURA</td>
<td>@BeaMoura0906</td>
<td>beatriz.moura@etu.unice.fr</td>
</tr>
<tr>
<td>Damien PIZARRO</td>
<td>@DEUMSS</td>
<td>damien.pizarro@etu.unice.fr</td>
</tr>
</tbody>
</table>
<br>

## 📚 Contexte
Ce projet a été réalisé dans le cadre de l'UE Conception, Programmation et Développement - Application Web (SLUG602-1).  
Licence 3 MIAGE | Université Côte d'Azur 2024/2025.