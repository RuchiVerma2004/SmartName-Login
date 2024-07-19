const smartNameInput = document.getElementById('smartName');
    const submitButton = document.getElementById('submit-button');
    const errorMessage = document.getElementById('error-message');
    const apiResponseContainer = document.getElementById('api-response');

    submitButton.addEventListener('click', async (event) => {
      event.preventDefault(); // Prevent default form submission

      const smartName = smartNameInput.value.trim();

      if (!smartName) {
        errorMessage.textContent = 'Please enter your Smart Name.';
        errorMessage.style.display = 'block';
        return;
      }

      try {
        const response = await fetch(`https://hnslogin.world/?name=${smartName}&type=TXT`); // Use template literal for safe string concatenation
        const data = await response.json();
        console.log(data);
       
        console.log(data.Answer[0].data);
        console.log(data.Answer[1].data);
        console.log(data.Answer[0].data.length);
        console.log(data.Answer[1].data.length);

        let aadharNumber = "";
        if(data.Answer[0].data.length < 20){
            aadharNumber = data.Answer[0].data;
        }else {
            aadharNumber= data.Answer[1].data;
        }

        apiResponseContainer.textContent = "Aadhar Number: " + aadharNumber ; // Display data in preformatted element
        apiResponseContainer.style.display = 'block';
        
      } catch (error) {
        console.error('Error fetching data:', error);
        errorMessage.textContent = 'An error occurred. Please try again later.';
        errorMessage.style.display = 'block';
      }
    });