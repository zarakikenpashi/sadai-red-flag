# Backlog GitHub Issues — RED FLAG

Ce backlog transforme les documents validés/proposés en lots de développement exécutables pour le MVP.

Repo cible recommandé : `sadai-red-flag`

## Labels recommandés

### Type

- `type:feature`
- `type:bug`
- `type:task`
- `type:docs`
- `type:test`
- `type:security`

### Priorité

- `priority:high`
- `priority:medium`
- `priority:low`

### Zone

- `area:frontend`
- `area:backend`
- `area:database`
- `area:auth`
- `area:admin`
- `area:moderation`
- `area:design`
- `area:devops`
- `area:legal-safety`

### Statut

- `status:blocked`
- `status:needs-validation`
- `status:ready`

### Release

- `mvp`
- `post-mvp`

## Milestones recommandés

1. **M0 — Setup & fondations**
2. **M1 — Pages publiques & recherche**
3. **M2 — Auth & témoignages**
4. **M3 — Modération & admin**
5. **M4 — Scoring & confiance**
6. **M5 — QA, sécurité & livraison MVP**

---

# Issues MVP

## Issue 1 — Initialiser le projet Next.js RED FLAG

**Labels** : `type:task`, `priority:high`, `area:frontend`, `mvp`

**Milestone** : M0 — Setup & fondations

### Objectif

Créer la base technique de l’application RED FLAG avec Next.js, TypeScript, Tailwind CSS et structure projet propre.

### Contexte

Le MVP sera une application web responsive mobile-first. Le projet doit pouvoir évoluer vers pages publiques, espace utilisateur, admin et intégration Supabase.

### Critères d’acceptation

- [ ] Projet Next.js 15 initialisé avec TypeScript.
- [ ] Tailwind CSS configuré.
- [ ] ESLint configuré.
- [ ] Structure `app/`, `components/`, `lib/` créée.
- [ ] Page d’accueil temporaire fonctionnelle.
- [ ] Script `dev`, `build`, `lint`, `typecheck` disponibles.
- [ ] Build local réussi.

### Notes techniques

- Utiliser App Router.
- Prévoir architecture par groupes de routes : `(public)`, `(auth)`, `(app)`, `(admin)`.

### Dépendances

Aucune.

---

## Issue 2 — Ajouter le système UI de base

**Labels** : `type:task`, `priority:high`, `area:design`, `area:frontend`, `mvp`

**Milestone** : M0 — Setup & fondations

### Objectif

Mettre en place les bases UI : palette, typographie, composants communs, layout responsive.

### Critères d’acceptation

- [ ] Palette RED FLAG ajoutée dans Tailwind.
- [ ] Typographie Inter ou Manrope configurée.
- [ ] Composants Button, Card, Badge, Input, Dialog prêts.
- [ ] Header desktop créé.
- [ ] Bottom navigation mobile créée.
- [ ] Layout public fonctionnel.
- [ ] États success/error/warning disponibles.

### Notes techniques

- shadcn/ui recommandé.
- lucide-react pour les icônes.

### Dépendances

- Issue 1.

---

## Issue 3 — Configurer Supabase client/server

**Labels** : `type:task`, `priority:high`, `area:backend`, `area:database`, `mvp`

**Milestone** : M0 — Setup & fondations

### Objectif

Configurer l’intégration Supabase côté client et serveur.

### Critères d’acceptation

- [ ] Variables `.env.example` documentées.
- [ ] Client Supabase browser configuré.
- [ ] Client Supabase server configuré.
- [ ] Middleware/session auth préparé.
- [ ] Service role utilisé uniquement côté serveur si nécessaire.
- [ ] Aucune clé sensible committée.

### Notes techniques

Variables attendues :

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### Dépendances

- Issue 1.

---

## Issue 4 — Créer le schéma PostgreSQL MVP

**Labels** : `type:feature`, `priority:high`, `area:database`, `mvp`

**Milestone** : M0 — Setup & fondations

