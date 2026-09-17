# UX / Wireframe — RED FLAG

## 1. Objectif UX

L’UX de RED FLAG doit permettre à un jeune candidat de répondre très vite à une question :

> Est-ce que je dois me méfier de cette entreprise avant de postuler, signer ou aller en entretien ?

L’expérience doit être :

- **rapide** : recherche visible dès l’arrivée ;
- **mobile-first** : la majorité des utilisateurs viendront probablement depuis TikTok, WhatsApp, Instagram ou Discord ;
- **sociale** : feed, témoignages courts, votes utiles, classement ;
- **prudente** : langage juridiquement maîtrisé, pas d’accusations gratuites ;
- **crédible** : scores expliqués, modération, droit de réponse, statut de vérification ;
- **simple à contribuer** : publier une expérience doit prendre moins de 2 minutes.

Le produit doit garder un équilibre :

- extérieur : ton jeune, viral, direct ;
- intérieur : témoignages structurés, modération sérieuse, confiance.

## 2. Architecture des pages

### Pages publiques

1. **Accueil** `/`
2. **Recherche** `/recherche?q=`
3. **Fiche entreprise** `/entreprises/[slug]`
4. **Témoignages entreprise** `/entreprises/[slug]/temoignages`
5. **Top Red Flags** `/top-red-flags`
6. **Raconter mon expérience** `/temoigner`
7. **Connexion / inscription** `/auth`
8. **Règles de publication** `/regles`
9. **Confidentialité** `/confidentialite`
10. **Conditions d’utilisation** `/conditions`

### Pages utilisateur connecté

1. **Mon espace** `/app`
2. **Mes témoignages** `/app/mes-temoignages`
3. **Modifier un témoignage** `/app/mes-temoignages/[id]`
4. **Paramètres compte** `/app/parametres`

### Pages entreprise

1. **Revendiquer une fiche** `/entreprises/[slug]/revendiquer`
2. **Soumettre une réponse** `/entreprises/[slug]/repondre/[temoignageId]`

### Pages admin

1. **Dashboard admin** `/admin`
2. **Modération témoignages** `/admin/temoignages`
3. **Signalements** `/admin/signalements`
4. **Entreprises** `/admin/entreprises`
5. **Demandes de revendication** `/admin/revendications`
6. **Réponses entreprise** `/admin/reponses`

## 3. Navigation principale

### Navigation publique desktop

Header :

- Logo : `🚩 RED FLAG`
- Recherche rapide
- Top Red Flags
- Raconter mon expérience
- Connexion / profil

CTA principal :

- `Raconter mon expérience`

CTA secondaire :

- `Rechercher une entreprise`

### Navigation publique mobile

Bottom navigation :

- Accueil
- Recherche
- Top
- Témoigner
- Profil

Le bouton `Témoigner` doit rester très visible.

### Navigation admin

Sidebar :

- Dashboard
- Témoignages à modérer
- Signalements
- Entreprises
- Revendications
- Réponses entreprise

## 4. Parcours utilisateur MVP

### Parcours 1 — Vérifier une entreprise

Objectif : aider un candidat à se faire une idée avant un entretien ou une signature.

1. L’utilisateur arrive sur la page d’accueil.
2. Il voit une barre de recherche centrale : `Cherche une entreprise avant de signer`.
3. Il tape le nom de l’entreprise.
4. Il arrive sur les résultats.
5. Il clique sur l’entreprise.
6. Il voit : score, nombre de témoignages, catégories problématiques, témoignages récents.
7. Il peut lire plus de témoignages ou voir les questions utiles à poser en entretien.

Succès UX : en moins de 30 secondes, l’utilisateur doit savoir s’il y a des signaux de vigilance.

### Parcours 2 — Publier une expérience

Objectif : collecter un témoignage structuré et modérable.

