#!/bin/bash
git pull
npm i
npm run build
pm2 reload dorset-dream-agency-web
