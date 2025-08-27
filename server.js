import express from 'express'   // Express framework.
import dotenv from 'dotenv'   // Load environment variables.
import mongoose from 'mongoose'   // MongoDB driver. 
import cors from 'cors'   // Enable Cross-Origin Resource Sharing.
import MonthlySale from './MonthlySale.js'   // Mongoose model.

// Load .env file.
dotenv.config()

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())   // Middleware to parse JSON bodies.

// MongoDB connection.
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Successfully connected to MongoDB.')
    } catch (error) {
        console.log('Error connecting to the database: ', error)
    }
}

connectDB()

// CREATE monthly sales:
app.post('/sales', async (req, res) => {
    try {
        const newMonthlySale = await MonthlySale.create(req.body)
        res.json(newMonthlySale)
    } catch (error) {
        res.json({error: error})
    }
})

// READ all monthly sales:
app.get('/sales', async (req, res) => {
    try {
        const MonthlySales = await MonthlySale.find()
        res.json(MonthlySales)
    } catch (error) {
        res.json({error: error})
    }
})

// UPDATE monthly sales by ID:
app.put('/sales/:id', async (req, res) => {
    try {
        const newMonthlySales = await MonthlySale.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(newMonthlySales)
    } catch (error) {
        res.json({error: error})
    }
})

// DELETE monthly sales by ID:
app.delete('/sales/:id', async (req, res) => {
    try {
        const monthlySalesDeleted = await MonthlySale.findByIdAndDelete(req.params.id)
        res.json(monthlySalesDeleted)
    } catch (error) {
        res.json({error: error})
    }
})

// Start server.
app.listen(PORT, () => console.log('We are online using PORT: ' + PORT))