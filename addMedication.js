document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = "http://localhost:3000/v1/meds"; // Replace with your API endpoint
    const medicationForm = document.querySelector('.preke-form');
    const successMessage = document.querySelector('.success-message');

    medicationForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const petId = medicationForm.querySelector('#petId').value; // Capture pet's ID
        const name = medicationForm.querySelector('#name').value;
        const description = medicationForm.querySelector('#description').value;
        const instructions = medicationForm.querySelector('#medication-instructions').value;
        const status = document.querySelector('#status').value;

        if (!petId || !name || !description || !instructions || !status) {
            alert('All fields are required');
            return;
        }

        const newMedication = {
            pet_id: petId, // Include pet's ID
            name: name,
            description: description,
            instructions: instructions,
            status: status,
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMedication),
            });

            if (response.status === 201) {
                successMessage.textContent = 'Medication added successfully';
                medicationForm.reset();
                setTimeout(() => {
                    window.location.href = 'log.html'; // Redirect to the "Logs" page
                }, 1000);
            } else {
                const data = await response.json();
                console.error('Error adding medication:', data.error);
            }
        } catch (error) {
            console.error('Error adding medication:', error);
        }
    });
});
