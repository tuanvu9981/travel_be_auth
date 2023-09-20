# Pull code & remove old application taking port 8000
cd travel_be_auth
npx kill-port 8000
git pull origin master

# Build and deploy
npm install
npm run build
echo "Build: done"

rm -f .env
echo "second"
echo "cat $ENV_DATA"
cat $ENV_DATA >> .env

# While not found string "Server is listening to PORT: 8000", sleep 0.1 second
npm run serve > nestjs_server_running.log 2>&1 &
while ! grep -q "Server is listening to PORT: 8000" nestjs_server_running.log
do
  sleep .1
done
echo -e "Server has started ... \n"
exit 0