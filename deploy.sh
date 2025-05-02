#!/bin/bash
git pull
npm run db:generate
npm run db:migrate
rm -R ./.next
npm i
npm update next
npm run build
pm2 reload dorset-dream-agency-web
