import { nanoid } from "nanoid";
import { createShortURLInsert2DB, createShortURLInsertDB, createShortURLTokenDB, createShortUrlUserDB, getShortURLIDResDB, getShortURLIDSelectDB } from "../repositories/urls.repository.js";

export async function createShortUrl(req, res){
    const { url } = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if(!token) return res.sendStatus(401);

    try {
        const sessionActive = await createShortURLTokenDB(token);
        if (sessionActive.rows.length === 0) return res.sendStatus(401);

        const user = await createShortUrlUserDB(token);
        const urlNow = await createShortURLInsertDB(user,url);

        const urlshort = nanoid(8);

        await createShortURLInsert2DB(urlNow, urlshort);

        res.status(201).send({"id": urlNow.rows[0].id, "shortUrl": urlshort});

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getShortUrlId(req, res){
    const { id } = req.params;
    try {
        const urlShortId = await getShortURLIDSelectDB(id);
        if (urlShortId.rows.length === 0) return res.status(404).send("Não existe uma URL com este ID");

        const sendUrlId = await getShortURLIDResDB(urlShortId, id);

        res.send(sendUrlId.rows[0])
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getShortUrl(req, res){
    
}

export async function deleteUrlId(req, res){
    
}