1. L’utilisateur clique sur `Raconter mon expérience`.
2. S’il n’est pas connecté, il crée un compte ou se connecte.
3. Il recherche ou ajoute une entreprise.
4. Il indique son statut : stagiaire, CDI, CDD, freelance, alternant, consultant.
5. Il indique la durée approximative.
6. Il note les catégories.
7. Il sélectionne les red flags principaux.
8. Il écrit un témoignage court.
9. Il accepte les règles.
10. Il soumet.
11. Le système confirme : `Merci, ton témoignage sera vérifié avant publication.`

Succès UX : formulaire terminé en moins de 2 minutes.

### Parcours 3 — Lire un témoignage et voter utile

1. L’utilisateur est sur une fiche entreprise.
2. Il lit un témoignage.
3. Il voit son statut : expérience déclarée / vérifiée.
4. Il clique sur `Utile`.
5. Le compteur augmente.
6. Il peut signaler si le contenu semble abusif.

### Parcours 4 — Signaler un témoignage

1. L’utilisateur clique sur `Signaler`.
2. Il choisit un motif : faux témoignage, insulte, données personnelles, attaque nominative, hors sujet, autre.
3. Il ajoute un commentaire facultatif.
4. Le signalement est envoyé à l’admin.

### Parcours 5 — Réponse entreprise

1. Une entreprise ouvre sa fiche.
2. Elle clique sur `Cette entreprise est la vôtre ?`.
3. Elle soumet une demande de revendication.
4. Après validation admin, elle peut répondre à un témoignage.
5. La réponse est modérée avant publication.

### Parcours 6 — Modération admin

1. L’admin ouvre la file des témoignages.
2. Il voit les contenus en attente avec score de risque éditorial.
3. Il peut approuver, demander modification, masquer ou rejeter.
4. Les actions sont historisées.

## 5. Wireframes textuels

## Écran : Accueil

### Objectif

Faire comprendre RED FLAG en 10 secondes et pousser vers la recherche ou la contribution.

### Wireframe desktop

