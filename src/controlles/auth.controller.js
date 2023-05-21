import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { logoutDeleteDB, logoutSessionDB, signInTokenDB, signInUserDB, signUpTokenDB, signUpUserDB } from "../repositories/auth.repository.js";

export async function signUp(req, res) {
    const { name, email, password, confirmPassword } = req.body;
    try {
        const user = await signUpUserDB(email);
        if (user.rows.length !== 0) return res.status(409).send("Usuário já existente!")

        if (password === confirmPassword) {
        const passCrypt = bcrypt.hashSync(password, 10);
        await signUpTokenDB(name, email, passCrypt);
        }

        res.status(201).send("Usuário cadastrado com sucesso!");
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function signIn(req, res) {
    const { email, password } = req.body;
    try{
        const user = await signInUserDB(email);
        if (user.rows.length === 0) return res.sendStatus(401);

        const checkPass = bcrypt.compareSync(password, user.rows[0].password);
        if (!checkPass) return res.sendStatus(401);

        if (user && checkPass){
        const payload = { idUser: user.rows[0].id };
        const token = Jwt.sign(payload, process.env.JWT_SECRET || "super_secret_key");

        await signInTokenDB(user, token);

        res.send({token});
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function logout(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if(!token) return res.sendStatus(401);

    try {
        const sessionActive = await logoutSessionDB(token);
        if (sessionActive.rows.length === 0) return res.sendStatus(401);

        await logoutDeleteDB(token);
        res.send("Usuário deslogado com sucesso!")
    } catch (err) {
        res.status(500).send(err.message);
    }
}
