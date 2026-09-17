# Cahier des charges fonctionnel — RED FLAG

## 1. Résumé

RED FLAG est une application web de transparence professionnelle destinée d’abord aux jeunes diplômés, stagiaires et candidats en Côte d’Ivoire. Elle permet de consulter des expériences anonymes sur des entreprises avant de postuler, signer un contrat ou accepter un stage.

Le produit ne doit pas être présenté comme une plateforme de dénonciation, mais comme un outil de décision : aider les utilisateurs à comprendre ce que d’anciens employés, stagiaires ou candidats ont réellement vécu.

Positionnement provisoire :

> Avant de signer, regarde ce que ceux d’avant ont vécu.

## 2. Objectif du projet

Créer un MVP web permettant de :

- rechercher une entreprise ;
- consulter sa réputation communautaire ;
- lire des témoignages anonymes ;
- publier une expérience structurée ;
- modérer les contenus sensibles ;
- permettre à une entreprise de répondre officiellement.

L’objectif du MVP est de valider :

- l’intérêt réel des jeunes utilisateurs ;
- leur volonté de publier des témoignages ;
- la capacité à collecter des données fiables ;
- la viralité possible du concept autour du “Red Flag Score”.

## 3. Utilisateurs cibles

### Cible principale

- Jeunes diplômés à Abidjan ;
- stagiaires ;
- étudiants en recherche de stage ;
- candidats juniors ;
- jeunes travailleurs ayant déjà vécu une mauvaise expérience professionnelle.

### Cible secondaire

- Employés souhaitant partager une expérience ;
- recruteurs ou entreprises souhaitant répondre ;
- écoles/communautés étudiantes qui veulent orienter leurs membres ;
- créateurs de contenu carrière/emploi.

### Non-cible MVP

- Grandes entreprises cherchant une solution RH complète ;
- job board généraliste ;
- plateforme juridique de plainte ;
- réseau social professionnel complet.

## 4. Problème à résoudre

Les jeunes candidats disposent rarement d’informations fiables avant d’accepter un poste, un stage ou une collaboration. Les informations fournies par les recruteurs sont souvent partielles, tandis que les expériences réelles circulent de manière informelle : bouche-à-oreille, groupes WhatsApp, discussions entre amis, réseaux sociaux.

Problèmes fréquents :

- salaires ou indemnités non payés à temps ;
- stages prolongés sans vraie embauche ;
- charges de travail excessives ;
- promesses non tenues ;
- management toxique ;
- absence de contrat clair ;
- horaires abusifs ;
- pression sur les jeunes diplômés qui “doivent accepter”.

RED FLAG transforme ces informations dispersées en base structurée, consultable et modérée.

## 5. Proposition de valeur

### Pour les candidats

- Vérifier une entreprise avant de postuler ou signer ;
- identifier les signaux faibles ;
- poser de meilleures questions en entretien ;
- éviter certaines mauvaises expériences ;
- partager anonymement ce qu’ils ont vécu.

### Pour les contributeurs

- Aider ceux qui arrivent après eux ;
- raconter une expérience sans exposer publiquement leur identité ;
- rendre visibles des pratiques récurrentes.

### Pour les entreprises

- Comprendre leur réputation réelle ;
- répondre à certains témoignages ;
- corriger publiquement des problèmes ;
- démontrer leur transparence.

## 6. Périmètre MVP

### Inclus dans le MVP

1. Application web responsive.
2. Authentification utilisateur simple.
3. Recherche d’entreprise.
4. Fiche entreprise.
5. Red Flag Score simple.
6. Liste de témoignages.
7. Formulaire “Raconter mon expérience”.
8. Publication anonyme côté public.
9. Vote “utile”.
10. Signalement d’un témoignage.
11. Modération admin avant ou après publication.
12. Réponse officielle entreprise, après validation admin.
13. Page d’accueil avec promesse, recherche et exemples.
14. Page “Top red flags” basée sur les scores.
15. Mentions de prudence : expérience déclarée, non vérifiée, vérifiée.

### Exclu du MVP

