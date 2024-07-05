document.getElementById('aadhaar-login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const otp = document.getElementById('otp-input-group');
    const aadharNumber = document.getElementById('aadhaarNumber');
    // const mobileNumber = document.getElementById('mobileNumber');

    if (aadhaarNumber.value.length != 12) {
        alert('Aadhaar numbers should be 12 digit in length');
    }
    else if (aadharNumber.value.match(/[^$,.\d]/)) {
        alert('Aadhaar numbers must contain only numbers');
    }

    else if(validate_aadhar_number(aadharNumber.value)) {
        if (otp.style.display == 'none') {
            otp.style.display = 'block';
            otp.required = true;
        } 
        
        else {
            window.location.href = 'smart-name.html';
        }
    }
    else {
        alert("Invalid Aadhaar number");
    }

    // if (mobileNumber.value.length != 10) {
    //     alert("Mobile Number should be 10 digits.");
    // }
    // if (mobileNumber.value.match(/[^$,.\d]/)) {
    //     alert("Mobile number must contain numbers only");
    // }
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
    var aadhaarArray = aadhaarNumber.split('');
    var toCheckChecksum = aadhaarArray.pop();
    if (generate(aadhaarArray) == toCheckChecksum) {
        return true;
    } else {
        return false;
    }
};
