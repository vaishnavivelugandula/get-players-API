const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const app = express();

const dbPath = path.join(__dirname, "cricketTeam.db");

let db = null;

const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3003, () => {
      console.log("Server Running at http://localhost:3003/");
      process.exit(1);
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
  }
};

initializeDbAndServer();

app.get("/players", (request, response) => {
  const getPlayersQuery = `
    SELECT *
    FROM cricket_team
    ORDER BY player_id;
    `;
  const playersList = db.all(getPlayersQuery);
  response.send(playersList);
});

module.exports = app;
