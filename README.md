# Listy - CSC 667 Final Project

Listy is a place for people to discover, buy and sell items. By listing on Listy, you can reach buyers where they already are.  Created for CSC 667.


# Run Backend

1. Head to the back_end folder `cd back_end`
2. Install node modules `npm i` 
3. Start PM2 `pm2 start process.config.js`
4. Run Docker `docker-compose pull`, `docker swarm init`, `docker stack deploy -c docker-compose.yml kafka-demo`

# Run Frontend

1. Head to the back_end folder `cd front_end`
2. Install node modules `npm i` 
3. Start react server `npm start`


## Known Bugs

 - Login is not persistant. User authentication works fine and the frontend is able to talk to the database but as soon we move to a different page or refresh, frontend loses access to user information. 
 - There's a small delay (~5s) in WebSocket while communicating messages between clients.
 - Deleting a listing sometimes deletes the most recent listing instead of the intended listing that the user is trying to delete.

## Team Members

 - Afreen Ahmed 
 - Bhavani Goruganthu
 - Danish Siddiqui
 - Girish Rawat
 - Mohammad Khan
 - Rinay Kumar
