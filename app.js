import express from 'express'
import cors from 'cors'

import petRoutes from './pets/routes/pets.routes.js'

const app = express()
const port = 3000

/* Global middlewares */
app.use(cors())
app.use(express.json())

/* Routes */
app.use('/pets', petRoutes)

/* Server setup */
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => console.log(`⚡️[server]: Server is running at https://localhost:${port}`))
}

export default app