```text
┌──────────────────────────────────────────────────────────────┐
│ 🚩 RED FLAG        Top Red Flags   Règles   Connexion        │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│       Avant de signer, regarde ce que ceux d’avant           │
│       ont vécu.                                              │
│                                                              │
│       [ Cherche une entreprise...                 🔎 ]       │
│                                                              │
│       [Raconter mon expérience]  [Voir le top red flags]     │
│                                                              │
│       +120 expériences partagées • Abidjan d’abord           │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  🚨 Ça revient souvent                                       │
│                                                              │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐          │
│  │ Paiement     │ │ Stage long   │ │ Management   │          │
│  │ en retard    │ │ sans contrat │ │ toxique      │          │
│  └──────────────┘ └──────────────┘ └──────────────┘          │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  Témoignages récents                                         │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ 🏢 Entreprise ABC                                      │  │
│  │ “On m’avait promis 3 mois de stage...”                 │  │
│  │ 🚩 Stage prolongé • 💬 12 utiles                       │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Contenu

- Promesse principale.
- Recherche entreprise.
- CTA témoignage.
- Red flags fréquents.
- Témoignages récents anonymisés.
- Explication courte : “RED FLAG affiche des expériences déclarées par la communauté, modérées avant publication.”

### Actions principales

- Rechercher.
- Raconter mon expérience.
- Voir top red flags.

### États

- Chargement : skeleton sur témoignages récents.
- Vide : afficher “Les premiers témoignages arrivent bientôt.”
- Erreur : message simple + bouton réessayer.

---

## Écran : Recherche / résultats

### Objectif

Permettre de trouver rapidement une entreprise ou de proposer une nouvelle fiche.

```text
┌──────────────────────────────────────────────────────────────┐
│ 🚩 RED FLAG                    [ Recherche rapide... ]       │
├──────────────────────────────────────────────────────────────┤
│ Recherche : “agency”                                          │
│                                                              │
│ Filtres : [Ville] [Secteur] [Score] [Nb témoignages]         │
│                                                              │
│ ┌────────────────────────────────────────────────────────┐   │
│ │ 🏢 Agency XYZ                         🔴 31/100        │   │
│ │ Abidjan • Marketing • 18 témoignages                   │   │
│ │ Red flags fréquents : paiement, horaires, management   │   │
│ │ [Voir la fiche]                                        │   │
│ └────────────────────────────────────────────────────────┘   │
│                                                              │
│ ┌────────────────────────────────────────────────────────┐   │
│ │ 🏢 Agency Plus                        🟠 58/100        │   │
│ │ Abidjan • Communication • 5 témoignages                │   │
│ └────────────────────────────────────────────────────────┘   │
│                                                              │
│ Tu ne trouves pas l’entreprise ?                             │
│ [Proposer une fiche entreprise]                              │
└──────────────────────────────────────────────────────────────┘
```

### Actions principales

- Ouvrir une fiche.
- Filtrer.
- Proposer une entreprise.

### États

- Aucun résultat : CTA `Proposer cette entreprise`.
- Peu de données : afficher “Score à confirmer — peu de témoignages”.

---

## Écran : Fiche entreprise

### Objectif

Afficher une synthèse claire de la réputation communautaire.

```text
┌──────────────────────────────────────────────────────────────┐
│ 🚩 RED FLAG                    [ Recherche rapide... ]       │
├──────────────────────────────────────────────────────────────┤
│ 🏢 Entreprise XYZ                                             │
│ Abidjan • Tech • Fiche non revendiquée                       │
│                                                              │
│ ┌──────────────────┐  ┌───────────────────────────────────┐  │
│ │ 🔴 34 / 100      │  │ Basé sur 42 expériences           │  │
│ │ RED FLAG SCORE   │  │ Dernier témoignage : il y a 12 j  │  │
│ │ Vigilance élevée │  │ Score fiable : moyen              │  │
│ └──────────────────┘  └───────────────────────────────────┘  │
│                                                              │
│ Pourquoi ce score ?                                          │
│ 🔴 Paiement en retard : 43% des témoignages                  │
│ 🔴 Management difficile : 35%                                │
│ 🟠 Horaires excessifs : 29%                                  │
│                                                              │
│ Notes par catégorie                                          │
│ 💰 Paiement              1.8/5                               │
│ 👔 Management            2.1/5                               │
│ ⏰ Horaires              2.4/5                               │
│ 🤝 Environnement         3.0/5                               │
│                                                              │
│ [Raconter mon expérience] [Cette entreprise est la vôtre ?]  │
├──────────────────────────────────────────────────────────────┤
│ Témoignages récents                                          │
│                                                              │
│ ┌────────────────────────────────────────────────────────┐   │
│ │ Expérience déclarée • Stagiaire • 6 mois              │   │
│ │ “Le stage devait durer 3 mois, mais...”                │   │
│ │ 🚩 Stage prolongé  💰 Paiement                         │   │
│ │ 👍 24 utiles   Signaler                                │   │
│ └────────────────────────────────────────────────────────┘   │
│                                                              │
│ [Voir tous les témoignages]                                  │
└──────────────────────────────────────────────────────────────┘
```

### Contenu

- Nom entreprise.
- Ville / secteur.
- Statut revendiqué.
- Red Flag Score.
- Niveau de confiance du score.
- Explication du score.
- Notes par catégorie.
- Témoignages récents.
- Droit de réponse si disponible.

### Actions principales

- Raconter une expérience.
- Voter utile.
- Signaler.
- Revendiquer la fiche.
- Voir tous les témoignages.

### États

- Aucun témoignage : “Aucune expérience publiée pour l’instant. Sois le premier à contribuer.”
- Score faible en données : “Score provisoire — moins de 5 témoignages.”
- Entreprise revendiquée : badge `Profil officiel`.

---

## Écran : Formulaire témoignage

### Objectif

Collecter un témoignage utile, structuré et modérable.

### Structure en étapes

```text
Étape 1/5 — L’entreprise
[ Cherche l’entreprise... ]
[+ Proposer une nouvelle entreprise]

Étape 2/5 — Ton expérience
Statut : ○ Stagiaire ○ CDI ○ CDD ○ Freelance ○ Alternant
Durée : [ 6 mois ]
Période : [ 2025 ] ou [Il y a moins d’un an]

