import { db } from "../database/database.connection.js";
import { nanoid } from "nanoid";

export async function createShortUrl(req, res){
    const { url } = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if(!token) return res.sendStatus(401);

    try {
        const sessionActive = await db.query(`SELECT * FROM session WHERE token=$1;`, [token]);
        if (sessionActive.rows.length === 0) return res.sendStatus(401);

        const user = await db.query(`SELECT * FROM session WHERE token=$1`, [token]);
        const urlNow = await db.query(`INSERT INTO url ("userId", url)
        VALUES ($1, $2)
        RETURNING id;`,
        [user.rows[0].userId ,url]
        );

        const urlshort = nanoid(8);

        await db.query(`
        INSERT INTO "urlShorten" ("urlId", "urlShorten")
        VALUES ($1, $2);`,
        [urlNow.rows[0].id, urlshort]);

        res.send({"id": urlNow.rows[0].id, "shortUrl": urlshort});

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getShortUrlId(req, res){
    
}

export async function getShortUrl(req, res){
    
}

export async function deleteUrlId(req, res){
    
}