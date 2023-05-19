import { db } from "../database/database.connection.js";

export function createShortURLTokenDB(token){
    const result = db.query(`SELECT * FROM session WHERE token=$1;`, [token]);
    return result;
}

export function createShortUrlUserDB(token){
    const result = db.query(`SELECT * FROM session WHERE token=$1`, [token]);
    return result;
}

export function createShortURLInsertDB(user, url){
    const result = db.query(`INSERT INTO url ("userId", url)
    VALUES ($1, $2)
    RETURNING id;`,
    [user.rows[0].userId ,url]
    );
    return result;
}

export function createShortURLInsert2DB(urlNow, urlshort){
    const result = db.query(`
    INSERT INTO "urlShorten" ("urlId", "urlShorten")
    VALUES ($1, $2);`,
    [urlNow.rows[0].id, urlshort]);
    return result;
}

export function getShortURLIDSelectDB(id){
    const result = db.query(`SELECT * FROM "urlShorten" WHERE id=$1;`, [id]);
    return result;
}

export function getShortURLIDResDB(urlShortId, id){
    const result = db.query(`
    SELECT "urlShorten".id, "urlShorten"."urlShorten" AS "shortUrl", url.url 
    FROM "urlShorten"
    JOIN url ON url.id = $1
    WHERE "urlShorten".id = $2;`,
    [urlShortId.rows[0].urlId, id]);
    return result;
}