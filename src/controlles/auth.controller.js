import { db } from "../database/database.connection.js"
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

export async function signUp(req, res) {
    const { name, email, password } = req.body;
    try {
        const user = await db.query(`SELECT * FROM users WHERE email=$1;`, [email]);
        if (user.rows.length !== 0) return res.status(409).send("Usuário já existente!")

        await db.query(`
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3);`,
        [name, email, password]
        );

        res.status(201).send("Usuário cadastrado com sucesso!");
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function signIn(req, res) {

}

export async function logout(req, res) {

}