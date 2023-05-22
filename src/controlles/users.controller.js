import { getUserFirst2DB, getUserFirst3DB, getUserFirstDB, getUserIdDB, getUserSecondDB } from "../repositories/users.repository.js";


export async function getUser(req, res){
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if(!token) return res.sendStatus(401);
    try {
        const id = await getUserIdDB(token);
        
        let first = await getUserFirstDB(id);
        
        let firstWithNotVisit = {};
        if (first.rowCount === 0) {
            const first2 = await getUserFirst2DB(id);
            firstWithNotVisit = {...first2.rows[0], "visitCount": 0};
        }

        const first3 = await getUserFirst3DB(id);
        console.log(first3.rowCount)
        if (first3.rowCount === 0) first3.rows[0] = {id: 0}

        const second = await getUserSecondDB(id);
        
        const result = first.rowCount === 0 ?{...firstWithNotVisit, shortenedUrls: [{...first3.rows[0], "visitCount": 0}]} : {...first.rows[0], shortenedUrls: second.rows};
        res.send(result);        
    } catch(err) {
        res.status(500).send(err.message);
    }
}