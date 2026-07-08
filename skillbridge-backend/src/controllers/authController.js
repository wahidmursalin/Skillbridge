import jwt from 'jsonwebtoken'
import User from '../models/User.js'

function signToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  })
}

function toPublicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    university: user.university,
    department: user.department
  }
}

export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required.' })
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' })
    }

    const existing = await User.findOne({ email: email.toLowerCase() })
    if (existing) {
      return res.status(409).json({ message: 'That email is already registered.' })
    }

    const user = await User.create({ name, email, password })
    const token = signToken(user._id)
    res.status(201).json({ token, user: toPublicUser(user) })
  } catch (err) {
    next(err)
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' })
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password')
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password.' })
    }

    const token = signToken(user._id)
    res.json({ token, user: toPublicUser(user) })
  } catch (err) {
    next(err)
  }
}

export async function me(req, res) {
  res.json({ user: toPublicUser(req.user) })
}

export async function updateMe(req, res, next) {
  try {
    const { name, university, department } = req.body
    if (name !== undefined) req.user.name = name
    if (university !== undefined) req.user.university = university
    if (department !== undefined) req.user.department = department
    await req.user.save()
    res.json({ user: toPublicUser(req.user) })
  } catch (err) {
    next(err)
  }
}