Étape 3/5 — Notes
💰 Paiement              ☆ ☆ ☆ ☆ ☆
👔 Management            ☆ ☆ ☆ ☆ ☆
⏰ Horaires              ☆ ☆ ☆ ☆ ☆
📌 Respect engagements   ☆ ☆ ☆ ☆ ☆
🤝 Environnement         ☆ ☆ ☆ ☆ ☆
🎓 Formation             ☆ ☆ ☆ ☆ ☆

Étape 4/5 — Red flags
☐ Paiement en retard
☐ Stage prolongé
☐ Heures sup non payées
☐ Promesses non tenues
☐ Management toxique
☐ Contrat flou
☐ Autre

Étape 5/5 — Ton témoignage
Titre court : [ ... ]
Explique ce qui s’est passé :
[ Zone de texte ]

☑ Je confirme que cette expérience est réelle.
☑ Je comprends que les noms de personnes et insultes sont interdits.

[Envoyer pour modération]
```

### Règles UX

- Afficher une barre de progression.
- Sauvegarder le brouillon localement si possible.
- Expliquer que l’identité ne sera pas affichée publiquement.
- Prévenir que les preuves éventuelles ne seront jamais publiées.
- Bloquer ou alerter si le texte contient un nom propre probable ou une insulte.

### États

- Succès : “Merci. Ton témoignage est en attente de modération.”
- Erreur : champs à corriger.
- Non connecté : redirection auth puis retour formulaire.

---

## Écran : Tous les témoignages d’une entreprise

### Objectif

Permettre de parcourir les expériences et filtrer les signaux.

```text
Témoignages — Entreprise XYZ

Filtres : [Statut] [Red flag] [Vérifié] [Date] [Utile]

Résumé :
- 42 expériences
- 18 mentionnent paiement
- 14 mentionnent management
- 9 expériences vérifiées

[Liste de cartes témoignages]
```

### Actions

- Filtrer.
- Trier.
- Voter utile.
- Signaler.
- Lire réponse entreprise.

---

## Écran : Top Red Flags

### Objectif

Créer une page virale et partageable tout en restant prudente.

```text
🚨 Top Red Flags à Abidjan

Classement basé sur les expériences publiées par la communauté.
Les scores faibles avec peu de témoignages sont affichés comme provisoires.

1. 🔴 Entreprise A — 28/100 — 36 témoignages
   Red flags fréquents : paiement, horaires

2. 🔴 Entreprise B — 33/100 — 18 témoignages
   Red flags fréquents : management, promesses

3. 🟠 Entreprise C — 48/100 — 11 témoignages
```

### Règles UX

- Ne pas afficher dans le top les entreprises avec moins d’un seuil minimum de témoignages, par exemple 5.
- Ajouter un disclaimer clair.
- Permettre le partage social.

---

## Écran : Connexion / inscription

### Objectif

Créer un compte rapidement sans casser le parcours.

Options MVP :

- email + mot de passe ;
- magic link si choisi à la stack technique ;
- Google possible en v2.

Message clé :

> Ton identité n’est pas affichée publiquement. Elle sert à protéger la plateforme contre les abus.

---

## Écran : Mon espace

### Objectif

Permettre à l’utilisateur de gérer ses contributions.

```text
Mon espace

Mes témoignages
- En attente : 1
- Publiés : 3
- À modifier : 1

[Voir mes témoignages]
[Paramètres]
```

---

## Écran : Admin — Modération témoignages

### Objectif

Traiter efficacement les contenus avant publication.

```text
Admin / Témoignages à modérer

Filtres : [En attente] [Signalé] [Entreprise] [Risque élevé]

