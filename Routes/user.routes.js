import { Router } from "express";
import UserController from '../Controller/UsuarioController.js'
const router = Router()
const userController = new UserController();

// Ruta para obtener todos los usuarios
router.get("/get-users", userController.getUsers)
// Ruta para obtener un usuario por medio de su Id
router.get("/get-userById/:id", userController.getUser)
// Ruta para crear un nuevo usuario
router.post("/create-user", userController.createUser)
// Ruta para actualizar un usuario por medio de su Id
router.put("/update-user/:id", userController.updateUser)
// Ruta para eliminar un usuario por medio de su Id
router.delete("/delete-user/:id", userController.deleteUser)
// Ruta para CAMBIAR EL ESTADO un usuario por medio de su Id
router.delete("/deleteB-user/:id", userController.deleteUser)
// Ruta para iniciar sesión autenticarse Sign-in
router.post('/sign-in', userController.signIn)


export default router;