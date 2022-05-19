import { password } from 'pg/lib/defaults';
import conn from '../../lib/db'

export default async (req, res) => {
    try {
        // console.log("req data:", req.body)
        const userData = {
            username: 'admin',
            password: 'admin'
        }
        const isExisted = await conn.query('SELECT username FROM users WHERE username = $1', [userData.username]);
        
        res.status(200).json({message: `User ${userData.username} is ${isExisted? 'in' : 'not in'} the database.`})
        // const query = 'INSERT INTO users(username, password, is_admin) VALUES($1, $2, $3)'
        // const values = [userData.username, userData.password, true]
        // const result = await conn.query(
        //     query,
        //     values
        // );
        // console.log("Result: ", result);

    } catch (error) {
        console.log(error)
    }


};