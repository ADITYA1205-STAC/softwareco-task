const { Schema, model, Types: { ObjectId } } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: ObjectId,
    ref: 'roles',
    required: true,
  },
  modules: [String],
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
  versionKey: false
});

UserSchema.pre('save', async function save(next) {
  try {
    if (!this.isModified('password')) return next();
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    return next();
  } catch (err) {
    return next(err);
  }
});

module.exports = model('users', UserSchema);