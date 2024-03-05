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
If u changed prisma/schema.prisma <br />
npx prisma generate <br />
npx prisma db push <br />

Check local database <br />
npx prisma studio

## Start app
npm run dev <br />
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


