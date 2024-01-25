import cookieParser from 'cookie-parser'
import cors from "cors"
import express, { Application } from 'express'
import router from './app/routes'
const app: Application = express()


// parser
app.use(express.json())
app.use(cookieParser())

app.use(cors())


app.use('/api/v1', router)
app.get('/', (req, res) => {
    res.send('Hello World!')
})
export default app