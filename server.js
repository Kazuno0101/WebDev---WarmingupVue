const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { PORT, mongoUri } = require('./config');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const bucketListItems = require('./routes/api/bucketListItems');

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());

mongoose.connect(mongoUri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => console.log('MongoDB connected...'))
	.catch((err) => console.log(err));

app.use('/api/bucketListItems', bucketListItems);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(__dirname + '/public/'));
	app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`));
