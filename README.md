## Deployed app on Vercel
https://auth-app-eta-two.vercel.app/

## Cloning repository
git clone https://github.com/KonradBlonka/auth_app.git

## Install packages
npm i

## .env file
DATABASE_URL=<br />
DIRECT_URL=<br />
AUTH_SECRET=<br />
GOOGLE_CLIENT_ID=<br />
GOOGLE_CLIENT_SECRET=<br />
RESEND_API_KEY=<br />
NEXT_PUBLIC_APP_URL=<br />

## prisma
<!-- if u change prisma/schema.prisma -->
npx prisma generate
npx prisma db push

<!-- check local database -->
npx prisma studio

## Start app
npm run dev
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