- Application mobile native ;
- système complet de job board ;
- avis sur les écoles ;
- messagerie interne ;
- abonnement entreprise ;
- paiement ;
- vérification automatique complexe ;
- scraping d’entreprises ;
- IA de résumé avancée ;
- notation publique d’individus nommément identifiés ;
- suppression payante d’avis.

### Évolutions futures

- Catégorie écoles ;
- offres d’emploi avec contexte réputationnel ;
- mode entretien : questions à poser au recruteur ;
- vérification documentaire plus poussée ;
- badges communautaires ;
- alertes sur une entreprise ;
- statistiques anonymisées pour entreprises ;
- expansion par pays/ville ;
- application mobile ;
- contenu TikTok intégré.

## 7. Rôles utilisateurs

### Visiteur non connecté

Peut :

- consulter la page d’accueil ;
- rechercher une entreprise ;
- voir une partie des fiches ;
- lire certains témoignages publics ;
- créer un compte.

Limites possibles : accès limité aux détails pour encourager l’inscription.

### Utilisateur connecté

Peut :

- consulter toutes les fiches publiques ;
- publier un témoignage ;
- voter “utile” ;
- signaler un contenu ;
- gérer son profil privé ;
- demander la suppression ou modification de son témoignage.

### Modérateur / admin

Peut :

- valider, masquer ou supprimer un témoignage ;
- traiter les signalements ;
- gérer les entreprises ;
- valider les réponses officielles ;
- marquer une expérience comme “vérifiée” si preuve suffisante ;
- suspendre un utilisateur abusif.

### Représentant entreprise

Peut :

- demander à revendiquer une fiche entreprise ;
- soumettre une réponse officielle à un témoignage ;
- proposer la correction d’informations factuelles sur la fiche.

Ne peut pas :

- supprimer directement un avis négatif ;
- identifier publiquement l’auteur d’un témoignage ;
- acheter une meilleure note ;
- modifier le Red Flag Score.

## 8. Parcours utilisateurs principaux

### Parcours 1 — Vérifier une entreprise avant un entretien

1. L’utilisateur arrive sur RED FLAG.
2. Il recherche le nom d’une entreprise.
3. Il ouvre la fiche entreprise.
4. Il consulte le score, les catégories et les témoignages.
5. Il identifie les problèmes récurrents.
6. Il repart avec une meilleure idée des questions à poser.

### Parcours 2 — Publier une expérience

1. L’utilisateur clique sur “Raconter mon expérience”.
2. Il recherche ou crée une entreprise.
3. Il indique son statut : stagiaire, CDD, CDI, freelance, alternant, consultant.
4. Il indique la période ou durée approximative.
5. Il note plusieurs critères.
6. Il décrit son principal red flag.
7. Il accepte les règles de publication.
8. Le témoignage passe en modération ou est publié selon politique choisie.

### Parcours 3 — Modérer un témoignage

1. Un nouveau témoignage arrive dans l’espace admin.
2. Le modérateur vérifie le langage, les accusations nominatives et les données sensibles.
3. Il accepte, demande modification, masque ou rejette.
4. Le statut est enregistré.

### Parcours 4 — Réponse entreprise

1. Une entreprise découvre sa fiche.
2. Elle demande à revendiquer la fiche.
3. L’admin vérifie la demande.
4. L’entreprise soumet une réponse à un témoignage.
5. L’admin vérifie le contenu.
6. La réponse apparaît sous le témoignage.

## 9. Fonctionnalités MVP

