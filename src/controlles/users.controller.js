import { getUserFirstDB, getUserIdDB, getUserSecondDB } from "../repositories/users.repository.js";


export async function getUser(req, res){
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if(!token) return res.sendStatus(401);
    try {
        const id = await getUserIdDB(token);
        
        const first = await getUserFirstDB(id);
        console.log(first.rows)
        
        const second = await getUserSecondDB(id);
        
        const result = {...first.rows[0], shortenedUrls: second.rows};
        res.send(result);        
    } catch(err) {
        res.status(500).send(err.message);
    }
}