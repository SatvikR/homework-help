# Homework Help

[![Continuous Deployment](https://github.com/SatvikR/homework-help/workflows/Continuous%20Deployment/badge.svg)](https://github.com/SatvikR/homework-help/actions?query=workflow%3A%22Continuous+Deployment%22)

[![Deploy with Vercel](https://vercel.com/button)](<https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2FSatvikR%2Fhomework-help&env=NEXT_PUBLIC_API_URL&envDescription=API%20URL%20Required%20for%20this%20app.%20(The%20public%20api%20is%20https%3A%2F%2Fhwapi.satvikreddy.com%2C%20Do%20not%20use%20a%20slash%20at%20the%20end)&project-name=homework-help-project&repo-name=homework-help-project>)

> This was made for the 2nd TechWithTim CodeJam, Discord name: satvikr#6888

> NOTE: Github shows that this repo has two contributers, which it doesn't. (See [this link](https://github.com/SatvikR/homework-help/graphs/contributors)). I assume the second contributer is [dependabot](https://github.blog/2020-06-01-keep-all-your-packages-up-to-date-with-dependabot/). Dependabot DOES NOT add any code, dependabot only updates outdated dependencies.

## Description

This project is a platform made for students to get help on homework and assignments. Students can share questions, answer questions, and give feedback.

Go to [hw.satvikreddy.com](https://hw.satvikreddy.com/) to check it out.

## Made With:

- [Node](https://nodejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)
- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)

## Deployed With:

- [AWS EC2](https://aws.amazon.com/ec2/)
- [Docker/Docker-Compose](https://www.docker.com/)
- [Vercel](https://vercel.com/)
- [Github Actions](https://github.com/features/actions)

## Run Locally:

1. Clone the repo
1. Once inside the repo's root directory, run `yarn install`
1. Create a `.env.development` file in the `/packages/api` directory, and set 4 variables
```
DB_URI=<mongodb connection string, ex. mongodb://localhost:27017/cluster0>
REDIS_URL=<redis connection string, ex. redis://localhost:6379/>
ACCESS_TOKEN_SECRET=<a random string of characters>
REFRESH_TOKEN_SECRET=<a different random string of characters>
```
4. Create a `.env.local` file in the `/packages/web` directory, and set 1 variable
```
NEXT_PUBLIC_API_URL=<api url, if running on default ports use http://localhost:8000>
```
5. Go back to the root directory of the repo in your terminal and run `yarn dev`.
6. Go to http://localhost:3000 in your browser to view the app running, http://localhost:8000 for the api.
