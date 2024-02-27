# Gitlab Pipeline Viewer

This is a simple tool to visualize the Gitlab CI/CD pipelines.
In Gitlab you can't see the whole pipelines at once, 
you have to click on each project to see the details.

## Visit the live version
[Gitlab Pipeline Viewer](https://gitlab-pipeline-viewer.theapplegeek.it/)

## Technologies
- Angular
- Tailwind CSS
- PrimeNG
- GraphQL
- Gitlab API
- Gitlab OAuth2

## Features
- View pipelines of projects
- Search pipelines by project name or pipeline status
- View pipeline details

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details

## Run the project
1. Clone the project
2. Install pnpm if you don't have it `npm install -g pnpm`
2. Run `pnpm install`
3. Replace client ID in `src/enviromments/enviroment.ts` with your Gitlab client ID, 
you can also change other envs if you use a different Gitlab instance
4. Run `pnpm start`
5. Open `http://localhost:4200` in your browser
