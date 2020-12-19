module.exports = {
  // pm2 start process.config.js
  apps: [
    {
      name: "authentication",
      script: "./authentication.js",
      watch: true,
    },
    {
      name: "listings",
      script: "./listings.js",
      watch: true,
    },
    {
      name: "inquiries",
      script: "./inquiries.js",
      watch: true,
    },
    {
      name: "mongo",
      script: "./mongo.js",
      watch: true,
    },
    {
      name: "gateway",
      script: "./gateway.js",
      watch: true,
    },
    // {
    //   name: "kafkaWorker",
    //   script: "./kafkaWorker.js",
    //   watch: true,
    // },
    // {
    //   name: "wsServer",
    //   script: "./wsServer.js",
    //   watch: true,
    // },
  ],
};
