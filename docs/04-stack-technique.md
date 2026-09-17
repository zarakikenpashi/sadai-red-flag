# Stack technique — RED FLAG

## 1. Résumé de la stack proposée

Stack recommandée pour le MVP RED FLAG :

- **Frontend / fullstack app :** Next.js 15 + TypeScript
- **UI :** Tailwind CSS + shadcn/ui
- **Backend principal :** Supabase Open Source self-hosted
- **Base de données :** PostgreSQL via Supabase
- **Authentification :** Supabase Auth
- **Stockage fichiers :** Supabase Storage
- **Admin MVP :** interface admin intégrée dans Next.js, protégée par rôles
- **API custom :** Next.js Server Actions / Route Handlers pour logique sensible
- **Déploiement :** Docker + Coolify sur VPS
- **CI/CD :** GitHub Actions + déploiement Coolify
- **Tests :** Vitest + Playwright + checks TypeScript/ESLint
- **Méthodologie dev :** AI-Driven Dev Framework après validation stack

Choix d’infrastructure Supabase :

- **MVP/prototype :** instance Supabase self-hosted partagée si disponible.
- **Production sérieuse :** instance Supabase dédiée RED FLAG recommandée, car le projet manipule des témoignages sensibles et peut exposer la plateforme à des risques réputationnels/juridiques.

## 2. Frontend

### Choix recommandé

**Next.js 15 avec App Router + TypeScript**

Justification :

- permet une app web responsive rapide ;
- facilite SEO pour les fiches entreprises publiques ;
- permet pages publiques + espace connecté + admin dans le même repo ;
- bonne intégration avec Supabase ;
- compatible déploiement Docker/Coolify ;
- adapté à un MVP évolutif.

### Structure frontend proposée

```text
app/
  (public)/
    page.tsx
    recherche/page.tsx
    entreprises/[slug]/page.tsx
    entreprises/[slug]/temoignages/page.tsx
    top-red-flags/page.tsx
    regles/page.tsx
  (auth)/
    auth/page.tsx
  (app)/
    app/page.tsx
    app/mes-temoignages/page.tsx
  (admin)/
    admin/page.tsx
    admin/temoignages/page.tsx
    admin/signalements/page.tsx
components/
  ui/
  layout/
  company/
  testimonial/
  moderation/
lib/
  supabase/
  auth/
  scoring/
  moderation/
```

### UI

- Tailwind CSS pour vitesse et cohérence.
- shadcn/ui pour composants accessibles : buttons, cards, dialogs, forms, tabs, tables.
- lucide-react pour icônes.
- react-hook-form + zod pour formulaires.

### Pourquoi pas une app mobile native au MVP ?

- Trop coûteux au départ.
- Le besoin principal peut être validé via web mobile.
- Les liens TikTok/WhatsApp/Instagram ouvrent plus naturellement une web app.
- Une PWA pourra être ajoutée plus tard.

## 3. Backend

### Choix recommandé

**Supabase + logique custom Next.js**

Supabase gère :

- auth ;
- PostgreSQL ;
- Row Level Security ;
- fichiers/preuves privées ;
- API REST auto-générée ;
- realtime éventuel plus tard.

Next.js gère :

- pages publiques ;
- logique serveur sensible ;
- calculs contrôlés ;
- validations métier ;
- actions admin ;
- intégration anti-spam/modération.

### Quand utiliser une API custom ?

Utiliser des Route Handlers ou Server Actions pour :

- soumission de témoignage ;
- création/proposition d’entreprise ;
- vote utile ;
- signalement ;
- modération admin ;
- réponse entreprise ;
- upload de preuve privée ;
- recalcul du Red Flag Score.

Éviter d’exposer directement les opérations sensibles via client Supabase.

## 4. Base de données

Choix recommandé : **PostgreSQL via Supabase self-hosted**.

### Tables principales MVP

```text
profiles
companies
company_claims
testimonials
testimonial_scores
testimonial_flags
helpful_votes
reports
company_responses
moderation_events
verification_evidence
```

### Schéma logique résumé

#### profiles

- id UUID, lié à auth.users
- display_name interne nullable
- role : user / moderator / admin / company_rep
- created_at

#### companies

- id UUID
- name
- slug unique
- city
- country
- sector
- description
- claimed_by nullable
- claim_status
- red_flag_score
- score_confidence
- testimonial_count
- created_at
- updated_at

#### testimonials

- id UUID
- company_id
- user_id privé
- employment_status
- duration_label
- period_label
- title
- body
- verification_status : declared / verified / unverified
- moderation_status : pending / approved / rejected / hidden / needs_changes
- helpful_count
- created_at
- published_at

#### testimonial_scores

- testimonial_id
- pay_score
- management_score
- workload_score
- hours_score
- promises_score
- environment_score
- training_score

