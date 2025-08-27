import mongoose from 'mongoose'   // MongoDB driver.

// Schema for monthly sales.
const MonthlySaleSchema = new mongoose.Schema({
    month: Number,   // Month number
    value: Number,   // and monthly sales value.
})

// Export Mongoose model.
export default mongoose.model('MonthlySale', MonthlySaleSchema)