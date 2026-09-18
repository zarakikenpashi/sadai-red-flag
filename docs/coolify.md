# Coolify deployment

## Build

- Type: Dockerfile
- Port: `3000`
- HTTPS: managed by Coolify reverse proxy / Let's Encrypt

## Required environment variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

`SUPABASE_SERVICE_ROLE_KEY` is server-only and must never be exposed to browser code.

## Deploy steps

1. Create a Coolify app from the GitHub repository.
2. Select Dockerfile build.
3. Set the variables above from the target Supabase instance.
4. Enable HTTPS in Coolify.
5. Run the health check on `/`.

## Local Docker check

```bash
docker build -t sadai-red-flag .
docker run --env-file .env.local -p 3000:3000 sadai-red-flag
```
