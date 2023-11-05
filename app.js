document.addEventListener('DOMContentLoaded', () => {
    const petList = document.querySelector('.Pet-list');
    const apiUrl = "http://localhost:3000/v1/pets";

    function getPetList() {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                petList.innerHTML = '';

                data.forEach((pet) => {
                    const { id, name, dob, client_email, img_url, date_of_birth } = pet;
                    createPet(id, name, dob, client_email, img_url, date_of_birth);
                });
            })
            .catch((error) => {
                console.error('Error fetching pets:', error);
            });
    }


    function createPet(id, name, dob, client_email, img_url, date_of_birth) {
        const petItem = document.createElement('div');
        petItem.className = 'Pet-List-Management';
        petItem.dataset.id = id;
        petItem.innerHTML = `
            <h2>${name}</h2>
            <p>${dob}</p>
            <p>${client_email}</p>
            <p>${date_of_birth}</p>
            <img src="${img_url}" alt="${name} style="width:200px";> <!-- Rodyti nuotrauką -->

            <div class="buttons">
                <button class="btn-ViewLog">VIEW LOG</button>
                <button class="btn-Delete">DELETE</button>
            </div>
        `;

        const deleteButton = petItem.querySelector('.btn-Delete');
        deleteButton.addEventListener('click', () => {

            const petId = petItem.dataset.id;

            if (petId) {
                deletePet(petId);
            } else {
                console.error('Pet ID is undefined');
            }
        });

        petList.appendChild(petItem);
    }

    function deletePet(id) {
        const confirmed = confirm(`Ar tikrai norite ištrinti augintinį su ID ${id}?`);
        if (!confirmed) return;

        fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.status === 204) {
                    const petItem = document.querySelector(`[data-id="${id}"]`);
                    if (petItem) {
                        petItem.remove();
                        console.log('Augintinis sėkmingai ištrintas.');
                    } else {
                        console.error('Klaida trinant augintinį: elementas nerastas.');
                    }
                } else {
                    console.error('Klaida trinant augintinį:', response.statusText);
                }
            })
            .catch((error) => {
                console.error('Klaida trinant augintinį:', error);
            });
    }
    getPetList();
});
