# Design UI — RED FLAG

## 1. Direction visuelle

RED FLAG doit avoir une identité visuelle jeune, directe et mémorisable, sans tomber dans un style dangereux ou diffamatoire.

La direction recommandée :

> **Street social app + outil de confiance professionnelle.**

Le design doit mélanger :

- énergie des réseaux sociaux ;
- lisibilité d’un produit SaaS ;
- codes d’alerte maîtrisés ;
- ton culturel jeune ;
- sérieux sur les contenus sensibles.

### Principes visuels

1. **Impact immédiat**
   - Gros titres courts.
   - Rouge utilisé comme signal fort.
   - CTA visibles.

2. **Confiance**
   - Cartes claires.
   - Scores expliqués.
   - Badges de vérification.
   - Mentions de modération.

3. **Mobile-first**
   - Design en cartes.
   - Boutons larges.
   - Navigation basse.
   - Lecture rapide.

4. **Viral mais responsable**
   - Emojis et badges acceptés.
   - Pas d’interface qui encourage le harcèlement.
   - Langage produit prudent : “expériences rapportées”, “score communautaire”, “à vérifier”.

## 2. Public cible et ton visuel

### Public principal

- 18–35 ans ;
- étudiants ;
- jeunes diplômés ;
- stagiaires ;
- juniors en recherche d’emploi ;
- utilisateurs mobile habitués aux réseaux sociaux.

### Ton visuel

- direct ;
- urbain ;
- énergique ;
- légèrement provocateur ;
- mais crédible et lisible.

### Exemples de ton UI

Accepté :

- “Avant de signer, vérifie.”
- “Ceux qui sont passés avant toi ont parlé.”
- “Score basé sur 18 expériences.”
- “Vigilance élevée.”
- “Expérience déclarée.”

À éviter dans l’interface officielle :

- “Entreprise à fuir.”
- “Ils exploitent les gens.”
- “Arnaque.”
- “Patron toxique.”

Ces formulations peuvent apparaître uniquement si elles sont modérées dans un témoignage utilisateur, et encore, avec prudence.

## 3. Palette de couleurs

### Palette principale

| Usage | Couleur | Hex | Rôle |
|---|---|---|---|
| Rouge principal | Red Flag Red | `#EF233C` | Signal, CTA, score critique |
| Rouge sombre | Deep Alert | `#8D0B1A` | États critiques, contraste |
| Noir | Ink Black | `#0B0F14` | Texte principal, header sombre |
| Blanc cassé | Soft White | `#F8FAFC` | Fond principal clair |
| Gris clair | Cloud Gray | `#E5E7EB` | Bordures, séparateurs |
| Gris texte | Slate | `#64748B` | Texte secondaire |

### Palette de score

| Niveau | Couleur | Hex | Usage |
|---|---|---|---|
| Risque élevé | Rouge | `#EF233C` | 0–39 |
| Vigilance | Orange | `#F97316` | 40–64 |
| Correct / à confirmer | Jaune | `#FACC15` | 65–79 |
| Favorable | Vert | `#22C55E` | 80–100 |
| Données faibles | Gris bleu | `#94A3B8` | Score provisoire |

### Couleurs d’accent

| Usage | Couleur | Hex |
|---|---|---|
| Lien / info | Bleu | `#2563EB` |
| Succès | Vert | `#16A34A` |
| Warning doux | Ambre | `#F59E0B` |
| Fond sombre | Night | `#111827` |

### Recommandation d’ambiance

- Fond principal clair pour lisibilité.
- Header ou hero sombre possible pour impact.
- Rouge utilisé avec parcimonie : il doit signaler, pas saturer.
- Cartes blanches avec ombres légères.

## 4. Typographie

### Recommandation

Utiliser une combinaison moderne, lisible et facile à intégrer :

- **Police principale : Inter**
- **Police alternative : Manrope**
- **Police système fallback : Arial / sans-serif**

### Hiérarchie