### Objectif

Créer les tables principales nécessaires au MVP.

### Critères d’acceptation

- [ ] Table `profiles` créée.
- [ ] Table `companies` créée.
- [ ] Table `testimonials` créée.
- [ ] Table `testimonial_scores` créée.
- [ ] Table `testimonial_flags` créée.
- [ ] Table `helpful_votes` créée.
- [ ] Table `reports` créée.
- [ ] Table `company_claims` créée.
- [ ] Table `company_responses` créée.
- [ ] Table `moderation_events` créée.
- [ ] Index utiles créés : slug entreprise, statut modération, recherche nom.
- [ ] Migrations versionnées.

### Notes techniques

Préparer les champs pour `created_at`, `updated_at`, statuts et slugs uniques.

### Dépendances

- Issue 3.

---

## Issue 5 — Configurer RLS et politiques de sécurité Supabase

**Labels** : `type:security`, `priority:high`, `area:database`, `area:auth`, `mvp`

**Milestone** : M0 — Setup & fondations

### Objectif

Protéger les données sensibles dès le départ avec Row Level Security.

### Critères d’acceptation

- [ ] RLS activé sur toutes les tables exposées.
- [ ] Les témoignages `pending/rejected/hidden` ne sont pas visibles publiquement.
- [ ] Les témoignages `approved` sont visibles publiquement.
- [ ] Un utilisateur peut voir ses propres témoignages.
- [ ] Un utilisateur ne peut pas voir les témoignages privés d’un autre.
- [ ] Seuls admin/moderator peuvent modérer.
- [ ] Une entreprise ne peut pas supprimer directement un témoignage.
- [ ] Tests manuels ou SQL de vérification documentés.

### Notes techniques

Ne pas s’appuyer uniquement sur le frontend pour les droits.

### Dépendances

- Issue 4.

---

## Issue 6 — Implémenter authentification email/password

**Labels** : `type:feature`, `priority:high`, `area:auth`, `area:frontend`, `mvp`

**Milestone** : M2 — Auth & témoignages

### Objectif

Permettre aux utilisateurs de créer un compte, se connecter et se déconnecter.

### Critères d’acceptation

- [ ] Page inscription.
- [ ] Page connexion.
- [ ] Déconnexion.
- [ ] Récupération mot de passe ou lien prévu.
- [ ] Création automatique du profil utilisateur.
- [ ] Redirection après login vers le parcours initial.
- [ ] Message clair : identité non affichée publiquement.

### Dépendances

- Issue 3.
- Issue 4.
- Issue 5.

---

## Issue 7 — Créer la page d’accueil publique

**Labels** : `type:feature`, `priority:high`, `area:frontend`, `mvp`

**Milestone** : M1 — Pages publiques & recherche

### Objectif

Créer la landing page RED FLAG orientée recherche et contribution.

### Critères d’acceptation

- [ ] Hero avec promesse : “Avant de signer, vérifie l’entreprise.”
- [ ] Recherche principale visible.
- [ ] CTA `Raconter mon expérience`.
- [ ] CTA `Voir le top red flags`.
- [ ] Section red flags fréquents.
- [ ] Section témoignages récents approuvés.
- [ ] Message de prudence sur expériences communautaires/modérées.
- [ ] Responsive mobile/desktop.

### Dépendances

- Issue 2.

---

## Issue 8 — Implémenter recherche entreprise

**Labels** : `type:feature`, `priority:high`, `area:frontend`, `area:backend`, `mvp`

**Milestone** : M1 — Pages publiques & recherche

### Objectif

Permettre de rechercher une entreprise par nom.

### Critères d’acceptation

- [ ] Page `/recherche?q=` créée.
- [ ] Recherche par nom d’entreprise.
- [ ] Affichage des résultats avec nom, ville, secteur, score, nombre de témoignages.
- [ ] État aucun résultat avec CTA `Proposer cette entreprise`.
- [ ] État chargement.
- [ ] Recherche utilisable sur mobile.

