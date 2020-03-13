const client = require('../lib/client');

run();

async function run() {

    try {
        // run a query to create tables
        await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(256) NOT NULL,
                email VARCHAR(256) NOT NULL,
                hash VARCHAR(512) NOT NULL
            );
        
            CREATE TABLE gameboards (
                id SERIAL PRIMARY KEY,
                board_name VARCHAR(256) NOT NULL,
                game_board VARCHAR(2000) NOT NULL,
                scheme VARCHAR(256) NOT NULL,
                music_board VARCHAR(2000) NOT NULL,
                user_id INTEGER NOT NULL REFERENCES users(id)
            );
        `);

        console.log('create tables complete');
    }
    catch (err) {
        // problem? let's see the error...
        console.log(err);
    }
    finally {
        // success or failure, need to close the db connection
        client.end();
    }
    
}