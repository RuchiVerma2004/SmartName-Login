const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const session = require('express-session');

const hostname = '0.0.0.0';
const port = 8080;

const app = express();

app.use(session({
    secret: 'this is my key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Note: secure should be true in production if using HTTPS
}));

// Parse application/json
app.use(bodyParser.json());
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, 'public/index.html');
    fs.readFile(indexPath, (err, data) => {
        if (err) {
            res.status(500).send('500 - Internal Server Error');
        } else {
            res.setHeader('Content-Type', 'text/html');
            res.send(data);
        }
    });
});

app.get('/index.html', (req, res) => {
    const indexPath = path.join(__dirname, 'public/index.html');
    fs.readFile(indexPath, (err, data) => {
        if (err) {
            res.status(500).send('500 - Internal Server Error');
        } else {
            res.setHeader('Content-Type', 'text/html');
            res.send(data);
        }
    });
});


app.get('/style.css', (req, res) => {
    const cssPath = path.join(__dirname, 'public/style.css');
    fs.readFile(cssPath, (err, data) => {
        if (err) {
            res.status(500).send('500 - Internal Server Error');
        } else {
            res.setHeader('Content-Type', 'text/css');
            res.send(data);
        }
    });
});

app.get('/script.js', (req, res) => {
    const scriptPath = path.join(__dirname, 'public/script.js');
    fs.readFile(scriptPath, (err, data) => {
        if (err) {
            res.status(500).send('500 - Internal Server Error');
        } else {
            res.setHeader('Content-Type', 'application/javascript');
            res.send(data);
        }
    });
});


const apiKey = 'key_live_MTH2GDBR4ix66rudnakP2xhVIgJuPf8M';
const accessToken = 'eyJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJBUEkiLCJyZWZyZXNoX3Rva2VuIjoiZXlKaGJHY2lPaUpJVXpVeE1pSjkuZXlKaGRXUWlPaUpCVUVraUxDSnpkV0lpT2lKdWFYTm9ZVzUwYTJoaGRISnBNRGsxUUdkdFlXbHNMbU52YlNJc0ltRndhVjlyWlhraU9pSnJaWGxmYkdsMlpWOU5WRWd5UjBSQ1VqUnBlRFkyY25Wa2JtRnJVREo0YUZaSlowcDFVR1k0VFNJc0ltbHpjeUk2SW1Gd2FTNXpZVzVrWW05NExtTnZMbWx1SWl3aVpYaHdJam94TnpVME1URTFNelV6TENKcGJuUmxiblFpT2lKU1JVWlNSVk5JWDFSUFMwVk9JaXdpYVdGMElqb3hOekl5TlRjNU16VXpmUS5KUWZ2R214Z2NqSkpPVmxTT0pQQmxjMUQtajloQ2R4YWhtQlhjS3pIQmQ1Q2oxTmJ2dmlPbS0zRVdmVmt2Ykl1UFJhZ3k4S2s2OVNEb0NLQlJBdTlXZyIsInN1YiI6Im5pc2hhbnRraGF0cmkwOTVAZ21haWwuY29tIiwiYXBpX2tleSI6ImtleV9saXZlX01USDJHREJSNGl4NjZydWRuYWtQMnhoVklnSnVQZjhNIiwiaXNzIjoiYXBpLnNhbmRib3guY28uaW4iLCJleHAiOjE3MjI2NjU3NTMsImludGVudCI6IkFDQ0VTU19UT0tFTiIsImlhdCI6MTcyMjU3OTM1M30.GjGB4HB6IMYhM1QzKzEOuPSrMYf7fS6bgG3aNsm5tG7s-CP3d6Jbe1GbnPTa-j2mizyisYZA_X9N024cSP2AZw';
console.log("server");

app.post('/generate-otp', async (req, res) => {
  let { aadhaar } = req.body;
 aadhaar = aadhaar.slice(1, -1);
 console.log(aadhaar);
  console.log("Received Aadhaar number:", aadhaar);

  try {
      const response = await axios.post('https://api.sandbox.co.in/kyc/aadhaar/okyc/otp', {
          '@entity': 'in.co.sandbox.kyc.aadhaar.okyc.otp.request',
          aadhaar_number: aadhaar,
          consent: 'y',
          reason: 'For KYC'
      }, {
          headers: {
              'accept': 'application/json',
              'Authorization': accessToken,
              'x-api-key': apiKey,
              'x-api-version': '2.0',
              'content-Type': 'application/json'
          }
      });

      const referenceId = response.data.data.reference_id;
        req.session.reference_id = referenceId;

        console.log(referenceId);
      console.log({ message: response.data, reference_id: response.data.data.reference_id });
      res.status(200).json({ message: response.data, reference_id: response.data.data.reference_id });
  } catch (error) {
    console.log({ message: 'Failed to send OTP', error: error.response ? error.response.data : error.message });
      res.status(500).json({ message: 'Failed to send OTP', error: error.response ? error.response.data : error.message });
  }
});

// OTP Verification Endpoint
app.post('/verify-otp', async (req, res) => {
    const { otp } = req.body;
    const referenceId = req.session.reference_id;
    // console.log("verifyfunction: " + referenceId);
    // console.log(typeof referenceId);
    // const { otp } = req.body;


    // console.log(`Verifying OTP for reference_id: ${reference_id} and otp: ${otp}`);
    console.log(`Verified OTP : ${otp}`);


    try {
        const response = await axios.post('https://api.sandbox.co.in/kyc/aadhaar/okyc/otp/verify', {
            '@entity': 'in.co.sandbox.kyc.aadhaar.okyc.request',
            otp: otp.toString(),
            reference_id: referenceId.toString()
        }, {
            headers: {
                'accept': 'application/json',
                'Authorization': accessToken,
                'x-api-key': apiKey,
                'x-api-version': '2.0',
                'content-Type': 'application/json'
            }
        });

        console.log(response.data);

        if (response.data.status === 'Success') {
            // console.log({ message: 'OTP verified successfully', data: response.data });
            res.status(200).json({ message: 'OTP verified successfully', data: response.data });
        } else {
            res.status(400).json({ message: 'OTP veried', data: response.data });
            console.log({ message: 'OTP verification failed', data: response.data });
        }
    } catch (error) {
        console.log({ message: 'Failed to verify OTP', error: error.response ? error.response.data : error.message });
        res.status(500).json({ message: 'Failed to verify OTP', error: error.response ? error.response.data : error.message });
    }
});


// Add the /send-aadhar endpoint
app.post('/send-aadhar', (req, res) => {
    const { aadhaar } = req.body;

    // Process the Aadhaar number as needed
    console.log('Received Aadhaar number:', aadhaar);

    // Send a response back to the frontend
    res.status(200).json({ message: 'Aadhaar number received successfully' });
});

// Create HTTP server with Express app
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
