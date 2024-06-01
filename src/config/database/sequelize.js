require("dotenv").config({ path: "../../.local.env" });
import * as pg from 'pg';
import { Sequelize } from 'sequelize';



// this is not working
const username = process.env.NEXT_PUBLIC_DB_USERNAME;
const password = process.env.NEXT_PUBLIC_DB_PASSWORD;
const host = process.env.NEXT_PUBLIC_DB_HOST;
const port = process.env.NEXT_PUBLIC_DB_PORT;
const databaseName = process.env.NEXT_PUBLIC_DB_NAME;
const dialect = process.env.NEXT_PUBLIC_DB_DIALECT;


// this is working and it is not recommended

// const username = "your_username";
// const password = "your_password";
// const host = "localhost"; // supbase url or localhost
// const port = 5432;
// const databaseName = "postgres";
// const dialect = "postgres";

const sequelize = new Sequelize(`
  postgres://${username}:${password}@${host}:${port}/${databaseName}
`, {
  dialectModule: pg
});


sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });



module.exports = sequelize;

