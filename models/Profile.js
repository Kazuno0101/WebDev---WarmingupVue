const { Schema, model } = require('mongoose');

const ProfileSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	hobby: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const Profile = model('Profile', ProfileSchema);

module.exports = Profile;
