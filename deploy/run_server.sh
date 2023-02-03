# Pull code
cd travel_be_auth
git pull origin master

# Build and deploy
npm install
npm run build
node dist/main.js