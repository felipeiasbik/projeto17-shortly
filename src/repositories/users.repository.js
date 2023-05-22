import { db } from "../database/database.connection.js";

export function getUserIdDB(token){
    const result = db.query(`SELECT * FROM session WHERE token=$1`, [token]);
    return result;
}

export function getUserFirstDB(id){
    const result = db.query(`
    SELECT
        u.id,
        u.name,	
        COALESCE(SUM(uc."visitCount"),0)::INTEGER AS "visitCount"         
    FROM users u
    JOIN session s ON u.id = s."userId"
    JOIN url ur ON u.id = ur."userId" 
    JOIN "urlShorten" us ON ur.id = us."urlId"
    JOIN "urlClicks" uc ON us.id = uc."urlShortenId"
    WHERE u.id = $1
    GROUP BY u.id;
    `, [id.rows[0].userId]);

    return result;
}

export function getUserFirst2DB(id){
    const result = db.query(`
    SELECT
        u.id,
        u.name
    FROM users u
    JOIN session s ON u.id = s."userId"
    WHERE u.id = $1
    GROUP BY u.id;
    `, [id.rows[0].userId]);
    
    return result;
}

export function getUserSecondDB(id){
    const result = db.query(`
    SELECT 
        us.id, 
        us."urlShorten", 
        ur.url, 
        COALESCE(SUM(uc."visitCount"),0)::INTEGER AS "visitCount"   
    FROM users u
    JOIN session s ON u.id = s."userId"
    JOIN url ur ON u.id = ur."userId" 
    JOIN "urlShorten" us ON ur.id = us."urlId"
    JOIN "urlClicks" uc ON us.id = uc."urlShortenId"
    WHERE u.id = $1
    GROUP BY us.id, ur.id;
    `, [id.rows[0].userId]);
    return result;
}