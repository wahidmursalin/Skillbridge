// Skills, Certificates, Projects, and Jobs all follow the same shape:
// list/create/update/delete, always scoped to the logged-in user. Rather
// than repeat the same five handlers four times, this factory builds a
// controller for any Mongoose model that has a `user` field.

export function makeCrudController(Model) {
  return {
    async list(req, res, next) {
      try {
        const items = await Model.find({ user: req.user._id }).sort({ createdAt: -1 })
        res.json(items)
      } catch (err) {
        next(err)
      }
    },

    async create(req, res, next) {
      try {
        const item = await Model.create({ ...req.body, user: req.user._id })
        res.status(201).json(item)
      } catch (err) {
        next(err)
      }
    },

    async update(req, res, next) {
      try {
        const item = await Model.findOneAndUpdate(
          { _id: req.params.id, user: req.user._id },
          req.body,
          { new: true, runValidators: true }
        )
        if (!item) return res.status(404).json({ message: 'Not found' })
        res.json(item)
      } catch (err) {
        next(err)
      }
    },

    async remove(req, res, next) {
      try {
        const item = await Model.findOneAndDelete({ _id: req.params.id, user: req.user._id })
        if (!item) return res.status(404).json({ message: 'Not found' })
        res.json({ message: 'Deleted', id: req.params.id })
      } catch (err) {
        next(err)
      }
    }
  }
}
