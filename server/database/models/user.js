const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');
mongoose.promise = Promise

// Define userSchema
// const userSchema = new Schema({

// 	firstName: {
//         type: String,
//         required: true,
//         // unique: true
//     },
//     lastName: {
//         type: String,
//         required: true,
//         // unique: true
//     },
// 	role: {
//         type: String,
//         // required: true,
//         validate: {
//             validator: function (str) {
//                 return str === 'Shoveler' || str === 'User'
//            },
//            message: 'User must be a shoveler or a poster.'
//         }
//     },

// 	username: { type: String, unique: false, required: false },
// 	password: { type: String, unique: false, required: false }

// })

const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new Schema({
 
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true,
        match: new RegExp(/(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)
    },
    phone: {
        type: Number,
        required: false
    },
    location: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        required: true,
        validate: {
            validator: function (str) {
                return str === 'Shoveler' || str === 'Poster'
           },
           message: 'User must be a shoveler or a poster.'
        }
    },
    jobs: {
        type: Array,
        required: false
    }
});

UserSchema.plugin(uniqueValidator);


// Define schema methods
UserSchema.methods = {
	checkPassword: function (inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define hooks for pre-saving
UserSchema.pre('save', function (next) {
	if (!this.password) {
		console.log('models/user.js =======NO PASSWORD PROVIDED=======')
		next()
	} else {
		console.log('models/user.js hashPassword in pre save');
		
		this.password = this.hashPassword(this.password)
		next()
	}
})

const User = mongoose.model('User', UserSchema)
module.exports = User