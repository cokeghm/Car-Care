const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  registrationCertificate: { type: String, default: null },
  circulationPermit: { type: String, default: null },
  technicalReview: { type: String, default: null },
  mandatoryInsurance: { type: String, default: null },
});

const Car = mongoose.model('Car', CarSchema);

module.exports = Car;