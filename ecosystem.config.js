module.exports = {
  apps: [
    {
      name: "rest-api",
      script: "./api/dist/main.js",
    },
    {
      name: "users-service",
      script: "./users/dist/main.js",
    },
  ],
};
