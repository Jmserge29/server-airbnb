import express from 'express'
import dotenv from 'dotenv'
import moment from 'moment'
import './InitialDatabase.js'
import userRoute from './Routes/user.routes.js'
import propiedadRoute from './Routes/propiedad.routes.js'
import reservaRoute from './Routes/reserva.routes.js'
import cors from 'cors'

dotenv.config()
const date = moment().format('LLLL')
const app = express()


app.listen(process.env.PORT || 8089, () => {
    console.log(`The server is running in PORT ${process.env.PORT}`)
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*", credentials: true}))
app.use("/user", userRoute)
app.use("/property", propiedadRoute)
app.use("/reserve", reservaRoute)


app.use("/dev", (req, res) => {
    res.send("Hellow Dev, how are you?\nThis's proyect is developed By José Serge and Andrés Rodríguez\nNice day! DATE: "+date)
})