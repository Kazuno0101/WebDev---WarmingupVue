const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { PORT, mongoUri } = require('./config');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const profile = require('./routes/api/profile');

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());

mongoose.connect(mongoUri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => console.log('MongoDB connected...'))
	.catch((err) => console.log(err));

app.use('/api/profile', profile);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(__dirname + 'client/dist'));
	app.get(/.*/, (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
	});
}

app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`));
