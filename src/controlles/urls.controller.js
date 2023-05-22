import { nanoid } from "nanoid";
import { createShortURLInsert2DB, createShortURLInsertDB, createShortURLTokenDB, createShortUrlUserDB, deleteUrlIdDeleteDB, deleteUrlIdUserDB, deleteUrlIdUserIdDB, getShortURLIDResDB, getShortURLIDSelectDB, getShortUrlClicksDB, getShortUrlLongDB, getShortUrlShortDB } from "../repositories/urls.repository.js";

export async function createShortUrl(req, res){
    const { url } = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if(!token) return res.sendStatus(401);

    try {
        const sessionActive = await createShortURLTokenDB(token);
        if (sessionActive.rows.length === 0) return res.sendStatus(401);

        const user = await createShortUrlUserDB(token);
        const urlNow = await createShortURLInsertDB(user, url);

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

        res.send(sendUrlId.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getShortUrl(req, res){
    const { shortUrl } = req.params;
    console.log(shortUrl)
    try {
        const longUrl = await getShortUrlLongDB(shortUrl);

        const urlShortExist = await getShortUrlShortDB(shortUrl);
        if (urlShortExist.rowCount === 0) return res.status(404).send("Este endereço não existe!")

        await getShortUrlClicksDB(urlShortExist);

        res.redirect(longUrl.rows[0].url);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function deleteUrlId(req, res){
    const { id } = req.params;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if(!token) return res.sendStatus(401);

    try{
        const user = await deleteUrlIdUserDB(token);

        const userIdUrlShorten = await deleteUrlIdUserIdDB(id);

        if (userIdUrlShorten.rowCount === 0) return res.status(404).send("Url não existe");

        if(user.rows[0].id !== userIdUrlShorten.rows[0].userId) 
        return res.status(401).send("Url não pertence ao usuário");

        await deleteUrlIdDeleteDB(id);
        res.status(204).send("Url removida com sucesso!");

    } catch(err) {
        res.status(500).send(err.message);
    }
}
