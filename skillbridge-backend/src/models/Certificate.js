import mongoose from 'mongoose'

const certificateSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true, trim: true },
    org: { type: String, required: true, trim: true },
    issueDate: { type: String, default: '' },
    link: { type: String, default: '' }
  },
  { timestamps: true }
)

export default mongoose.model('Certificate', certificateSchema)
