import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    tech: { type: String, default: '' },
    github: { type: String, default: '' },
    demo: { type: String, default: '' }
  },
  { timestamps: true }
)

export default mongoose.model('Project', projectSchema)
