import express from 'express';
import cors from 'cors'

import itemRoute from './routes/itemRoute.routes.js';


const app = express();

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Working...")
})

app.use("/api/inventory",itemRoute)


export default app
