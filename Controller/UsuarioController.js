import Usuario from '../Models/Usuario.js';

class UserController {
    // CHECK ✅
    async getUsers(req, res) {
        try {
            const user = await Usuario.findAll()
            if (!user) {
                return res.status(404).json({ error: 'No se han encontrado usuarios' });
            }
            res.status(200).json(user);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    // CHECK ✅
    async getUser(req, res) {
        const userId = req.params.id;
        try {
            const user = await Usuario.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            res.json(user);
        } catch (error) {
            console.error('Error al obtener el usuario:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    // CHECK ✅
    async createUser(req, res) {
        const { nombre, email, contraseña, cedula } = req.body;
        const newUser = new Usuario({ cedula, nombre, email, contraseña  });
        try {
            const findUserExist = await newUser.findById(cedula);
            console.log(findUserExist)
            if(findUserExist) return res.status(400).json({error: "La identificación ingresada ya se encuentra asociada."})
            await newUser.save();
            res.status(201).json(newUser);
            console.log(`Se ha creado el Usuario con exito!`)
        } catch (error) {
            console.error('Error al crear el usuario:', error.sqlMessage);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    async updateUser(req, res) {
        const userId = req.params.id;
        const { username, email, roleId } = req.body;
        const updatedUser = new Usuario({ id: userId, username, email, roleId });
        try {
            await updatedUser.update();
            res.json(updatedUser);
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    async deleteUser(req, res) {
        const userId = req.params.id;
        try {
            const user = await Usuario.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            await user.delete();
            res.status(204).send();
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    // CHECK ✅
    async signIn(req, res) {
        const {email, password} = req.body;
        try {
            const user = await Usuario.findByEmail(email);
            if(!user) return res.status(404).json({error: "Usuario no encontrado"})
            const newUser = new Usuario(user)
            const response = await newUser.sign_in(email, password);
            if(!response) return res.status(401).json({error: "No Autorizado, contraseña incorrecta"})
            return res.status(200).json({data: user})
        } catch (error) {
            console.error('Error al obtener el usuario:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
    
}

export default UserController;