#### testimonial_flags

- id
- testimonial_id
- flag_type : late_payment / extended_internship / unpaid_overtime / unclear_contract / broken_promises / management / other

#### helpful_votes

- id
- testimonial_id
- user_id
- created_at
- contrainte unique testimonial_id + user_id

#### reports

- id
- testimonial_id
- reporter_id
- reason
- comment
- status
- created_at

#### company_responses

- id
- company_id
- testimonial_id
- representative_id
- body
- moderation_status
- published_at

#### moderation_events

- id
- entity_type
- entity_id
- moderator_id
- action
- reason
- created_at

#### verification_evidence

- id
- testimonial_id
- user_id
- storage_path
- evidence_type
- review_status
- reviewed_by
- created_at

### Préparation future écoles

Ajouter dès le design DB une abstraction possible :

- option MVP simple : garder `companies`, ajouter plus tard `schools` ;
- option plus flexible : utiliser `organizations` avec `type = company | school`.

Recommandation : pour MVP rapide, utiliser `companies`, mais nommer certains composants côté code de façon générique quand simple (`organization` dans les libs scoring/modération) pour faciliter l’évolution.

## 5. Authentification

Choix recommandé : **Supabase Auth**.

### MVP

- email + mot de passe ;
- confirmation email ;
- session persistante ;
- récupération mot de passe.

### Plus tard

- magic link ;
- Google OAuth ;
- connexion entreprise avec domaine email ;
- vérification renforcée des représentants entreprise.

### Rôles

Les rôles ne doivent pas être seulement côté frontend.

- Stocker le rôle dans `profiles`.
- Appliquer les contrôles côté RLS + fonctions serveur.
- Les actions admin doivent être vérifiées côté serveur.

## 6. Stockage fichiers

Choix recommandé : **Supabase Storage**.

### Usage MVP

Stocker uniquement les preuves privées si la vérification est activée au MVP.

Exemples :

- contrat masqué ;
- badge ;
- attestation ;
- fiche de paie masquée ;
- capture anonymisée.

### Règles

- Bucket privé.
- Aucun accès public.
- URL signée temporaire uniquement pour admin/modérateur autorisé.
- Taille limitée.
- Types de fichiers limités : PDF, PNG, JPG, WEBP.
- Suppression possible à la demande utilisateur selon politique définie.

## 7. APIs

### API Supabase auto-générée

Utilisable pour lectures simples publiques :

- fiches entreprises approuvées ;
- témoignages approuvés ;
- scores publics ;
- top red flags.

### API custom Next.js

Obligatoire pour :

- mutation de données ;
- modération ;
- upload preuve ;
- votes ;
- signalements ;
- réponses entreprise ;
- recalcul scores.

### Calcul Red Flag Score

Option MVP : fonction TypeScript côté serveur + écriture en base.

Option robuste plus tard : fonction PostgreSQL ou job planifié.

Pour MVP : recalculer le score lorsqu’un témoignage est approuvé, modifié, masqué ou supprimé.

## 8. Hébergement

### Recommandation MVP

- VPS géré via Coolify.
- App Next.js en Docker.
- Supabase self-hosted via Docker Compose, soit partagé, soit dédié.
- HTTPS automatique via Coolify / reverse proxy.

### Domaines possibles

- `redflag.ci` si disponible ;
- `redflag.app` si disponible ;
- sous-domaine temporaire pour staging : `redflag.sadai.dev` ou équivalent.

### Environnements

Pour MVP :

- `dev` local ;
- `production`.

Pour production sérieuse :

- `dev` ;
- `staging` ;
- `production`.

## 9. CI/CD

### GitHub Actions

Checks à chaque PR/push :

- install dependencies ;
- lint ;
- typecheck ;
- tests unitaires ;
- build ;
- secret scanning si disponible.

### Déploiement

- Coolify connecté au repo GitHub.
- Déploiement automatique sur branche principale après build réussi.
- Variables d’environnement configurées dans Coolify, pas dans le repo.

### Branches

- `main` : production.
- `develop` optionnel pour staging.
- branches feature : `feature/...`.

## 10. Tests

### Tests MVP minimum

- TypeScript typecheck.
- ESLint.
- Tests unitaires sur scoring.
- Tests unitaires sur validation de témoignage.
- Tests e2e Playwright sur parcours critiques.

### Parcours Playwright prioritaires

1. Rechercher une entreprise.
2. Ouvrir une fiche entreprise.
3. Publier un témoignage.
4. Admin approuve un témoignage.
5. Témoignage apparaît publiquement.
6. Voter utile.
7. Signaler un témoignage.

### Tests sécurité/logique

- utilisateur non admin ne peut pas accéder admin ;
- utilisateur ne peut pas voir preuves privées ;
- entreprise ne peut pas supprimer un témoignage ;
- vote utile unique par utilisateur ;
- témoignages pending non visibles publiquement.