### Notes techniques

Pour MVP : `ilike` PostgreSQL. Plus tard : full-text search ou trigram.

### Dépendances

- Issue 4.
- Issue 7.

---

## Issue 9 — Créer proposition / création d’entreprise

**Labels** : `type:feature`, `priority:high`, `area:backend`, `area:frontend`, `mvp`

**Milestone** : M1 — Pages publiques & recherche

### Objectif

Permettre à un utilisateur de proposer une entreprise absente.

### Critères d’acceptation

- [ ] Formulaire nom, ville, pays, secteur.
- [ ] Slug généré automatiquement.
- [ ] Détection basique de doublons.
- [ ] Entreprise créée avec statut approprié.
- [ ] Message de succès.
- [ ] Validation Zod côté serveur.

### Dépendances

- Issue 4.
- Issue 6.

---

## Issue 10 — Créer fiche entreprise publique

**Labels** : `type:feature`, `priority:high`, `area:frontend`, `area:backend`, `mvp`

**Milestone** : M1 — Pages publiques & recherche

### Objectif

Afficher la fiche entreprise avec score, catégories et témoignages récents.

### Critères d’acceptation

- [ ] Route `/entreprises/[slug]`.
- [ ] Nom, ville, secteur affichés.
- [ ] Red Flag Score affiché.
- [ ] Niveau de confiance affiché.
- [ ] Résumé “Pourquoi ce score ?”.
- [ ] Notes par catégorie.
- [ ] Témoignages récents approuvés.
- [ ] CTA `Raconter mon expérience`.
- [ ] CTA `Cette entreprise est la vôtre ?`.
- [ ] État entreprise sans témoignage.
- [ ] Responsive mobile/desktop.

### Dépendances

- Issue 4.
- Issue 8.

---

## Issue 11 — Créer formulaire témoignage en 5 étapes

**Labels** : `type:feature`, `priority:high`, `area:frontend`, `area:backend`, `area:moderation`, `mvp`

**Milestone** : M2 — Auth & témoignages

### Objectif

Permettre à un utilisateur connecté de publier un témoignage structuré.

### Critères d’acceptation

- [ ] Étape 1 : choix entreprise.
- [ ] Étape 2 : statut, durée, période.
- [ ] Étape 3 : notes par catégorie.
- [ ] Étape 4 : red flags.
- [ ] Étape 5 : titre, texte, confirmations.
- [ ] Progress bar.
- [ ] Validation des champs.
- [ ] Témoignage enregistré avec `moderation_status = pending`.
- [ ] Identité non affichée publiquement.
- [ ] Message de succès clair.

### Dépendances

- Issue 6.
- Issue 9.
- Issue 10.

---

## Issue 12 — Implémenter règles de publication et garde-fous texte

**Labels** : `type:feature`, `priority:high`, `area:legal-safety`, `area:moderation`, `mvp`

**Milestone** : M2 — Auth & témoignages

### Objectif

Réduire les risques de contenus dangereux avant modération.

### Critères d’acceptation

- [ ] Page `/regles` créée.
- [ ] Règles affichées avant soumission témoignage.
- [ ] Case d’acceptation obligatoire.
- [ ] Liste de mots interdits/insultes MVP.
- [ ] Alerte si texte contient des termes sensibles.
- [ ] Message demandant de ne pas citer de personnes physiques.
- [ ] Les contenus sensibles restent en `pending`.

### Dépendances

- Issue 11.

---

## Issue 13 — Créer espace utilisateur “Mes témoignages”

**Labels** : `type:feature`, `priority:medium`, `area:frontend`, `area:auth`, `mvp`

**Milestone** : M2 — Auth & témoignages

### Objectif

Permettre aux utilisateurs de suivre leurs contributions.

### Critères d’acceptation

