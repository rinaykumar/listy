# Listy
![GitHub](https://img.shields.io/github/license/rinaykumar/listy)
![GitHub language count](https://img.shields.io/github/languages/count/rinaykumar/listy)
![GitHub top language](https://img.shields.io/github/languages/top/rinaykumar/listy)

Listy is a fullstack ecommerce listing web app devleoped with JavaScript, utlizing React, Redux, Redis, Kafka, Docker, WebSocket, and MongoDB.
Built with a great team using Agile software development. 


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

## Team Members
 
 - Rinay Kumar
 - Afreen Ahmed 
 - Bhavani Goruganthu
 - Danish Siddiqui
 - Girish Rawat
 - Mohammad Khan
