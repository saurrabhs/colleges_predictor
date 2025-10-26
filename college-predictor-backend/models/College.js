const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    city: {
      type: String,
      required: true
    },
    district: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    }
  },
  type: {
    type: String,
    required: true,
    enum: ['Government', 'Private', 'Government Aided', 'Non-Autonomous']
  },
  autonomyStatus: {
    type: String,
    required: true,
    enum: ['Autonomous', 'Non-Autonomous']
  },
  branches: [{
    branchName: {
      type: String,
      required: true
    },
    cutoffs: {
      OPEN: {
        type: mongoose.Schema.Types.Mixed
      },
      SC: {
        type: mongoose.Schema.Types.Mixed
      },
      ST: {
        type: mongoose.Schema.Types.Mixed
      },
      VJ: {
        type: mongoose.Schema.Types.Mixed
      },
      NT1: {
        type: mongoose.Schema.Types.Mixed
      },
      NT2: {
        type: mongoose.Schema.Types.Mixed
      },
      NT3: {
        type: mongoose.Schema.Types.Mixed
      },
      OBC: {
        type: mongoose.Schema.Types.Mixed
      },
      EWS: {
        type: mongoose.Schema.Types.Mixed
      },
      TFWS: {
        type: mongoose.Schema.Types.Mixed
      }
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('College', collegeSchema);