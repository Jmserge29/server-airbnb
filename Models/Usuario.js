import db from '../InitialDatabase.js'
import moment from 'moment';
import bcrypt from 'bcryptjs'
const date = moment().format('LLLL')

export default class Usuario {

    constructor({ cedula, nombre, email, contraseña }) {
        this.cedula = cedula;
        this.picture = "";
        this.numero_tarjeta = "";
        this.nombre = nombre;
        this.email = email;
        this.rol_id = null;
        this.contraseña = contraseña;
        this.createdAt = date;
        this.estado = 1;
    }

    // CHECK ✅
    static async findAll() {
        try {
            const [rows] = await db.query('SELECT cedula,nombre,email,picture,numero_tarjeta,contraseña,createdAt,estado,HEX(roleId) AS roleId FROM usuario');
            if (rows.length === 0) return null;
            return rows;
        } catch (error) {
            console.error('Error al buscar usuarios', error);
            throw error;
        }
    }

    // CHECK ✅
    async findById(id) {
        try {
            const [rows] = await db.query('SELECT cedula,nombre,email,contraseña,createdAt,estado,HEX(roleId) AS roleId FROM usuario WHERE cedula = ?', [id]);
            if (rows.length === 0) return null;
            return new Usuario(rows[0]);
        } catch (error) {
            console.error('Error al buscar usuario por ID:', error);
            throw error;
        }
    }

    static async findByEmail(email) {
        try {
            const [row] = await db.query('SELECT cedula,picture,nombre,email,contraseña,createdAt,estado,HEX(roleId) AS roleId FROM usuario WHERE email = ?', [email]);
            if (row.length === 0) return null;
            return row[0];
        } catch (error) {
            console.error('Error al buscar usuario por ID:', error);
            throw error;
        }
    }

    static async findById(cc_usuario) {
        try {
            const [rows] = await db.query('SELECT * FROM Usuario WHERE cedula = ?', [cc_usuario]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error('Error al buscar usuario por cedula:', error);
            throw error;
        }
    }


    static async findBynombre(nombre) {
        try {
            const [rows] = await db.query('SELECT * FROM usuario WHERE nombre = ?', [nombre]);
            if (rows.length === 0) return null;
            return new Usuario(rows[0]);
        } catch (error) {
            console.error('Error al buscar usuario por nombre de usuario:', error);
            throw error;
        }
    }

    // CHECK ✅
    async save() {
        try {
            // Obteniendo el Id de Cliente de la tabla de Rol
            console.log("Entro a guardar")
            const rolCLiente = await db.query(`SELECT HEX(id) AS id, nombre FROM Rol WHERE nombre = 'Cliente'`)
            const idRol = rolCLiente[0][0].id;
            console.log(idRol)
            this.rol_id =idRol;
            // Codificando la contraseña del Usuario
            this.contraseña = await this.encryptPassword(this.contraseña);
            await db.query('INSERT INTO usuario (cedula, picture, nombre, email, contraseña, estado, numero_tarjeta, createdAt, roleId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, UNHEX(?))', [this.cedula, "",this.nombre, this.email, this.contraseña, this.estado, "", this.createdAt, idRol]);
        } catch (error) {
            console.error('Error al guardar usuario:', error);
            throw error;
        }
    }

    async sign_in(email, password) {
        try {
            // Comparar la constraseña ingresada con la contraseña hasheada
            const passwordCorrect = await this.comparePassword(password, this.contraseña)
            if(!passwordCorrect) return null
            return password
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            throw error;
        }
    }


    async update() {
        try {
            await db.query('UPDATE usuario SET nombre = ?, email = ?, constraseña = ? WHERE id = ?', [this.nombre, this.email, this.contraseña, this.cedula]);
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            throw error;
        }
    }

    async deleteBoolean() {
        try {
            await db.query('UPDATE usuario SET estado = ? WHERE id = ?', [false, this.cedula]);
        } catch (error) {
            console.error('Error al eliminar boolean usuario:', error);
            throw error;
        }
    }

    async delete() {
        try {
            await db.query('DELETE FROM usuario WHERE id = ?', [this.cedula]);
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            throw error;
        }
    }

    // Encrypt password the User
    encryptPassword = async (password) => {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    };
    // Comparer Passwords the User
    comparePassword = async (password, reveicedPassword) => {
        return await bcrypt.compare(password, reveicedPassword);
    };
}

