import { db } from "../database/database.connection.js";

export function getRankingDB(){
    const result = db.query(`
    SELECT
        u.id,
        u.name,
        CAST(COUNT(DISTINCT us.id) AS INTEGER) AS "linksCount",
        COALESCE(SUM(uc."visitCount"),0)::INTEGER AS "visitCount"
    FROM
        users u
        LEFT JOIN session s ON u.id = s."userId"
        LEFT JOIN url ur ON u.id = ur."userId"
        LEFT JOIN "urlShorten" us ON ur.id = us."urlId"
        LEFT JOIN "urlClicks" uc ON us.id = uc."urlShortenId"
    GROUP BY
        u.id
    ORDER BY
        "visitCount" DESC
    LIMIT 10;`);
    return result;
}