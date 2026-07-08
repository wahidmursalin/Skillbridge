import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    company: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    status: { type: String, enum: ['Applied', 'Interview', 'Selected', 'Rejected'], default: 'Applied' },
    appliedDate: { type: String, default: '' },
    interviewDate: { type: String, default: '' },
    notes: { type: String, default: '' }
  },
  { timestamps: true }
)

export default mongoose.model('Job', jobSchema)
