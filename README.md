# RED FLAG MVP

RED FLAG permet de rechercher une entreprise, lire des témoignages modérés, publier une expérience structurée, signaler un contenu, revendiquer une fiche et calculer un Red Flag Score communautaire.

## Commandes

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm test
npm run test:e2e
npm run build
```

## Variables d’environnement

Copier `.env.example` vers `.env.local` :

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

La service role key est strictement serveur.

## Supabase local

```bash
npx supabase start
npx supabase db reset
npx supabase status -o env \
  --override-name api.url=NEXT_PUBLIC_SUPABASE_URL \
  --override-name auth.anon_key=NEXT_PUBLIC_SUPABASE_ANON_KEY \
  --override-name auth.service_role_key=SUPABASE_SERVICE_ROLE_KEY > .env.local
```

## Parcours MVP

- `/` accueil publique
- `/recherche` recherche entreprise
- `/entreprises/[slug]` fiche publique avec score, vote utile, signalement et réponses officielles
- `/temoigner` formulaire témoignage connecté, stockage en `pending`
- `/app/mes-temoignages` suivi privé utilisateur
- `/admin/temoignages` modération des témoignages
- `/admin/signalements` modération des signalements
- `/admin/revendications` revendications entreprise
- `/admin/reponses-entreprises` réponses entreprise
- `/top-red-flags` classement prudent
- `/regles`, `/confidentialite`, `/conditions` pages légales MVP

## Déploiement Coolify

Voir `docs/coolify.md`. HTTPS est prévu côté Coolify.

## Limitations MVP

- Les pages légales doivent être relues par un juriste avant lancement public.
- Le rate limiting est documenté en QA mais doit être renforcé côté edge/reverse proxy avant trafic réel.
- Les données seed sont fictives et ne doivent pas être remplacées par des accusations réelles sans cadre juridique.