| Fonctionnalité | Description | Priorité | Critères d’acceptation |
|---|---|---:|---|
| Page d’accueil | Présente RED FLAG, promesse, recherche et CTA | P0 | Un visiteur comprend le concept en moins de 10 secondes |
| Recherche entreprise | Recherche par nom d’entreprise | P0 | L’utilisateur peut trouver une entreprise existante |
| Création entreprise | Créer une fiche si absente | P0 | Une nouvelle entreprise peut être proposée avec nom, ville, secteur |
| Fiche entreprise | Score, catégories, témoignages, CTA | P0 | La fiche affiche les infos essentielles et témoignages validés |
| Red Flag Score v1 | Score calculé à partir des notes et catégories | P0 | Le score est visible et explicable simplement |
| Témoignage structuré | Formulaire court avec statut, durée, notes, texte | P0 | Publication possible en moins de 2 minutes |
| Anonymat public | L’identité réelle n’apparaît pas publiquement | P0 | Aucun nom/email utilisateur n’est affiché sur les témoignages |
| Vote utile | Marquer un témoignage comme utile | P1 | Le compteur augmente et évite les votes multiples utilisateur |
| Signalement | Signaler un contenu problématique | P0 | Le signalement arrive côté admin |
| Admin modération | Liste des témoignages et actions de modération | P0 | Admin peut approuver/masquer/rejeter |
| Réponse entreprise | Réponse officielle sous témoignage | P1 | Réponse soumise, validée puis affichée |
| Statut de vérification | Non vérifié / déclaré / vérifié | P1 | Le statut apparaît clairement sur les témoignages |
| Top Red Flags | Classement des entreprises les plus risquées | P1 | Classement basé sur score + nombre minimum de témoignages |
| Règles de publication | Page expliquant ce qui est accepté/refusé | P0 | Les règles sont accessibles avant publication |

## 10. Règles métier

### Positionnement et langage

- RED FLAG ne publie pas “cette entreprise est mauvaise”.
- RED FLAG affiche “des utilisateurs rapportent…” ou “selon les expériences publiées…”.
- Les contenus doivent porter sur des expériences professionnelles, pas sur des attaques personnelles.
- Les noms de personnes physiques doivent être interdits ou masqués.

### Témoignages

Un témoignage doit contenir :

- entreprise ;
- statut professionnel ;
- durée approximative ;
- période approximative ;
- notes par catégorie ;
- description de l’expérience ;
- confirmation que l’auteur déclare avoir eu une expérience réelle.

### Catégories de notation MVP

- Paiement / rémunération ;
- management ;
- charge de travail ;
- horaires ;
- respect des engagements ;
- environnement / collègues ;
- formation / apprentissage.

### Red Flag Score v1

Le score doit être compréhensible, même s’il reste simple au MVP.

Proposition MVP :

- convertir les notes en score sur 100 ;
- pondérer plus fortement paiement, management et respect des engagements ;
- appliquer un facteur de confiance selon le nombre de témoignages ;
- afficher un avertissement si le nombre de témoignages est faible.

Exemple de pondération :

- Paiement / rémunération : 25 % ;
- management : 20 % ;
- respect des engagements : 20 % ;
- charge de travail : 15 % ;
- horaires : 10 % ;
- environnement : 5 % ;
- formation : 5 %.

### Seuils visuels provisoires

- 0–39 : rouge / risque élevé ;
- 40–64 : orange / vigilance ;
- 65–79 : jaune ou vert clair / correct ;
- 80–100 : vert / favorable.

### Modération

À refuser ou modifier :

- insultes ;
- accusations criminelles non formulées prudemment ;
- noms de personnes physiques ;
- numéros de téléphone, adresses personnelles, emails ;
- documents confidentiels ;
- menaces ;
- appels au harcèlement ;
- contenus manifestement hors sujet ;
- doublons abusifs.

### Vérification

Statuts possibles :

- **Expérience déclarée** : l’utilisateur affirme avoir travaillé/candidaté.
- **Expérience vérifiée** : l’utilisateur a fourni un indice privé acceptable.
- **Non vérifiée** : ancien contenu ou information insuffisante.

Les preuves ne doivent jamais être affichées publiquement.

### Réponse entreprise

- Une entreprise peut répondre publiquement.
- La réponse doit être modérée.
- La réponse ne doit pas révéler l’identité supposée de l’auteur.
- L’entreprise peut contester un fait, mais pas supprimer directement un avis.

## 11. Pages / écrans nécessaires

### Public