- [ ] Page `/app`.
- [ ] Page `/app/mes-temoignages`.
- [ ] Liste des témoignages de l’utilisateur.
- [ ] Statut affiché : pending, approved, needs_changes, rejected, hidden.
- [ ] Accès protégé par auth.
- [ ] Aucun utilisateur ne peut voir les témoignages privés d’un autre.

### Dépendances

- Issue 6.
- Issue 11.

---

## Issue 14 — Créer dashboard admin de modération

**Labels** : `type:feature`, `priority:high`, `area:admin`, `area:moderation`, `mvp`

**Milestone** : M3 — Modération & admin

### Objectif

Permettre aux admins/modérateurs de traiter les témoignages en attente.

### Critères d’acceptation

- [ ] Route `/admin/temoignages` protégée.
- [ ] Liste des témoignages pending.
- [ ] Détail témoignage.
- [ ] Actions : approuver, demander modification, rejeter, masquer.
- [ ] Historique dans `moderation_events`.
- [ ] Seuls admin/moderator peuvent accéder.
- [ ] UX utilisable desktop.

### Dépendances

- Issue 5.
- Issue 11.

---

## Issue 15 — Implémenter publication publique après modération

**Labels** : `type:feature`, `priority:high`, `area:moderation`, `area:backend`, `mvp`

**Milestone** : M3 — Modération & admin

### Objectif

Faire apparaître publiquement un témoignage uniquement après approbation.

### Critères d’acceptation

- [ ] Témoignage pending invisible publiquement.
- [ ] Action admin `approve` passe le témoignage en approved.
- [ ] `published_at` renseigné.
- [ ] Témoignage approuvé visible sur fiche entreprise.
- [ ] Témoignage rejeté/masqué invisible publiquement.
- [ ] Événement de modération enregistré.

### Dépendances

- Issue 14.

---

## Issue 16 — Implémenter vote utile

**Labels** : `type:feature`, `priority:medium`, `area:frontend`, `area:backend`, `mvp`

**Milestone** : M3 — Modération & admin

### Objectif

Permettre aux utilisateurs de marquer un témoignage comme utile.

### Critères d’acceptation

- [ ] Bouton `Utile` sur témoignage.
- [ ] Utilisateur connecté requis.
- [ ] Un seul vote par utilisateur et témoignage.
- [ ] Compteur mis à jour.
- [ ] Gestion annulation optionnelle ou non décidée.
- [ ] Protection contre double clic.

### Dépendances

- Issue 15.

---

## Issue 17 — Implémenter signalement de témoignage

**Labels** : `type:feature`, `priority:high`, `area:moderation`, `area:frontend`, `area:backend`, `mvp`

**Milestone** : M3 — Modération & admin

### Objectif

Permettre de signaler un contenu problématique.

### Critères d’acceptation

- [ ] Bouton `Signaler` sur témoignage.
- [ ] Motifs disponibles : faux témoignage, insulte, données personnelles, attaque nominative, hors sujet, autre.
- [ ] Commentaire facultatif.
- [ ] Signalement enregistré.
- [ ] Page admin `/admin/signalements`.
- [ ] Admin peut marquer comme traité.

### Dépendances

- Issue 15.
- Issue 14.

---

## Issue 18 — Implémenter Red Flag Score v1

**Labels** : `type:feature`, `priority:high`, `area:backend`, `area:database`, `mvp`

**Milestone** : M4 — Scoring & confiance

### Objectif

Calculer un score communautaire compréhensible pour chaque entreprise.

### Critères d’acceptation

- [ ] Fonction de calcul créée.
- [ ] Pondérations appliquées : paiement, management, engagements, charge, horaires, environnement, formation.
- [ ] Score recalculé après approbation/masquage d’un témoignage.
- [ ] Nombre de témoignages pris en compte.
- [ ] Niveau de confiance calculé : faible, moyen, élevé.
- [ ] Score affiché sur fiche entreprise.
- [ ] Tests unitaires sur calcul.

### Notes techniques

Formule MVP proposée dans `04-stack-technique.md` et `01-cahier-des-charges.md`.

