import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import { connectDB } from './src/config/db.js'
import authRoutes from './src/routes/authRoutes.js'
import { makeCrudRouter } from './src/routes/crudRouter.js'
import { notFound, errorHandler } from './src/middleware/errorHandler.js'

import Skill from './src/models/Skill.js'
import Certificate from './src/models/Certificate.js'
import Project from './src/models/Project.js'
import Job from './src/models/Job.js'

const app = express()

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json())
app.use(morgan('dev'))

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

app.use('/api', authRoutes)
app.use('/api/skills', makeCrudRouter(Skill))
app.use('/api/certificates', makeCrudRouter(Certificate))
app.use('/api/projects', makeCrudRouter(Project))
app.use('/api/jobs', makeCrudRouter(Job))

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

connectDB().then(() => {
  app.listen(PORT, () => console.log(`SkillBridge API running on http://localhost:${PORT}`))
})
