document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('prediction-form');
    const predictButton = document.querySelector('.btn'); // Utilisez .btn pour sélectionner le bouton
    const predictionResult = document.getElementById('prediction-result');

    predictButton.addEventListener('click', () => { 
        
        const step = parseInt(document.getElementById('step').value);
        const amount = parseFloat(document.getElementById('amount').value);
        const oldbalanceOrg = parseFloat(document.getElementById('oldbalanceOrg').value);
        const newbalanceOrig = parseFloat(document.getElementById('newbalanceOrig').value);
        const oldbalanceDest = parseFloat(document.getElementById('oldbalanceDes').value); 
        const newbalanceDest = parseFloat(document.getElementById('newbalanceDest').value);
        const difOrig = parseFloat(document.getElementById('dif_orig').value);
        const difDes = parseFloat(document.getElementById('dif_des').value);

        const payload = JSON.stringify({ step: step, amount: amount,oldbalanceOrg: oldbalanceOrg,newbalanceOrig:newbalanceOrig,
            oldbalanceDes:oldbalanceDest,newbalanceDest:newbalanceDest,dif_orig:difOrig,dif_des:difDes});

        // Calculate the length of the payload
        const contentLength = payload.length;

        fetch('http://localhost:8000/predict/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': contentLength.toString(),
            body: payload, // Use the payload
        }})
        .then(response => response.json())
        .then(data => {
            predictionResult.innerText = `Predicted fraude: $${data.prediction}`;
        })
        .catch(error => {
            console.error('Error:', error);
            predictionResult.innerText = 'Prediction failed.';
        });
    });
});    