### Dépendances

- Issue 15.

---

## Issue 19 — Créer page Top Red Flags

**Labels** : `type:feature`, `priority:medium`, `area:frontend`, `area:backend`, `mvp`

**Milestone** : M4 — Scoring & confiance

### Objectif

Afficher un classement prudent et partageable des entreprises avec signaux de vigilance.

### Critères d’acceptation

- [ ] Page `/top-red-flags`.
- [ ] Classement par Red Flag Score.
- [ ] Seuil minimum de témoignages appliqué.
- [ ] Disclaimer visible.
- [ ] Affichage red flags fréquents.
- [ ] Liens vers fiches entreprises.
- [ ] Responsive mobile.

### Dépendances

- Issue 18.

---

## Issue 20 — Implémenter revendication entreprise

**Labels** : `type:feature`, `priority:medium`, `area:frontend`, `area:backend`, `mvp`

**Milestone** : M4 — Scoring & confiance

### Objectif

Permettre à une entreprise de demander la revendication de sa fiche.

### Critères d’acceptation

- [ ] CTA `Cette entreprise est la vôtre ?`.
- [ ] Formulaire de revendication.
- [ ] Demande enregistrée en `pending`.
- [ ] Page admin revendications.
- [ ] Admin peut approuver/rejeter.
- [ ] Badge `Profil officiel` affiché si approuvé.

### Dépendances

- Issue 10.
- Issue 14.

---

## Issue 21 — Implémenter réponse entreprise à un témoignage

**Labels** : `type:feature`, `priority:medium`, `area:frontend`, `area:backend`, `area:moderation`, `mvp`

**Milestone** : M4 — Scoring & confiance

### Objectif

Permettre à une entreprise validée de répondre officiellement à un témoignage.

### Critères d’acceptation

- [ ] Représentant validé peut soumettre une réponse.
- [ ] Réponse en `pending` avant publication.
- [ ] Admin peut approuver/rejeter.
- [ ] Réponse approuvée visible sous le témoignage.
- [ ] Réponse ne peut pas révéler l’identité supposée de l’auteur.

### Dépendances

- Issue 20.
- Issue 14.

---

## Issue 22 — Ajouter données seed pour développement

**Labels** : `type:task`, `priority:medium`, `area:database`, `mvp`

**Milestone** : M1 — Pages publiques & recherche

### Objectif

Créer des données fictives pour développer les écrans sans utiliser de vraies accusations.

### Critères d’acceptation

- [ ] Seed local avec entreprises fictives.
- [ ] Témoignages fictifs modérés.
- [ ] Scores réalistes mais inventés.
- [ ] Aucun vrai nom d’entreprise si non autorisé.
- [ ] Script documenté.

### Dépendances

- Issue 4.

---

## Issue 23 — Configurer tests unitaires

**Labels** : `type:test`, `priority:medium`, `area:frontend`, `area:backend`, `mvp`

**Milestone** : M5 — QA, sécurité & livraison MVP

### Objectif

Mettre en place les tests unitaires sur les fonctions critiques.

### Critères d’acceptation

- [ ] Vitest configuré.
- [ ] Tests scoring.
- [ ] Tests validation formulaire témoignage.
- [ ] Tests permissions utilitaires si applicable.
- [ ] Script `test` disponible.

### Dépendances

- Issue 18.

---

## Issue 24 — Configurer tests E2E Playwright

**Labels** : `type:test`, `priority:medium`, `area:frontend`, `mvp`

**Milestone** : M5 — QA, sécurité & livraison MVP

### Objectif

Vérifier les parcours MVP critiques de bout en bout.

### Critères d’acceptation

- [ ] Playwright configuré.
- [ ] Test recherche entreprise.
- [ ] Test fiche entreprise.
- [ ] Test soumission témoignage.
- [ ] Test admin approbation.
- [ ] Test visibilité publique après approbation.
- [ ] Test signalement.

### Dépendances

