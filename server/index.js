const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: '*'
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
const PORT = process.env.PORT || 3001;
const route = require('./app/routes/route')(app, express);

//app.use('/api', route);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});