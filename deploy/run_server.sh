# Pull code
cd travel_be_auth
npx kill-port 8000
git pull origin master

# Build and deploy
npm install
npm run build
echo "Build: done"
npm run serve &
