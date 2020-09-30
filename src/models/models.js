const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uuid: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  nama: { type: String },
  voted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  editedAt: { type: Date },
});
const kandidatSchema = new mongoose.Schema({
  uuid: { type: String },
  nama: { type: String },
  kelas: { type: String },
  visi: { type: String },
  misi: { type: String },
  foto: { type: String, default: 'default.png' },
  createdAt: { type: Date, default: Date.now },
  editedAt: { type: Date },
  voter: { type: Number },
});
const adminSchema = new mongoose.Schema({
  uuid: { type: String },
  nama: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('user', userSchema);
const Kandidat = mongoose.model('kandidat', kandidatSchema);
const Admin = mongoose.model('admin', adminSchema);

module.exports = model = { User, Kandidat, Admin };
