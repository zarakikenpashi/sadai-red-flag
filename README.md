# RED FLAG

RED FLAG est une application web de transparence professionnelle. Le MVP aide les jeunes candidats à vérifier la réputation communautaire d’une entreprise avant de signer, postuler ou aller en entretien.

## Stack MVP

- Next.js 16 / App Router
- TypeScript
- Tailwind CSS
- Supabase self-hosted prévu pour auth, PostgreSQL, RLS et storage
- Déploiement cible : Docker + Coolify

## Commandes

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
```

## Documents produit

Les spécifications MVP sont dans `docs/` :

- `01-cahier-des-charges.md`
- `02-ux-wireframe.md`
- `03-design-ui.md`
- `04-stack-technique.md`
- `05-backlog-github-issues.md`

## Règles produit sensibles

- Les témoignages sont anonymes côté public.
- Les contenus doivent rester factuels et modérés.
- Les noms de personnes physiques sont interdits dans les témoignages publics.
- Une entreprise peut répondre, mais ne peut pas supprimer directement un avis négatif.
- Le Red Flag Score est un signal communautaire de vigilance, pas un verdict légal.

## Variables d’environnement prévues

À compléter lors de l’intégration Supabase :

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```
