#!/bin/bash

# To run prisma make sure to send your NODE_ENV to either: staging, development or production
sleep 1
env=${NODE_ENV}
if [ -z "$env" ]
then 
        echo "evironment not set on NODE_ENV"
else
        echo -e "Deploying prisma on \033[1m$env\033[0m server please wait ..."
        cd ./prisma/$env/
        prisma deploy -e .
fi
npm start