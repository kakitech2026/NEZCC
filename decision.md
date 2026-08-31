# NEZCC Architecture Decisions

This document records decisions that affect the long-term implementation and operation of the NEZCC website and admin workspace.

## D-001: Payload CMS for Content Administration

- **Status:** Accepted
- **Decision:** Use Payload CMS embedded in the Next.js application.
- **Reasoning:** Payload provides a typed content model, authentication, media management, globals, and an admin UI without requiring a separate CMS deployment.
- **Consequences:** Public pages and `/admin` share one application and deployment. Payload configuration changes must be tested with both the public site and admin workflows.

## D-002: MongoDB Atlas as the Primary Database

- **Status:** Accepted
- **Decision:** Store Payload documents and users in MongoDB Atlas using `@payloadcms/db-mongodb`.
- **Reasoning:** The current content is test data, so switching away from Supabase did not require a production-data migration. MongoDB is directly supported by Payload and fits its document-oriented content model.
- **Consequences:** The application requires `MONGODB_URI`. Supabase and PostgreSQL code and dependencies are not part of the active architecture.

## D-003: Restricted Database Credentials

- **Status:** Accepted
- **Decision:** Use a dedicated Atlas database user with `readWriteAnyDatabase`, restricted to the NEZCC cluster.
- **Reasoning:** The application needs read/write access but does not need Atlas administration privileges.
- **Consequences:** Database credentials remain server-only and must never be committed or exposed with a `NEXT_PUBLIC_` prefix.

## D-004: Vercel for Application Hosting

- **Status:** Accepted
- **Decision:** Deploy the application from the GitHub `main` branch to Vercel, with `apps/web` as the project root.
- **Reasoning:** Vercel provides native Next.js hosting, Git-based deployments, and managed Blob storage.
- **Consequences:** Production configuration is supplied through Vercel environment variables. A push to `main` starts a production deployment.

## D-005: Atlas Network Access for Vercel Hobby

- **Status:** Accepted with security tradeoff
- **Decision:** Allow `0.0.0.0/0` in the Atlas IP access list while the application uses Vercel Hobby's dynamic outbound addresses.
- **Reasoning:** Vercel Hobby does not provide a single stable application egress IP suitable for an Atlas allowlist.
- **Consequences:** Network location is not an access boundary. Security depends on a strong rotated password, the restricted database role, and server-only secret handling. Revisit this decision if static egress or private networking becomes available.

## D-006: Vercel Blob for Production Media

- **Status:** Accepted
- **Decision:** Store production uploads from the Payload `media` collection in a public Vercel Blob store in Mumbai (`bom1`).
- **Reasoning:** Vercel's function filesystem is ephemeral. Public website images and documents require durable object storage and public delivery URLs.
- **Consequences:** Production requires `BLOB_READ_WRITE_TOKEN`. Client uploads are enabled. Local development continues to use local media storage when the token is absent. Media created before Blob was enabled may have valid MongoDB metadata but missing files and must be re-uploaded.

## D-007: Dynamic Homepage Content

- **Status:** Accepted
- **Decision:** Render the homepage dynamically.
- **Reasoning:** Campaign, news, event, and hero changes made in the admin workspace must appear without a new deployment.
- **Consequences:** The homepage performs server-side CMS reads per request. Caching or on-demand revalidation can be introduced later if traffic requires it.

## D-008: Original Archival Paper Texture

- **Status:** Accepted
- **Decision:** Use an original, optimized near-white archival-paper bitmap on top-level light surfaces.
- **Reasoning:** It adds cultural and tactile character while keeping cards, navigation, and dark hero areas clear and functional.
- **Consequences:** The texture must remain subtle, readable, seamless, and lightweight. The current WebP asset is stored at `apps/web/public/images/textures/archival-paper.webp`.

## D-009: Secrets and Generated Runtime Data

- **Status:** Accepted
- **Decision:** Commit `.env.example`, but ignore real environment files, local uploads, build output, and local agent artifacts.
- **Reasoning:** The repository needs a configuration contract without containing credentials or machine-specific data.
- **Consequences:** Required secrets must be configured separately in each environment.
