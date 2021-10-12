#!bin/bash

rm -rf ../backend/builds/mielentilatutkimus/build && rm -rf ../backend/builds/thl/build && \
cd ../frontend && PUBLIC_URL=/mielentilatutkimus REACT_APP_LOCAL_RUN=TRUE npm run build && \
cd ../thl-frontend && PUBLIC_URL=/thl REACT_APP_LOCAL_RUN=TRUE npm run build && \
cd ../backend && cp -r ../frontend/build builds/mielentilatutkimus && cp -r ../thl-frontend/build builds/thl