| Élément | Taille desktop | Taille mobile | Poids |
|---|---:|---:|---:|
| Hero title | 56 px | 36 px | 800 |
| H1 page | 40 px | 30 px | 800 |
| H2 section | 28 px | 24 px | 700 |
| H3 card | 20 px | 18 px | 700 |
| Body | 16 px | 16 px | 400–500 |
| Small | 14 px | 13 px | 400 |
| Badge | 12 px | 12 px | 700 |

### Style textuel

- Titres courts et puissants.
- Corps de texte simple.
- Éviter les paragraphes longs.
- Utiliser des labels explicites sur les scores.

## 5. Composants UI

## Boutons

### Bouton primaire

Usage : CTA principal.

- Fond : `#EF233C`
- Texte : blanc
- Border-radius : 14 px
- Padding : 14–18 px
- Poids : 700
- Hover : `#D90429`

Exemples :

- `Raconter mon expérience`
- `Rechercher`
- `Envoyer pour modération`

### Bouton secondaire

- Fond : blanc
- Texte : `#0B0F14`
- Bordure : `#E5E7EB`
- Hover : fond `#F8FAFC`

Exemples :

- `Voir le top`
- `Lire les règles`

### Bouton danger/admin

- Fond : rouge sombre ou outline rouge.
- Utilisation limitée : masquer, rejeter, supprimer.

## Inputs

### Recherche principale

- Grande hauteur : 56–64 px.
- Icône recherche.
- Placeholder direct : `Cherche une entreprise avant de signer...`
- Border-radius : 18 px.
- Ombre légère.

### Champs formulaire

- Hauteur : 48 px.
- Label toujours visible.
- Message d’aide sous les champs sensibles.
- Validation inline.

## Cards

### Carte entreprise

Contenu :

- nom ;
- ville / secteur ;
- score ;
- nombre de témoignages ;
- red flags fréquents ;
- CTA.

Style :

- fond blanc ;
- border `#E5E7EB` ;
- radius 18 px ;
- padding 20 px ;
- hover : légère élévation.

### Carte témoignage

Contenu :

- statut de vérification ;
- statut professionnel ;
- durée ;
- titre ;
- extrait ;
- tags red flags ;
- vote utile ;
- signalement.

Règle : ne jamais afficher l’identité réelle de l’auteur.

### Carte score

Contenu :

- score /100 ;
- niveau : vigilance élevée, vigilance, correct, favorable ;
- nombre de témoignages ;
- fiabilité du score.

Visuel :

- gros chiffre ;
- couleur selon niveau ;
- mention “score communautaire”.

## Badges

### Badges de statut

- `Expérience déclarée` — gris/bleu.
- `Expérience vérifiée` — vert.
- `Profil officiel` — bleu.
- `Score provisoire` — gris.
- `En modération` — orange.

### Badges red flags

- `Paiement en retard`
- `Stage prolongé`
- `Heures sup`
- `Contrat flou`
- `Promesses non tenues`
- `Management`

Style :

- fond légèrement teinté ;
- texte sombre ;
- petite icône possible.

## Modales

Usage :

- confirmation signalement ;
- règles avant publication ;
- demande de revendication ;
- avertissement contenu sensible.

Règles :

- modales courtes ;
- action principale claire ;
- possibilité de fermer facilement sauf confirmations critiques.

## Navigation

### Header desktop

- logo à gauche ;
- recherche centrale ou compacte ;
- liens : Top Red Flags, Règles ;
- CTA `Témoigner` ;
- profil/connexion.

### Bottom nav mobile

- Accueil ;
- Recherche ;
- Top ;
- Témoigner ;
- Profil.

Le bouton `Témoigner` peut être accentué en rouge.

## Tableaux

Réservés à l’admin desktop.

Colonnes possibles :

- entreprise ;
- type ;
- statut ;
- risque ;
- date ;
- actions.

Sur mobile admin : cartes plutôt que tableaux.

## États d’erreur/succès

### Succès contribution

Message :

> Merci. Ton témoignage est en attente de modération. Ton identité ne sera pas affichée publiquement.

### Erreur formulaire

Message :

> Certains champs doivent être corrigés avant l’envoi.

### Contenu sensible détecté

