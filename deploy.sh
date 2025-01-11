#!/bin/bash
git pull
npm run db:generate
npm run db:migration
npm i
npm run build
pm2 reload dorset-dream-agency-web
