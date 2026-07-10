import mongoose from 'mongoose'
import dns from 'dns'

dns.setServers(['8.8.8.8', '8.8.4.4'])

export async function connectDB() {
  const uri = process.env.MONGO_URI
  if (!uri) {
    console.error('MONGO_URI is missing. Copy .env.example to .env and set it.')
    process.exit(1)
  }

  try {
    await mongoose.connect(uri)
    console.log('MongoDB connected')
  } catch (err) {
    console.error('MongoDB connection failed:', err.message)
    process.exit(1)
  }
}
