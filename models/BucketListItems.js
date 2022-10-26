const { Schema, model } = require('mongoose');

const BUcketListItemSchema = new Schema({
	description: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const BucketListItem = model('BucketListItem', BUcketListItemSchema);

module.exports = BucketListItem;
