const mongoose = require('mongoose');

const PortfolioDataSchema = new mongoose.Schema({
  personal: { type: Object, default: {} },
  socials: { type: Object, default: {} },
  about: { type: Object, default: {} },
  experience: { type: Array, default: [] },
  projects: { type: Array, default: [] },
  skills: { type: Object, default: {} },
  codingProfiles: { type: Array, default: [] },
  freelanceServices: { type: Array, default: [] },
  creativeStudio: { type: Object, default: {} },
  education: { type: Array, default: [] },
  certifications: { type: Array, default: [] },
  sectionVisibility: { type: Object, default: {} },
  adminConfig: { type: Object, default: {} }
}, {
  timestamps: true
});

module.exports = mongoose.model('PortfolioData', PortfolioDataSchema);