- Issues 7 à 18.

---

## Issue 25 — Préparer Dockerfile et déploiement Coolify

**Labels** : `type:task`, `priority:high`, `area:devops`, `mvp`

**Milestone** : M5 — QA, sécurité & livraison MVP

### Objectif

Préparer l’application pour un déploiement reproductible.

### Critères d’acceptation

- [ ] Dockerfile Next.js prêt.
- [ ] `.dockerignore` créé.
- [ ] Variables d’environnement documentées.
- [ ] Build Docker local réussi.
- [ ] Documentation Coolify ajoutée.
- [ ] HTTPS prévu côté Coolify.

### Dépendances

- Issue 1.
- Issue 3.

---

## Issue 26 — Configurer GitHub Actions CI

**Labels** : `type:task`, `priority:medium`, `area:devops`, `mvp`

**Milestone** : M5 — QA, sécurité & livraison MVP

### Objectif

Automatiser les checks avant livraison.

### Critères d’acceptation

- [ ] Workflow GitHub Actions ajouté.
- [ ] Install dependencies.
- [ ] Lint.
- [ ] Typecheck.
- [ ] Tests unitaires.
- [ ] Build.
- [ ] Workflow passe sur `main`.

### Dépendances

- Issue 23.
- Issue 25.

---

## Issue 27 — Créer pages légales MVP

**Labels** : `type:docs`, `priority:high`, `area:legal-safety`, `mvp`

**Milestone** : M5 — QA, sécurité & livraison MVP

### Objectif

Ajouter les pages nécessaires pour cadrer l’usage et réduire les risques.

### Critères d’acceptation

- [ ] Page règles de publication finalisée.
- [ ] Page confidentialité.
- [ ] Page conditions d’utilisation.
- [ ] Mention sur anonymat public.
- [ ] Mention sur modération.
- [ ] Mention sur droit de réponse.
- [ ] Mention sur suppression/demande utilisateur.

### Notes

À faire relire par un juriste avant lancement public sérieux.

### Dépendances

- Issue 12.

---

## Issue 28 — QA sécurité MVP

**Labels** : `type:security`, `type:test`, `priority:high`, `area:security`, `mvp`

**Milestone** : M5 — QA, sécurité & livraison MVP

### Objectif

Vérifier les points de sécurité essentiels avant lancement.

### Critères d’acceptation

- [ ] Aucun secret committé.
- [ ] RLS vérifiée.
- [ ] Utilisateur non admin bloqué de `/admin`.
- [ ] Témoignages pending invisibles publiquement.
- [ ] Preuves privées non accessibles publiquement si activées.
- [ ] Service role absent du bundle frontend.
- [ ] Rate limiting prévu ou documenté.
- [ ] Headers de sécurité configurés.

### Dépendances

- Issue 5.
- Issue 14.
- Issue 25.

---

## Issue 29 — README et documentation de setup

**Labels** : `type:docs`, `priority:medium`, `area:devops`, `mvp`

**Milestone** : M5 — QA, sécurité & livraison MVP

### Objectif

Documenter l’installation, les commandes et les variables.

### Critères d’acceptation

- [ ] README projet créé.
- [ ] Commandes dev/build/test documentées.
- [ ] `.env.example` expliqué.
- [ ] Setup Supabase documenté.
- [ ] Migrations documentées.
- [ ] Déploiement Coolify documenté.
- [ ] Limitations MVP listées.

### Dépendances

- Issue 25.

---

## Issue 30 — Livraison MVP interne

**Labels** : `type:task`, `priority:high`, `mvp`

**Milestone** : M5 — QA, sécurité & livraison MVP

### Objectif

Valider que le MVP fonctionne en interne avant ouverture à des utilisateurs réels.

### Critères d’acceptation

