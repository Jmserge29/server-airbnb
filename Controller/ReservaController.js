import Reserva from '../Models/Reserva.js';
import Usuario from '../Models/Usuario.js';
class ReservaController {
    async getAllReservations(req, res) {
        try {
            const reservations = await Reserva.findAll();
            res.status(200).json(reservations);
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    async getReservationById(req, res) {
        const { id } = req.params;
        try {
            const reservation = await Reserva.findById(id);
            if (!reservation) {
                return res.status(404).json({ error: 'Reserva no encontrada' });
            }
            res.status(200).json(reservation);
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    async createReservation(req, res) {
        const { Fecha_reservacion, cc_usuario } = req.body;
        try {
                        // Verificar si el usuario existe
            const user = await Usuario.findById(cc_usuario);
            if (!user) {
                return res.status(404).json({ error: 'El usuario no existe' });
            }
        
            // Verificar si existe alguna reserva para el usuario en el rango de fechas
            const existingReservation = await Reserva.findReservationByDateRange(Fecha_reservacion, cc_usuario);
            if (existingReservation) {
                // Si ya existe una reserva en ese rango de fechas, devolver un mensaje de error
                return res.status(400).json({ error: 'La reserva para este usuario en el rango de fechas especificado ya está ocupada.' });
            }
        
            // Si no hay reserva existente, proceder con la creación de la reserva
            const newReservation = new Reserva({ Fecha_reservacion, cc_usuario });
            try {
                await newReservation.save();
                res.status(201).json(newReservation);
            } catch (error) {
                console.error('Error al guardar la reserva:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }

        } catch (error) {
            console.log(error)
        }
    }
    

    async updateReservation(req, res) {
        const { id } = req.params;
        const { Fecha_reservacion, cc_usuario } = req.body;
        const updatedReservation = new Reserva({ id, Fecha_reservacion, cc_usuario });
        try {
            await updatedReservation.update();
            res.status(200).json(updatedReservation);
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    async deleteReservation(req, res) {
        const { id } = req.params;
        try {
            await Reserva.deleteById(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
}

export default ReservaController;
