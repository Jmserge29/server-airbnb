import db from '../InitialDatabase.js';

export class Propiedad {
    constructor({ picture, id, nombre, ubicacion, categoria, capacidad, valor, comodidades, cc_usuario }) {
        this.picture = picture;
        this.id = id;
        this.nombre = nombre;
        this.ubicacion = ubicacion;
        this.categoria = categoria;
        this.capacidad = capacidad;
        this.valor = valor;
        this.comodidades = comodidades;
        this.cc_usuario = cc_usuario;
    }

    static async findAll() {
        try {
            const [rows] = await db.query('SELECT HEX(p.id) as id, p.picture, p.nombre, p.ubicacion, p.categoria, p.capacidad, p.valor, p.comodidades, u.nombre as usuario_nombre FROM Propiedad p JOIN Usuario u ON p.cc_usuario = u.cedula');
            return rows;
        } catch (error) {
            console.error('Error al obtener todas las propiedades:', error);
            throw error;
        }
    }

    static async findById(id) {
        try {
            const [rows] = await db.query('SELECT HEX(p.id) as id, p.picture, p.nombre, p.ubicacion, p.categoria, p.capacidad, p.valor, p.comodidades, p.cc_usuario FROM Propiedad p JOIN Usuario u ON p.cc_usuario = u.cedula WHERE p.id = UNHEX(?)', [id]);
            if (rows.length === 0) return null;
            return new Propiedad(rows[0]);
        } catch (error) {
            console.error('Error al buscar propiedad por ID:', error);
            throw error;
        }
    }

    static async findByUsuario(cedulaUsuario) {
        try {
            const [rows] = await db.query('SELECT * FROM Propiedad WHERE cc_usuario = ?', [cedulaUsuario]);
            return rows;
        } catch (error) {
            console.error('Error al buscar propiedades por usuario:', error);
            throw error;
        }
    }

    async save() {
        try {
            await db.query('INSERT INTO Propiedad (picture, id, nombre, ubicacion, categoria, capacidad, valor, comodidades, cc_usuario) VALUES (?, UNHEX(REPLACE(UUID(),"-","")), ?, ?, ?, ?, ?, ?, ?)', 
            [this.picture, this.nombre, this.ubicacion, this.categoria, this.capacidad, this.valor, this.comodidades, this.cc_usuario]);
        } catch (error) {
            console.error('Error al guardar la propiedad:', error);
            throw error;
        }
    }

    async update() {
        try {
            await db.query('UPDATE Propiedad SET picture = ?, nombre = ?, ubicacion = ?, categoria = ?, capacidad = ?, valor = ?, comodidades = ?, cc_usuario = ? WHERE id = ?', 
            [this.picture, this.nombre, this.ubicacion, this.categoria, this.capacidad, this.valor, this.comodidades, this.cc_usuario, this.id]);
        } catch (error) {
            console.error('Error al actualizar la propiedad:', error);
            throw error;
        }
    }

    static async deleteById(id) {
        try {
            await db.query('DELETE FROM Propiedad WHERE id = ?', [id]);
        } catch (error) {
            console.error('Error al eliminar la propiedad:', error);
            throw error;
        }
    }

    static async findPropertiesWithReservations() {
        try {
            const [rows] = await db.query(`
                SELECT p.*, r.Fecha_reservacion 
                FROM Propiedad p
                JOIN propiedad_reserva pr ON p.id = pr.id_propiedad
                JOIN Reserva r ON pr.id_reservacion = r.id
            `);
            return rows;
        } catch (error) {
            console.error('Error al buscar propiedades con reservas:', error);
            throw error;
        }
    }

    static async findPropertiesByCategory(category) {
        try {
            const [rows] = await db.query('SELECT * FROM Propiedad WHERE categoria = ?', [category]);
            return rows;
        } catch (error) {
            console.error('Error al buscar propiedades por categoría:', error);
            throw error;
        }
    }
}

export default Propiedad;