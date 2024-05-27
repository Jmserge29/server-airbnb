import { Router } from 'express';
import PropiedadController from '../Controller/PropiedadController.js';

const router = Router();
const propiedadController = new PropiedadController();

router.get('/properties', propiedadController.getAllProperties);
router.get('/properties/:id', propiedadController.getPropertyById);
router.post('/properties', propiedadController.createProperty);
router.put('/properties/:id', propiedadController.updateProperty);
router.delete('/properties/:id', propiedadController.deleteProperty);
router.get('/properties-with-reservations', propiedadController.getPropertiesWithReservations);
router.get('/properties-category/:category', propiedadController.getPropertiesByCategory);

export default router;