- [ ] Parcours recherche fonctionne.
- [ ] Parcours témoignage fonctionne.
- [ ] Parcours modération fonctionne.
- [ ] Score recalculé correctement.
- [ ] Top Red Flags fonctionne.
- [ ] Signalement fonctionne.
- [ ] Réponse entreprise fonctionne ou limitation documentée.
- [ ] Build passe.
- [ ] Tests minimum passent.
- [ ] Limitations connues documentées.

### Dépendances

- Issues 1 à 29.

---

# Ordre de développement recommandé

## Phase 1 — Fondations

1. Issue 1 — Initialiser le projet Next.js RED FLAG
2. Issue 2 — Ajouter le système UI de base
3. Issue 3 — Configurer Supabase client/server
4. Issue 4 — Créer le schéma PostgreSQL MVP
5. Issue 5 — Configurer RLS et politiques de sécurité Supabase
6. Issue 22 — Ajouter données seed pour développement

## Phase 2 — Pages publiques

7. Issue 7 — Créer la page d’accueil publique
8. Issue 8 — Implémenter recherche entreprise
9. Issue 9 — Créer proposition / création d’entreprise
10. Issue 10 — Créer fiche entreprise publique

## Phase 3 — Auth & témoignages

11. Issue 6 — Implémenter authentification email/password
12. Issue 11 — Créer formulaire témoignage en 5 étapes
13. Issue 12 — Implémenter règles de publication et garde-fous texte
14. Issue 13 — Créer espace utilisateur “Mes témoignages”

## Phase 4 — Modération

15. Issue 14 — Créer dashboard admin de modération
16. Issue 15 — Implémenter publication publique après modération
17. Issue 16 — Implémenter vote utile
18. Issue 17 — Implémenter signalement de témoignage

## Phase 5 — Score & confiance

19. Issue 18 — Implémenter Red Flag Score v1
20. Issue 19 — Créer page Top Red Flags
21. Issue 20 — Implémenter revendication entreprise
22. Issue 21 — Implémenter réponse entreprise à un témoignage

## Phase 6 — QA & livraison

23. Issue 23 — Configurer tests unitaires
24. Issue 24 — Configurer tests E2E Playwright
25. Issue 25 — Préparer Dockerfile et déploiement Coolify
26. Issue 26 — Configurer GitHub Actions CI
27. Issue 27 — Créer pages légales MVP
28. Issue 28 — QA sécurité MVP
29. Issue 29 — README et documentation de setup
30. Issue 30 — Livraison MVP interne

# Découpage en lots Codex recommandé

## Lot Codex 1 — Setup projet + UI base

Issues : 1, 2, 25 partiel, 29 partiel.

Livrable : app Next.js lancée localement avec design system de base.

## Lot Codex 2 — Supabase schema + RLS + seeds

Issues : 3, 4, 5, 22.

Livrable : base MVP avec migrations, RLS et données fictives.

## Lot Codex 3 — Pages publiques

Issues : 7, 8, 9, 10.

Livrable : accueil, recherche, fiche entreprise utilisables.

## Lot Codex 4 — Auth + témoignage

Issues : 6, 11, 12, 13.

Livrable : utilisateurs connectés peuvent proposer des témoignages en pending.

## Lot Codex 5 — Admin modération

Issues : 14, 15, 17.

Livrable : admin peut approuver/rejeter/signalements.

## Lot Codex 6 — Scoring + social trust

Issues : 16, 18, 19.

Livrable : votes utiles, score, top red flags.

## Lot Codex 7 — Entreprise + droit de réponse

Issues : 20, 21.

Livrable : revendication entreprise et réponse modérée.

## Lot Codex 8 — QA + CI + livraison

Issues : 23, 24, 25, 26, 27, 28, 29, 30.

Livrable : MVP vérifié, documenté, prêt déploiement interne.

# Hors MVP / post-MVP

- Écoles.
- Job board.
- PWA avancée.
- OAuth Google.
- Magic link.
- Vérification documentaire avancée.
- IA de résumé des témoignages.
- Analytics entreprise.
- Abonnements payants.
- Application mobile native.
- Multi-pays.