## 11. Sécurité

### Baseline obligatoire

- RLS activé sur toutes les tables exposées.
- Service role key jamais exposée au frontend.
- Validation Zod côté serveur.
- Rate limiting sur endpoints publics sensibles.
- Protection anti-spam sur témoignages et signalements.
- Logs de modération.
- Pas de noms réels affichés publiquement.
- Preuves stockées en privé.
- CORS strict.
- Headers de sécurité.

### Données sensibles

RED FLAG traite des contenus sensibles : expériences de travail, conflits potentiels, preuves privées.

Mesures :

- minimiser les données collectées ;
- éviter de demander des documents au MVP si non indispensable ;
- ne jamais publier les preuves ;
- permettre demande de suppression ;
- journaliser les accès admin aux preuves si vérification documentaire activée.

### Modération et diffamation

Ajouter une couche produit + technique :

- règles de publication obligatoires ;
- filtre simple de mots interdits/insultes ;
- détection manuelle des noms propres au début ;
- signalement ;
- droit de réponse ;
- historique des décisions admin.

## 12. Plan d’exploitation Supabase self-hosted

## Backups

Minimum MVP :

- backup PostgreSQL quotidien ;
- rétention 7 jours ;
- sauvegarde des fichiers Storage si preuves activées ;
- test de restauration avant lancement public sérieux.

Production sérieuse :

- backup quotidien + éventuellement snapshot VPS ;
- rétention 30 jours ;
- stockage off-server ;
- monitoring d’échec backup.

## Restauration

Documenter :

- restauration base ;
- restauration fichiers ;
- vérification post-restore ;
- procédure de rollback app.

## Monitoring

Minimum :

- uptime app ;
- utilisation disque ;
- erreurs serveur ;
- échecs auth ;
- volume de soumissions ;
- file de modération.

Plus tard :

- Sentry pour frontend/backend ;
- Grafana/Prometheus si infra sérieuse ;
- alertes Discord/email.

## Logs

- Logs app via Coolify.
- Logs Supabase/Postgres.
- Logs de modération en base.
- Ne pas logger les documents sensibles ou secrets.

## Mises à jour

- Mettre à jour l’app via CI/CD.
- Mettre à jour Supabase avec prudence, backup avant update.
- Tester staging avant production quand le projet devient sérieux.

## Sécurité / durcissement

- HTTPS obligatoire.
- Variables d’environnement hors repo.
- Rotation des clés si fuite.
- Accès admin limité.
- Mots de passe forts.
- RLS vérifiée avec tests.
- Buckets privés.

## Scalabilité

MVP : un VPS peut suffire.

À surveiller :

- croissance des recherches ;
- volume de témoignages ;
- stockage de preuves ;
- charge admin/modération.

Évolutions possibles :

- index Postgres trigram/full-text search ;
- cache pour top pages ;
- séparation worker/job queue pour scoring/modération ;
- CDN pour assets publics.

## 13. Intégration AI-Driven Dev Framework

Après validation de cette stack :

1. Créer ou initialiser le repo `sadai-red-flag`.
2. Installer/configurer l’AI-Driven Dev Framework si nécessaire.
3. Ajouter les documents projet :
   - cahier des charges ;
   - UX/wireframes ;
   - design UI ;
   - stack technique.
4. Transformer les specs en backlog GitHub Issues.
5. Développer par lots :
   - setup projet ;
   - modèle DB/RLS ;
   - pages publiques ;
   - auth ;
   - témoignages ;
   - modération ;
   - scoring ;
   - admin ;
   - QA/déploiement.

Codex reste l’outil de développement préféré pour les lots de code.

## 14. Alternatives considérées

### Laravel + PostgreSQL

Avantage : robuste backend classique.

Inconvénient : plus lent pour MVP UI moderne, auth/admin/Supabase moins direct.

Verdict : non recommandé pour ce MVP.

### Django + PostgreSQL

Avantage : admin fort, backend robuste.

Inconvénient : plus lourd si l’objectif est une web app moderne rapide avec Supabase.

Verdict : intéressant si modération/admin devient très complexe, mais pas nécessaire au MVP.

### Firebase

Avantage : rapide pour MVP.

Inconvénient : moins adapté aux requêtes relationnelles, scoring, audit, portabilité self-hosted.

Verdict : non recommandé.

### Supabase Cloud

Avantage : beaucoup plus simple opérationnellement.

Inconvénient : préférence utilisateur pour Supabase self-hosted quand adapté ; contrôle infra moindre.

Verdict : option pragmatique si on veut aller très vite, mais choix proposé reste self-hosted.

## 15. Validation Abel

- Statut : EN_ATTENTE_VALIDATION_STACK
- Décision : À valider / À modifier / Refusé
- Commentaires :
