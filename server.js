// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
// const request = require('superagent');

// Initiate database connection
const client = require('./lib/client');
// client.connect();

// Application Setup
const app = express();

app.use(morgan('dev')); // http logging
app.use(cors()); // enable CORS request
app.use(express.static('public')); // server files from /public folder
app.use(express.json()); // enable reading incoming json data
app.use(express.urlencoded({ extended: true }));
// app.use(auth());

// Auth Routes
const createAuthRoutes = require('./lib/auth/create-auth-routes');

const authRoutes = createAuthRoutes({
    selectUser(email) {
        return client.query(`
            SELECT id, name, email, hash 
            FROM users
            WHERE email = $1;
        `,
        [email]
        ).then(result => result.rows[0]);
    },
    insertUser(user, hash) {
        return client.query(`
            INSERT into users (email, hash, name)
            VALUES ($1, $2, $3)
            RETURNING id, email, name;
        `,
        [user.email, hash, user.name]
        ).then(result => result.rows[0]);
    }
});

// before ensure auth, but after other middleware:
app.use('/api/auth', authRoutes);
const ensureAuth = require('./lib/auth/ensure-auth');
app.use('/api/user', ensureAuth);

// API Routes

app.get('/api/user/saved', async (req, res) => {
    try {
        const myQuery = `
        SELECT * FROM gameboards
        WHERE user_id=$1
        `;
        const saved = await client.query(myQuery, [req.userId]);
        res.json(saved.rows);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }
});

app.post('/api/user/saved', async (req, res) => {
    try {
        const newGameboard = await client.query(`
        INSERT INTO gameboards (board_name, game_board, scheme, music_board, user_id)
        values ($1, $2, $3, $4, $5)
        RETURNING *
        `, [
            req.body.board_name,
            req.body.game_board,
            req.body.scheme,
            req.body.music_board,
            req.userId,
        ]);
        
        res.json(newGameboard.rows[0]);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }
});

app.put('/api/user/saved/:id', async (req, res) => {
    try {
        const savedGameboard = await client.query(`
        UPDATE gameboards
        SET game_board=$1,
            scheme=$2,
            music_board=$3
        WHERE id =$4
        RETURNING *;
        `, [
            req.body.game_board,
            req.body.scheme,
            req.body.music_board,
            req.params.id,
        ]);
        res.json(savedGameboard.rows[0]);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }
});

app.delete('/api/user/saved/:id', async (req, res) => {
    try {
        const delGameboard = await client.query(`
        DELETE FROM gameboards
        WHERE gameboards.id=$1
        RETURNING *
        `, [req.params.id]);
        
        res.json(delGameboard.rows);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }
});

app.get('*', (req, res) => {
    res.send('No gameboards are here...');
});

// Start the server

module.exports = {
    app
};