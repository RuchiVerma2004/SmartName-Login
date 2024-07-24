const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const hostname = '0.0.0.0';
const port = 8080;

const app = express();

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


const apiKey = 'key_live_kELcERNjhxcZqmwFDMz19KQ7a1C9KOT4';
const accessToken = 'eyJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJBUEkiLCJyZWZyZXNoX3Rva2VuIjoiZXlKaGJHY2lPaUpJVXpVeE1pSjkuZXlKaGRXUWlPaUpCVUVraUxDSnpkV0lpT2lKd2RYTm9jR1Z1WkdWeU1qY3lNekl3UUdkdFlXbHNMbU52YlNJc0ltRndhVjlyWlhraU9pSnJaWGxmYkdsMlpWOXJSVXhqUlZKT2FtaDRZMXB4YlhkR1JFMTZNVGxMVVRkaE1VTTVTMDlVTkNJc0ltbHpjeUk2SW1Gd2FTNXpZVzVrWW05NExtTnZMbWx1SWl3aVpYaHdJam94TnpVeE9UVTJPRFF6TENKcGJuUmxiblFpT2lKU1JVWlNSVk5JWDFSUFMwVk9JaXdpYVdGMElqb3hOekl3TkRJd09EUXpmUS5IUzNTbng3NkduUlV0X0diVkFXUjhGWGkwSFlZSlZMRVhtcDZGSWtfNUl3RE1PM1ZLcWpHV296enB5bUMtN3hDZFRWVm93QUppS2lMaTJrZXY4SGNrZyIsInN1YiI6InB1c2hwZW5kZXIyNzIzMjBAZ21haWwuY29tIiwiYXBpX2tleSI6ImtleV9saXZlX2tFTGNFUk5qaHhjWnFtd0ZETXoxOUtRN2ExQzlLT1Q0IiwiaXNzIjoiYXBpLnNhbmRib3guY28uaW4iLCJleHAiOjE3MjA1MDcyNDMsImludGVudCI6IkFDQ0VTU19UT0tFTiIsImlhdCI6MTcyMDQyMDg0M30.EDcsjr4_vMklrNLNSNZBw1fu2dQwBGeiNyw5Huk3DK7aIrGJdzm9uOvn3r7SsAaRhPOInXqXXBq_XGhyCxAGdw';
console.log("server");

app.post('/generate-otp', async (req, res) => {
  const { aadhaar } = req.body;
  console.log("Received Aadhaar number:", aadhaar);

  // try {
  //     const response = await axios.post('https://api.sandbox.co.in/kyc/aadhaar/okyc/otp', {
  //         '@entity': 'in.co.sandbox.kyc.aadhaar.okyc.otp.request',
  //         aadhaar_number: aadhaar,
  //         consent: 'y',
  //         reason: 'For KYC'
  //     }, {
  //         headers: {
  //             'accept': 'application/json',
  //             'Authorization': accessToken,
  //             'x-api-key': apiKey,
  //             'x-api-version': '2.0',
  //             'content-Type': 'application/json'
  //         }
  //     });

  //     res.status(200).json({ message: response.data, reference_id: response.data.data.reference_id });
  // } catch (error) {
  //     res.status(500).json({ message: 'Failed to send OTP', error: error.response ? error.response.data : error.message });
  // }
});

// OTP Verification Endpoint
app.post('/verify-otp', async (req, res) => {
    // const { otp, reference_id } = req.body;
    const { otp } = req.body;


    // console.log(`Verifying OTP for reference_id: ${reference_id} and otp: ${otp}`);
    console.log(`Verified OTP : ${otp}`);


    // try {
    //     const response = await axios.post('https://api.sandbox.co.in/kyc/aadhaar/okyc/otp/verify', {
    //         '@entity': 'in.co.sandbox.kyc.aadhaar.okyc.request',
    //         reference_id: reference_id,
    //         otp: otp
    //     }, {
    //         headers: {
    //             'accept': 'application/json',
    //             'Authorization': accessToken,
    //             'x-api-key': apiKey,
    //             'x-api-version': '2.0',
    //             'content-Type': 'application/json'
    //         }
    //     });

    //     console.log(response.data);

    //     if (response.data.status === 'Success') {
    //         res.status(200).json({ message: 'OTP verified successfully', data: response.data });
    //     } else {
    //         res.status(400).json({ message: 'OTP verification failed', data: response.data });
    //     }
    // } catch (error) {
    //     res.status(500).json({ message: 'Failed to verify OTP', error: error.response ? error.response.data : error.message });
    // }
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

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
