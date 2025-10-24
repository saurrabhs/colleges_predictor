const mongoose = require('mongoose');

const collegeListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  colleges: [{
    college: {
      type: String, // Changed from ObjectId to String to match the College collection
      ref: 'College',
      required: true
    },
    branch: {
      type: String,
      required: true
    },
    rank: {
      type: Number,
      required: true
    },
    cutoffPercentile: {
      type: Number
    },
    category: {
      type: String
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Ensure each user has only one college list
collegeListSchema.index({ user: 1 }, { unique: true });

// Ensure no duplicate college-branch combinations in a user's list
collegeListSchema.index({ user: 1, 'colleges.college': 1, 'colleges.branch': 1 }, { unique: true });

module.exports = mongoose.model('CollegeList', collegeListSchema);