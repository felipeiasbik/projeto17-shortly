import { db } from "../database/database.connection.js";

export function signUpUserDB(email){
    const result = db.query(`SELECT * FROM users WHERE email=$1;`, [email]);
    return result;
}

export function signUpTokenDB(name, email, passCrypt){
    const result = db.query(`
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3);`,
            [name, email, passCrypt]
            );
    return result;
}

export function signInUserDB(email){
    const result = db.query(`SELECT * FROM users WHERE email=$1`, [email]);
    return result;
}

export function signInTokenDB(user, token){
    const result = db.query(`
    INSERT INTO session ("userId", token)
    VALUES ($1, $2);`,
    [user.rows[0].id, token]
    );
    return result;
}

export function logoutSessionDB(token){
    const result = db.query(`SELECT * FROM session WHERE token=$1;`, [token]);
    return result;
}

export function logoutDeleteDB(token){
    const result = db.query(`DELETE FROM session WHERE token=$1;`, [token]);
    return result;
}