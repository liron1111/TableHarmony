# DevHarmony

Track, maintain, and streamline every aspect of your schools.

This project is for students, teachers and managers of schools designed to help managing the school system.

![banner](/public/banner.png)

## Features

#### School Management

Manage schools by creating, updating, and organizing schools within the system.
Assign roles to users (e.g., manager, teacher, student) for proper access control.

#### Course Management

Create and manage courses within schools.
Assign teachers and students to courses.
Manage course details, including descriptions, schedules, and related events.

#### Semester Management

Organize courses and classes within specific semesters.
Create upcoming semesters and manage active or past semesters. View details such as semester start and end dates.

- Light/dark mode toggle
- QR code
- Changelog
- Responsive design
- Cross platform (PWA)

## Tech Stack

**Client:** React, Next, TailwindCSS, Shadcn.

**Backend:** Node, Convex.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

#### Clerk

Create a clerk project for authentication and copy the API keys `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, In addition create a convex webhook and copy it's secret `CLERK_WEBHOOK_SECRET`, Lastly copy the JWT secret `CLERK_JWT_ISSUER_DOMAIN`.

#### Convex

Create a convex project and link to it using `npx convex dev` copy the `CONVEX_DEPLOYMENT` and `NEXT_PUBLIC_CONVEX_URL`. <br />
Remember to add the following environment variables to convex: `CLERK_WEBHOOK_SECRET`, `CLERK_JWT_ISSUER_DOMAIN`.

#### Resend

Create an account on https://resend.com/ and generate an api key and paste into `RESEND_API_KEY`

Setup your domain in resend so that you can send emails from your custom domain and set `EMAIL_FROM` to match your expected from line. To do this, go to your domain provider and add the necessary records outlined in resend.

## Acknowledgements

- [Project Planner Ai](https://projectplannerai.com)
- [Readme.so](https://readme.so/)
- [QR Grid](https://www.qrgrid.dev/)

![Logo](/public/logo.png)
