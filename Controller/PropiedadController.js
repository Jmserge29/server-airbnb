import Propiedad from '../Models/Propiedad.js';

class PropiedadController {
    async getAllProperties(req, res) {
        try {
            const properties = await Propiedad.findAll();
            res.status(200).json(properties);
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    async getPropertyById(req, res) {
        const { id } = req.params;
        try {
            const property = await Propiedad.findById(id);
            if (!property) {
                return res.status(404).json({ error: 'Propiedad no encontrada' });
            }
            res.status(200).json(property);
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    async createProperty(req, res) {
        const { picture, nombre, ubicacion, categoria, capacidad, valor, comodidades, cc_usuario } = req.body;
        const newProperty = new Propiedad({ picture, nombre, ubicacion, categoria, capacidad, valor, comodidades, cc_usuario });
        try {
            await newProperty.save();
            res.status(201).json(newProperty);
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    async updateProperty(req, res) {
        const { id } = req.params;
        const { picture, nombre, ubicacion, categoria, capacidad, valor, comodidades, cc_usuario } = req.body;
        const updatedProperty = new Propiedad({ picture, id, nombre, ubicacion, categoria, capacidad, valor, comodidades, cc_usuario });
        try {
            await updatedProperty.update();
            res.status(200).json(updatedProperty);
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    async deleteProperty(req, res) {
        const { id } = req.params;
        try {
            await Propiedad.deleteById(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    async getPropertiesWithReservations(req, res) {
        try {
            const properties = await Propiedad.findPropertiesWithReservations();
            res.status(200).json(properties);
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    async getPropertiesByCategory(req, res) {
        const { category } = req.params;
        try {
            const properties = await Propiedad.findPropertiesByCategory(category);
            res.status(200).json(properties);
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
}

export default PropiedadController;
