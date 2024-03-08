## Auth app
This is authentication application written in TypeScript with Next.js framework.
The program includes:
- various authentication methods implementation: login, registration and password reset. 
- various user type roles management 
- application protection against common attacks: two-factor authentication and email verification  
- authentication adoption of both credential and social provider with Auth.js library. Authentication tokens management and authorization  
- app’s components definition with reusable and adaptable usability for future projects 
- sessions, callbacks and events implementation with Auth.js middleware    
- app integration with PostgreSQL database for user data storage and sessions management 

## Used libraries, tools and frameworks: 
- React and TailwindCSS – frameworks used for the appearance of the website and components, shadcn components customization 
- Prisma - object-relational mapping tool for PostgreSQL database communication in neon.tech 
- Bcrypt.js - library for user passwords encryption 
- Auth.js - authentication and option to log in with existing Google login via OAuth 
- Uuid – library for tokens used in registration and account verification, adopted for the user's ID 
- Resend – e-mail API for send messages to the user's registered e-mail address 
- Zod – library for data schemas declaration and validation, automated checks whether the data complies with the created structure 

## Deployed app on Vercel
U can try this application by clicking this URL adress: "https://auth-app-eta-two.vercel.app/"

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
If u changed prisma/schema.prisma: <br />
- npx prisma generate <br />
- npx prisma db push <br />

Check local database: <br />
- npx prisma studio

## Start app
npm run dev <br />
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


