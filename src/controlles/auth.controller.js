import { db } from "../database/database.connection.js"
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

export async function signUp(req, res) {
    const { name, email, password, confirmPassword } = req.body;
    try {
        const user = await db.query(`SELECT * FROM users WHERE email=$1;`, [email]);
        if (user.rows.length !== 0) return res.status(409).send("Usuário já existente!")

        if (password === confirmPassword) {
            const passCrypt = bcrypt.hashSync(password, 10);
            await db.query(`
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3);`,
            [name, email, passCrypt]
            );
        }

        res.status(201).send("Usuário cadastrado com sucesso!");
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function signIn(req, res) {
    const { email, password } = req.body;
    try{
        const user = await db.query(`SELECT * FROM users WHERE email=$1`, [email]);
        if (user.rows.length === 0) return res.sendStatus(401);

        const checkPass = bcrypt.compareSync(password, user.rows[0].password);
        if (!checkPass) return res.sendStatus(401);

        if (user && checkPass){
            const payload = { idUser: user.rows[0].id };
            const token = Jwt.sign(payload, process.env.JWT_SECRET);

            await db.query(`
            INSERT INTO session ("userId", token)
            VALUES ($1, $2);`,
            [user.rows[0].id, token]
            );

            res.send({token});
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function logout(req, res) {

}