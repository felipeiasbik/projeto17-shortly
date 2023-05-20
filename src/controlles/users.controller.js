import { db } from "../database/database.connection.js";

export async function getUser(req, res){
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if(!token) return res.sendStatus(401);
    // try {
        
    // } catch(err) {
    //     res.status(500).send(err.message);
    // }
}