Message :

> Attention : ton texte semble contenir un nom de personne ou une accusation sensible. Reformule sans nommer d’individu.

### Aucun résultat

Message :

> Cette entreprise n’est pas encore référencée. Tu peux proposer sa fiche.

## 6. Layout desktop

### Accueil desktop

Structure :

```text
Header
Hero 2 colonnes
- gauche : promesse + recherche + CTA
- droite : carte score illustrative / témoignage exemple
Red flags fréquents
Témoignages récents
Comment ça marche
Footer légal
```

### Fiche entreprise desktop

Structure recommandée :

```text
Header
Breadcrumb
Bloc entreprise
┌──────────────────────────┬────────────────────────────┐
│ Colonne gauche           │ Colonne droite              │
│ Score                    │ Témoignages récents         │
│ Notes catégories         │ Filtres / votes / réponses  │
│ Pourquoi ce score        │                            │
│ CTA                      │                            │
└──────────────────────────┴────────────────────────────┘
```

### Admin desktop

- Sidebar fixe.
- Contenu en cartes/tableaux.
- Actions rapides.
- Filtres persistants.

## 7. Layout mobile

### Accueil mobile

Structure :

```text
Logo + profil
Hero court
Recherche pleine largeur
CTA Témoigner
Red flags fréquents en chips/cards horizontales
Témoignages récents
Bottom nav
```

### Fiche entreprise mobile

Ordre :

1. Nom entreprise.
2. Score.
3. Résumé “Pourquoi ce score”.
4. CTA témoignage.
5. Notes catégories.
6. Témoignages récents.
7. Revendication entreprise.

### Formulaire mobile

- 5 étapes.
- Progress bar visible.
- Boutons bas d’écran : `Retour` / `Continuer`.
- Sauvegarde brouillon si possible.

## 8. Accessibilité

### Contraste

- Texte principal minimum WCAG AA.
- Ne pas utiliser uniquement la couleur pour communiquer le score : ajouter label texte.
- Rouge sur blanc avec texte assez grand.

### Navigation clavier

- Tous les boutons et inputs accessibles au clavier.
- Focus visible.
- Modales fermables au clavier.

### Lisibilité

- Taille body 16 px minimum.
- Hauteur de ligne confortable : 1.5.
- Éviter les blocs de texte très longs.

### Formulaires

- Labels explicites.
- Messages d’erreur liés aux champs.
- Ne pas vider le formulaire après erreur.

## 9. Maquette / prototype HTML recommandé

Pour la suite, créer une maquette HTML statique responsive avec :

1. Page d’accueil.
2. Page recherche.
3. Fiche entreprise.
4. Formulaire témoignage.
5. Dashboard admin simplifié.

### Objectif du prototype

- Valider l’ambiance visuelle.
- Tester la hiérarchie des informations.
- Avoir une base réutilisable pour le développement frontend.

### Style proposé pour le prototype

- Next.js ou simple HTML/CSS selon choix stack final.
- Tailwind CSS recommandé pour aller vite.
- Composants proches de la future implémentation.

## 10. Exemples de microcopy UI

### Hero

> Avant de signer, vérifie l’entreprise.

Sous-texte :

> RED FLAG rassemble les expériences anonymes de ceux qui sont déjà passés par là, pour t’aider à poser les bonnes questions avant d’accepter.

CTA :

- `Chercher une entreprise`
- `Raconter mon expérience`

### Fiche entreprise

> Score basé sur les expériences publiées par la communauté. Ce score n’est pas un verdict : c’est un signal de vigilance.

### Formulaire témoignage

> Reste factuel. Ne cite pas de personnes physiques. Ton identité ne sera pas affichée publiquement.

### Modération

> Ton témoignage est relu avant publication pour protéger la communauté et éviter les abus.

### Top Red Flags

> Classement basé uniquement sur les entreprises ayant assez de témoignages pour éviter les conclusions injustes.

## 11. Validation Abel

- Statut : EN_ATTENTE_VALIDATION_DESIGN
- Décision : À valider / À modifier / Refusé
- Commentaires :
