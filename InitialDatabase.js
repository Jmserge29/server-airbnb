import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv'
dotenv.config()

const config = {
    host: process.env.HOST_DATABASE,
    user: process.env.DATABASE_USER,
    port: process.env.DATABASE_PORT,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME 
}

let conection;
try {
    conection = await mysql2.createConnection(config)
    console.log("Se ha extablecido conexión con MySql")
} catch (error) {
    console.log("Se ha producido un Error al momento de extablecer la conexión con la BD! ERROR: ", error)
    
}

export default conection;