1. Page d’accueil.
2. Recherche / résultats.
3. Fiche entreprise.
4. Liste des témoignages d’une entreprise.
5. Formulaire de témoignage.
6. Connexion / inscription.
7. Règles de publication.
8. Confidentialité / conditions d’utilisation.
9. Top Red Flags.

### Utilisateur connecté

1. Tableau de bord personnel simple.
2. Mes témoignages.
3. Modifier / retirer une contribution.

### Admin

1. Dashboard admin.
2. File de modération témoignages.
3. Signalements.
4. Gestion entreprises.
5. Demandes de revendication entreprise.
6. Réponses entreprise à valider.

### Entreprise

1. Demande de revendication.
2. Espace minimal pour soumettre une réponse.

## 12. Données à gérer

### Utilisateur

- id ;
- email ;
- pseudo interne ;
- rôle ;
- statut vérification email ;
- date de création.

### Entreprise

- id ;
- nom ;
- slug ;
- ville ;
- pays ;
- secteur ;
- description courte ;
- statut revendiqué ou non ;
- score calculé ;
- nombre de témoignages.

### Témoignage

- id ;
- entreprise_id ;
- user_id privé ;
- statut professionnel ;
- durée ;
- période approximative ;
- notes par catégorie ;
- titre ;
- texte ;
- red flags sélectionnés ;
- statut de publication ;
- statut de vérification ;
- nombre de votes utiles ;
- date de création.

### Signalement

- id ;
- testimonial_id ;
- user_id ;
- motif ;
- commentaire ;
- statut ;
- date.

### Réponse entreprise

- id ;
- company_id ;
- testimonial_id ;
- representative_id ;
- texte ;
- statut modération ;
- date.

## 13. Contraintes

### Produit

- MVP web d’abord, responsive mobile.
- Ton jeune mais fiable.
- Expérience de publication très courte.
- Priorité à la confiance et à la sécurité.

### Juridique / réputation

- Éviter la diffamation.
- Interdire les attaques personnelles.
- Prévoir droit de réponse.
- Prévoir signalement.
- Afficher des conditions d’utilisation claires.
- Prévoir une modération sérieuse dès le début.

### Technique

- Authentification sécurisée.
- Anonymat public strict.
- Base de données structurée pour évolution future vers écoles/job board.
- Journalisation des actions de modération.
- Protection contre spam et doublons.

### Business

- Gratuit pour les utilisateurs au MVP.
- Aucun paiement pour supprimer un avis.
- Monétisation future possible via profils revendiqués, offres d’emploi, analytics anonymisés, marque employeur.

## 14. Risques / points à clarifier

### Risques majeurs

1. Diffamation ou menaces d’entreprises.
2. Faux témoignages / règlements de comptes.
3. Faible volume initial de contributions.
4. Difficulté à vérifier les expériences sans exposer les utilisateurs.
5. Image trop négative si le branding est uniquement “dénonciation”.
6. Modération trop lourde pour une petite équipe.
7. Concurrent local comme AvisJob.ci déjà positionné.

### Décisions à prendre maintenant

1. MVP entreprises uniquement ou entreprises + écoles ?
2. Publication immédiate avec modération après signalement, ou modération avant publication ?
3. Niveau d’accès visiteur : fiches ouvertes ou inscription obligatoire pour lire ?
4. Le Red Flag Score doit-il être présenté comme score de risque ou score de confiance ?
5. Quels types de preuves accepter pour “expérience vérifiée” ?

### Recommandations initiales

- MVP entreprises uniquement.
- Modération avant publication pour les premiers mois.
- Lecture partiellement ouverte aux visiteurs, contribution réservée aux inscrits.
- Présenter le score comme “Red Flag Score” mais expliquer qu’il indique le niveau de vigilance communautaire.
- Vérification manuelle simple au début : email pro ancien, badge, contrat masqué, fiche de paie masquée, attestation, capture anonymisée — jamais affichés publiquement.

## 15. Validation Abel

- Statut : EN_ATTENTE_VALIDATION_CDC
- Décision : À valider / À modifier / Refusé
- Commentaires :
