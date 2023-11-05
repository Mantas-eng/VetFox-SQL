document.addEventListener('DOMContentLoaded', () => {
    const petForm = document.querySelector('.preke-form');
    const successMessage = document.querySelector('.success-message');

    petForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = petForm.querySelector('#title').value;
        const age = petForm.querySelector('#age').value;
        const img_url = petForm.querySelector('#img_url').value;
        const price = parseFloat(petForm.querySelector('#price').value);
        const species = petForm.querySelector('#species').value;
        const dob = petForm.querySelector('#dob').value;
        const client_email = petForm.querySelector('#client_email').value; // Make sure you capture client_email

        if (!name || !dob || !age || !img_url || !price || !species || !client_email) {
            alert('All fields are required');
            return;
        }

        const newPet = {
            name,
            age,
            img_url,
            price,
            species,
            dob,
            client_email, // Add this property
        };

        try {
            const response = await fetch('http://localhost:3000/v1/pets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPet),
            });

            if (response.status === 201) {
                successMessage.textContent = 'Pet added successfully!';
                petForm.reset();
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                const data = await response.json();
                console.error('Error adding the pet:', data.error);
            }
        } catch (error) {
            console.error('Error adding the pet:', error);
        }
    });
});