┌──────────────────────────────────────────────────────────────┐
│ Entreprise XYZ • Stagiaire • 6 mois                          │
│ Red flags : paiement, stage prolongé                         │
│                                                              │
│ “...”                                                        │
│                                                              │
│ Alertes système :                                            │
│ - nom propre détecté                                         │
│ - accusation sensible                                        │
│                                                              │
│ [Approuver] [Demander modification] [Masquer] [Rejeter]      │
└──────────────────────────────────────────────────────────────┘
```

### Actions admin

- Approuver.
- Demander modification.
- Rejeter.
- Masquer.
- Modifier tags/catégories.
- Marquer comme vérifié.
- Voir historique.

---

## Écran : Revendication entreprise

### Objectif

Permettre à une entreprise de demander un accès officiel sans contrôler les avis.

```text
Cette entreprise est la vôtre ?

Vous pouvez demander à revendiquer cette fiche pour :
- corriger des informations factuelles ;
- répondre officiellement à certains témoignages ;
- suivre les retours de la communauté.

Vous ne pouvez pas :
- supprimer un avis parce qu’il est négatif ;
- identifier publiquement un auteur ;
- modifier votre score.

[Demander la revendication]
```

## 6. Responsive mobile / desktop

### Mobile

Priorités :

- recherche très visible ;
- cartes courtes ;
- CTA témoignage accessible ;
- bottom navigation ;
- filtres sous forme de chips horizontales ;
- formulaire en étapes ;
- témoignages lisibles sans gros tableaux.

### Desktop

Priorités :

- layout en deux colonnes sur fiche entreprise : score à gauche, témoignages à droite ;
- filtres latéraux sur les listes ;
- admin plus dense avec tableaux/cartes ;
- recherche persistante dans le header.

### Breakpoints proposés

- Mobile : 360–767 px
- Tablet : 768–1023 px
- Desktop : 1024 px et plus

## 7. Points d’attention

### 1. Ne pas créer un produit juridiquement dangereux

Les formulations doivent éviter les affirmations absolues. Préférer :

- “Des expériences rapportent…”
- “Plusieurs témoignages mentionnent…”
- “Score basé sur les contributions publiées…”

Éviter :

- “Entreprise toxique” comme verdict officiel ;
- “Cette entreprise vole ses employés” ;
- “À fuir absolument” dans les pages officielles produit.

### 2. Gérer le faible volume initial

Si une entreprise a peu de témoignages, l’interface doit éviter les conclusions fortes.

Afficher :

- “Score provisoire” ;
- “Peu de données disponibles” ;
- “Aide la communauté en partageant ton expérience.”

### 3. Conserver le côté viral sans perdre la confiance

Le feed et les top pages peuvent être fun, mais les fiches et témoignages doivent rester sérieux.

Règle :

- Page marketing/feed : ton jeune.
- Témoignage/score/modération : ton sobre.

### 4. Préserver l’anonymat

Ne jamais afficher :

- email ;
- nom réel ;
- document fourni ;
- éléments permettant d’identifier l’auteur si l’entreprise est petite.

### 5. Éviter les attaques contre des personnes physiques

Le produit évalue des expériences dans des organisations, pas des individus nommés.

### 6. Préparer la future catégorie écoles

Même si les écoles sont exclues du MVP, l’architecture UX doit pouvoir évoluer vers :

- type d’organisation : entreprise / école ;
- catégories de notation différentes ;
- fiche école ;
- témoignage étudiant.

## 8. Décisions UX recommandées

1. **Accueil orienté recherche**, pas feed pur.
   - Justification : le besoin principal est “je veux vérifier une entreprise”.

2. **Feed léger sur l’accueil**, pas réseau social complet au MVP.
   - Justification : réduire le scope tout en gardant le côté viral.

3. **Formulaire témoignage en 5 étapes.**
   - Justification : plus rassurant et plus simple sur mobile qu’un long formulaire.

4. **Fiche entreprise comme cœur du produit.**
   - Justification : c’est là que la valeur décisionnelle existe.

5. **Admin modération obligatoire dès v1.**
   - Justification : produit trop sensible pour lancer sans contrôle.

6. **Top Red Flags avec seuil minimum.**
   - Justification : éviter de classer injustement une entreprise avec 1 seul avis.

## 9. Validation Abel

- Statut : EN_ATTENTE_VALIDATION_UX
- Décision : À valider / À modifier / Refusé
- Commentaires :
