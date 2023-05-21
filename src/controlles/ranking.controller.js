import { getRankingDB } from "../repositories/ranking.repository.js";

export async function getRanking(req, res){
    try {
        const ranking = await getRankingDB();
        res.send(ranking.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}