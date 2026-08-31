# NEZCC Website and Admin

This Next.js application uses Payload CMS with MongoDB. Copy `.env.example` to a local `.env` file and provide a MongoDB Atlas connection string and a long, random Payload secret:

```dotenv
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority
PAYLOAD_SECRET=<long-random-secret>
BLOB_READ_WRITE_TOKEN=<vercel-blob-read-write-token>
```

Database credentials must remain server-only. Do not prefix `MONGODB_URI` or `PAYLOAD_SECRET` with `NEXT_PUBLIC_`.

`BLOB_READ_WRITE_TOKEN` is optional locally. In production, connect a Vercel Blob store to the project so uploaded media remains available across deployments. Vercel supplies this variable when the store is connected.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
