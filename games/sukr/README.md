# ☕ Sukr | Qui du sucre blanc ou roux est superieur ?

## 📒 Description
Sukr est une simulation 3D interactive utilisant Babylon.js. Vous êtes un sucre dans une tasse et votre objectif est de faire tomber l'autre joueur qui est lui aussi un sucre pour gagner. La scène comprend un mug, du café (terrain), une table (sur laquelle il ne faut pas tomber) et deux joueurs. Ce projet met en œuvre des concepts de rendu 3D, de physique et de gestion des entrées utilisateur.

## 🎮 Fonctionnalités

- Simulation physique avec Havok Physics.

- Détection des interactions entre le joueur et l'autre joueur.

- Détection des interactions entre les joueurs et les objets.

- Scène 3D avec un mug, du café et deux sucres representant les deux joueurs.

- Detection et prise en compte des inputs

- Gameplay en multijoueurs local

- Gestion des ombres, des lumières et des matériaux.

- Affichage simple en camera fixe

- Detection du vainqueur

- Possibilité de rejouer un match

## 🛠️ Setup
### Prérequis
- Un navigateur moderne avec WebGL activé (Chrome, Firefox, Edge, etc.).
- Une solution locale pour exécuter les fichiers HTML (par exemple, [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) sur VSCode).

### Installation
1. Clonez le dépôt :
   ```bash
   git clone https://github.com/ALEXISLEGROSNC/BABYLONGame.git
   ```
   **/!\ ATTENTION ce projet a été intégré à la solution finale et a été modifié depuis ! La version correcte est disponible sur ce repository : https://github.com/ALEXISLEGROSNC/PROJET-MIAGE-APPWEB**

2. Ouvrez le projet dans votre éditeur de code.
3. Cette solution a été pensée pour être éxecutable sans serveur et fonctionne avec des CDN : lancez un "live server" ou toute autre solution permettant de lancer des solutions sans serveur 

## 🧰 Stack Technique
- **Babylon.js** : Moteur de rendu 3D et gestion des interactions.
- **Havok Physics** : Moteur physique intégré dans BabylonJs.
- **JavaScript** : Langage utilisé avec le framework BabylonJs.
- **HTML5** : Structure de la page.
- **CSS3** : Styles et mise en page.

<img style="height:30px;" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGF6gyJkDRLlGzxfunm4ny-XI2jJsv1or3kg&s" alt="Babylon.js" title="Babylon.js"/> <img style="height:30px;" src="https://i.pinimg.com/736x/13/40/7c/13407c12f50f08d328800c3caef43f61.jpg" alt="JavaScript" title="JavaScript"/> <img style="height:30px;" src="https://cdn-icons-png.flaticon.com/512/1216/1216733.png" alt="HTML5" title="HTML5"/> <img style="height:30px;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/CSS3_logo.svg/2048px-CSS3_logo.svg.png" alt="CSS3" title="CSS3"/>

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
- **Matériaux** : Chaque objet a des propriétés physiques spécifiques (masse, restitution) qui sont faciles à modifier.

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