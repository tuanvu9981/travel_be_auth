# Pull code
cd travel_be_auth
npx kill-port 8000
git pull origin master

# Build and deploy
npm install
npm run build
echo "Build: done"
npm run serve > nestjs_server_running.log || FAILED=true
grep -e 'listening on \*:8000' nestjs_server_running.log  
if [ "$FAILED" == "true" ]; then echo "Running failed"; fi
