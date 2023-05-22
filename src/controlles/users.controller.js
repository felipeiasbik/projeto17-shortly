import { getUserFirst2DB, getUserFirstDB, getUserIdDB, getUserSecondDB } from "../repositories/users.repository.js";


export async function getUser(req, res){
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if(!token) return res.sendStatus(401);
    try {
        const id = await getUserIdDB(token);
        
        let first = await getUserFirstDB(id);
        
        let first3 = {};
        if (first.rows.length === 0) {
            const first2 = await getUserFirst2DB(id);
            first3 = {...first2.rows[0], "visitCount": 0};
        }

        const second = await getUserSecondDB(id);
        
        const result = first.rowCount === 0 ?{...first3, shortenedUrls: []} : {...first.rows[0], shortenedUrls: second.rows};
        res.send(result);        
    } catch(err) {
        res.status(500).send(err.message);
    }
}