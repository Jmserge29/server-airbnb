import express from 'express';
import ReservaController from '../Controller/ReservaController.js';

const router = express.Router();
const reservaController = new ReservaController();

router.get('/', reservaController.getAllReservations);
router.get('/:id', reservaController.getReservationById);
router.post('/', reservaController.createReservation);
router.put('/:id', reservaController.updateReservation);
router.delete('/:id', reservaController.deleteReservation);

export default router;