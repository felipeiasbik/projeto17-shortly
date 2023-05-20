import { db } from "../database/database.connection.js";

export async function getRanking(req, res){
    try {
        const ranking = await db.query(`
        SELECT
            users.id,
            users.name,
            CAST(COUNT(DISTINCT "urlShorten".id) AS INTEGER) AS "linksCount",
            COALESCE(SUM("urlClicks"."visitCount"),0)::INTEGER AS "visitCount"
        FROM
            users
            LEFT JOIN session ON users.id = session."userId"
            LEFT JOIN url ON users.id = url."userId"
            LEFT JOIN "urlShorten" ON url.id = "urlShorten"."urlId"
            LEFT JOIN "urlClicks" ON "urlShorten".id = "urlClicks"."urlShortenId"
        GROUP BY
            users.id
        ORDER BY
            "visitCount" DESC
        LIMIT 10;`);
        res.send(ranking.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}