# GraphQLBoilerPlate
Production Based GraphQL BoilerPlate ( NOT YOUR ORDINARY BOILERPLATE)
For graphql using prisma as its modeling library

built for all pipeline

# To start prisma development:

`npm i -g prisma`

then change the prisma config as per the pipepline stage that your prisma server will be deployed in

To deploy to prisma development server:
modify the `endpoint:` block of the prisma.yml file to your development server url
same applies for other pipeline environment.

To set your pipeline environment change your `NODE_ENV` to either `development`, `staging` or `production`, to deploy to the 
respective prisma server.

Then finally run the
`start_app.sh` script to run your app and deploy your graphql model to its assigned NODE_ENV prisma server
