const mongoose = require('mongoose');
const { Schema } = mongoose;

const JobSchema = new Schema({
    location: {
        type: String,
        required: true
    },
    poster: {
        type: Schema.Types.ObjectId,
        required: true
    },
    shoveler: {
        type: Schema.Types.ObjectId,
        required: false
    },
    pay: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true,
        validate: {
            validator: function (str) {
                return str === 'car' || str === 'driveway'
           },
           message: 'Post type must be car or driveway.'
        }
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    complete: {
        type: Boolean,
        default: false
    }
});

const Job = mongoose.model('job', JobSchema);

module.exports = Job;