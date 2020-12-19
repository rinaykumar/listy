# Listy - CSC 667 Final Project

Listy is a place for people to discover, buy and sell items. By listing on Listy, you can reach buyers where they already are.  Created for CSC 667.


# Run Backend

1. Head to the back_end folder `cd back_end`
2. Install node modules `npm i` 
3. Start PM2 `pm2 start process.config.js`
4. Run Docker `docker-compose pull`, `docker swarm init`, `docker stack deploy -c docker-compose.yml kafka-demo`
5. Run wsServer in a new terminal `node wsServer.js`
6. Run kafkaWorker in a new terminal `node kafkaWorker.js`

# Run Frontend

1. Head to the front_end folder `cd front_end`
2. Install node modules `npm i` 
3. Start react server `npm start`


## Known Bugs

 - Login is not persistant. User authentication works fine and the frontend is able to talk to the database but as soon we move to a different page or refresh, frontend loses access to user information. 
 - If multiple message boxes are open for listings, the same inquiries get populated in each message box.
 - Issue with websocket in messages/inquiries boxes
 - Small bugs when running in Safari, but not with Chrome

## Team Members

 - Afreen Ahmed 
 - Bhavani Goruganthu
 - Danish Siddiqui
 - Girish Rawat
 - Mohammad Khan
 - Rinay Kumar
