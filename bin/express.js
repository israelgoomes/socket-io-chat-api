const express = require('express');
const bodyParser = require('body-parser');
const variables = require('../bin/configurations/variables');
const cors = require('cors');
const app = express();


const allowedOrigins = [
    
  'ionic://localhost',
  'http://localhost',
  'http://localhost:8080',
  'http://localhost:8100',
  'http://localhost:4200'

  ];

  const corsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Origin not allowed by CORS'));
      }
    }
  }

  app.options('*', cors(corsOptions));
//  app.get('/', cors(corsOptions), (req, res, next) => {
//     res.json({ message: 'This route is CORS-enabled for an allowed origin.' });
//     res.setHeader("Access-Control-Allow-Origin", "*");
//   })
  
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//conexao
 app.use(cors());


module.exports = app;

