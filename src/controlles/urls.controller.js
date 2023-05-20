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

        res.status(201).send({"id": urlNow.rows[0].id, "shortUrl": urlshort});

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getShortUrlId(req, res){
    const { id } = req.params;
    try {
        const urlShortId = await db.query(`SELECT * FROM "urlShorten" WHERE id=$1;`, [id]);
        if (urlShortId.rows.length === 0) return res.status(404).send("Não existe uma URL com este ID");

        const sendUrlId = await db.query(`
        SELECT "urlShorten".id, "urlShorten"."urlShorten" AS "shortUrl", url.url 
        FROM "urlShorten"
        JOIN url ON url.id = $1
        WHERE "urlShorten".id = $2;`,
        [urlShortId.rows[0].urlId, id]);

        res.send(sendUrlId.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getShortUrl(req, res){
    const { shortUrl } = req.params;
    try {
        const longUrl = await db.query(`
        SELECT url.url FROM url
        JOIN "urlShorten" ON "urlShorten"."urlId" = url.id
        WHERE "urlShorten" = $1;`,
        [shortUrl]);

        const urlShortExist = await db.query(`
        SELECT * FROM "urlShorten" 
        WHERE "urlShorten"."urlShorten" = $1;`,
        [shortUrl]);
        if (urlShortExist.rowCount === 0) return res.status(404).send("Este endereço não existe!")

        await db.query(`
        INSERT INTO "urlClicks" ("urlShortenId", "visitCount")
        VALUES ($1, $2);`,
        [urlShortExist.rows[0].id, 1]);

        res.redirect(longUrl.rows[0].url);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function deleteUrlId(req, res){

}
