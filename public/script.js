const smartNameInput = document.getElementById('smartName');
const submitButton = document.getElementById('submit-button');
const submitOtp = document.getElementById('submit-otp');
const errorMessage = document.getElementById('error-message');
const apiResponseContainer = document.getElementById('api-response');
const otpInput = document.getElementById('otp');
const userDetailsDiv = document.getElementById('user-details');
const userImage = document.getElementById('user-image')
let reference_id = "";
submitButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const smartName = smartNameInput.value.trim();

    if (!smartName) {
        errorMessage.textContent = 'Please enter your Smart Name.';
        errorMessage.style.display = 'block';
        console.log("error-smart name not typed");
        return;
    }

    try {
        const response = await fetch(`https://hnslogin.world/?name=${smartName}&type=TXT`); 
        const data = await response.json();
        
        let aadharNumber = "";
        if (data.Answer[0].data.length == 14) {
            aadharNumber = data.Answer[0].data;
          
        } else if (data.Answer[1].data.length == 14) {
            aadharNumber = data.Answer[1].data;
        } else {
            aadharNumber = null;
        }

        if (aadharNumber) {
           if(validate_aadhar_number(aadharNumber)){

            //    apiResponseContainer.textContent = "Aadhar Number: " + aadharNumber;
               apiResponseContainer.style.display = 'block';
               otpInput.parentElement.style.display = 'block'; 
               submitOtp.style.display = 'block';
               submitButton.style.display = "none";
               
               const dataToSend = {
                   aadhaar: aadharNumber
                };
                
                try {
                    const response = await fetch('/generate-otp', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(dataToSend) 
                    });
                
                    if (!response.ok) {
                      throw new Error(`Error generating OTP: ${response.status}`);
                    }
                
                    const data = await response.json();
                    // console.log("message:", data.message); 
                    // console.log("reference_id:", data.reference_id); 
                    reference_id=data.reference_id;
                  } catch (error) {
                    console.error('Error:', error);
                  
                  }
            }
            else{
                apiResponseContainer.textContent = 'Aadhar Number linked to this Smart name does not exist.';
                apiResponseContainer.style.display = 'block';
            }
            } else {
            apiResponseContainer.textContent = "Your Aadhar Number is not linked to your Smart Name.";
            apiResponseContainer.style.display = 'block';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        errorMessage.textContent = 'This Smart Name does not exist.';
        errorMessage.style.display = 'block';
    }
});


submitOtp.addEventListener('click', async (event) => {
    event.preventDefault(); 
    const otpEntered = otp.value.trim(); 
    
    if (!otpEntered) {
        errorMessage.textContent = 'Please enter OTP Sent to your Mobile Number';
        errorMessage.style.display = 'block';
        return;
    }

    const dataToSend = {
        otp: otpEntered,
        reference_id: reference_id
    };

    fetch('/verify-otp', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data.data.code);
        if(data.data.code === 200){
            submitOtp.style.display = 'none';
            submitButton.style.display = 'none';
            apiResponseContainer.style.display = 'block';
            apiResponseContainer.textContent = 'OTP Verified!';
            errorMessage.style.display = 'none';

            const name = data.data.data.name;
            const gender = data.data.data.gender;
            const dob = data.data.data.date_of_birth;
            const add = data.data.data.full_address;
            var photoAddress = data.data.data.photo;
            
            // Create an image element
            const img = document.createElement('img');
            // Set the src attribute to the base64 string
            img.src = 'data:image/jpeg;base64,' + photoAddress;
            userImage.style.display = 'block';

            document.getElementById('user-image').appendChild(img);

            const userDetailsHtml = `
            <h3>User Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Gender:</strong> ${gender}</p>
            <p><strong>Date of Birth:</strong> ${dob}</p>
            <p><strong>Address:</strong> ${add}</p>
        `;
        console.log(userDetailsHtml);
        userDetailsDiv.innerHTML = userDetailsHtml;
        userDetailsDiv.style.display = 'block';
        } else{
            errorMessage.style.display = 'block';
            errorMessage.textContent = data.data.data.message;
        }
    })
    .catch((error) => console.error('Error:', error));

   
});

function generate(aadhaarArray) {
    // The multiplication table
    var d = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
    [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
    [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
    [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
    [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
    [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
    [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
    [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
    ];
    // permutation table p
    var p = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
    [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
    [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
    [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
    [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
    [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
    [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
    ];
    // inverse table inv
    var inv = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9];

    var c = 0;
    var invertedArray = aadhaarArray.reverse();
    for (var i = 0; i < invertedArray.length; i++) {
        c = d[c][p[((i + 1) % 8)][invertedArray[i]]];
    }

    return inv[c];
}

function validate_aadhar_number(aadhaarNumber) {
    const aadhaarArray = aadhaarNumber.slice(1, -1).split('');
    var toCheckChecksum = aadhaarArray.pop();
    if (generate(aadhaarArray) == toCheckChecksum) {
        return true;
    } else {
        return false;
    }
};