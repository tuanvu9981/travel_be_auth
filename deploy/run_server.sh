# Pull code
cd travel_be_auth
npx kill-port 8000
git pull origin master

# Build and deploy
npm install
npm run build
npm run serve > nestjs_server_running.log