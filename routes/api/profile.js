const { Router } = require('express');
const Profile = require('../../models/Profile');

const router = Router();

router.get('/', async (req, res) => {
	try {
		const profile = await Profile.find();
		if (!profile) throw new Error('No items');
		const sorted = profile.sort((a, b) => {
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		});
		res.status(200).json(sorted);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.post('/', async (req, res) => {
	const newProfile = new Profile(req.body);
	try {
		const profile = await newProfile.save();
		if (!profile) throw new Error('Something went wrong saving the item');
		res.status(200).json(profile);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.put('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const response = await Profile.findByIdAndUpdate(id, req.body);
		if (!response) throw new Error('Something went wrong');
		const updated = { ...response._doc, ...req.body };
		res.status(200).json(updated);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.delete('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const removed = await Profile.findByIdAndDelete(id);
		if (!removed) throw new Error('Something went wrong');
		res.status(200).json(removed);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
