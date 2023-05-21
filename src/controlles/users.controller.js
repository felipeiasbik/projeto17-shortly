import { db } from "../database/database.connection.js";

export async function getUser(req, res){
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if(!token) return res.sendStatus(401);
    try {
        const id = await db.query(`SELECT * FROM session WHERE token=$1`, [token]);
        
        const first = await db.query(`
        SELECT
            u.id,
            u.name,	
            COALESCE(SUM(uc."visitCount"),0) AS "visitCount"         
        FROM users u
        JOIN session s ON u.id = s."userId"
        JOIN url ur ON u.id = ur."userId" 
        JOIN "urlShorten" us ON ur.id = us."urlId"
        JOIN "urlClicks" uc ON us.id = uc."urlShortenId"
        WHERE u.id = $1
        GROUP BY u.id;
        `, [id.rows[0].userId]);
        
        const second = await db.query(`
        SELECT 
            us.id, 
            us."urlShorten", 
            ur.url, 
            COALESCE(SUM(uc."visitCount"),0) AS "visitCount"   
        FROM users u
        JOIN session s ON u.id = s."userId"
        JOIN url ur ON u.id = ur."userId" 
        JOIN "urlShorten" us ON ur.id = us."urlId"
        JOIN "urlClicks" uc ON us.id = uc."urlShortenId"
        WHERE u.id = $1
        GROUP BY us.id, ur.id;
        `, [id.rows[0].userId]);

        const result = {...first.rows[0],shortenedUrls: second.rows}
        res.send(result);        
    } catch(err) {
        res.status(500).send(err.message);
    }
}