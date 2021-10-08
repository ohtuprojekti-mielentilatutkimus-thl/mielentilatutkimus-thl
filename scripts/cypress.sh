#!/bin/bash
konsole --new-tab --noclose -e sh -c "cd ../backend && npm start" &
konsole --new-tab --noclose -e sh -c "cd ../$1 && BROWSER=none npm start" &
konsole --new-tab --noclose -e sh -c "cd ../$1 && npm run cypress:open" &
