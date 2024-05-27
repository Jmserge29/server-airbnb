import db from '../InitialDatabase.js';

export class Reserva {
    constructor({ id, Fecha_reservacion, cc_usuario }) {
        this.id = id;
        this.Fecha_reservacion = Fecha_reservacion;
        this.cc_usuario = cc_usuario;
    }

    static async findAll() {
        try {
            const [rows] = await db.query('SELECT HEX(id) as id, Fecha_reservacion, cc_usuario FROM Reserva');
            return rows;
        } catch (error) {
            console.error('Error al obtener todas las reservas:', error);
            throw error;
        }
    }

    static async findById(id) {
        try {
            const [rows] = await db.query('SELECT HEX(id) as id, Fecha_reservacion, cc_usuario FROM Reserva WHERE id = UNHEX(?)', [id]);
            if (rows.length === 0) return null;
            return new Reserva(rows[0]);
        } catch (error) {
            console.error('Error al buscar reserva por ID:', error);
            throw error;
        }
    }

    static async findByUsuario(cc_usuario) {
        try {
            const [rows] = await db.query('SELECT HEX(id) as id, Fecha_reservacion, cc_usuario FROM Reserva WHERE cc_usuario = ?', [cc_usuario]);
            return rows;
        } catch (error) {
            console.error('Error al buscar reservas por usuario:', error);
            throw error;
        }
    }

    async save() {
        try {
            await db.query('INSERT INTO Reserva (id, Fecha_reservacion, cc_usuario) VALUES (UNHEX(REPLACE(UUID(),"-","")), ?, ?)', 
            [this.Fecha_reservacion, this.cc_usuario]);
        } catch (error) {
            console.error('Error al guardar la reserva:', error);
            throw error;
        }
    }

    async update() {
        try {
            await db.query('UPDATE Reserva SET Fecha_reservacion = ?, cc_usuario = ? WHERE id = UNHEX(?)', 
            [this.Fecha_reservacion, this.cc_usuario, this.id]);
        } catch (error) {
            console.error('Error al actualizar la reserva:', error);
            throw error;
        }
    }

    static async deleteById(id) {
        try {
            await db.query('DELETE FROM Reserva WHERE id = UNHEX(?)', [id]);
        } catch (error) {
            console.error('Error al eliminar la reserva:', error);
            throw error;
        }
    }

    // Dentro del modelo Reserva

static async findReservationByDateRange(dateRange, cc_usuario) {
    try {
        const [rows] = await db.query('SELECT * FROM Reserva WHERE Fecha_reservacion = ? AND cc_usuario = ?', [dateRange, cc_usuario]);
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.error('Error al buscar reserva por rango de fechas:', error);
        throw error;
    }
}

}

export default Reserva;
