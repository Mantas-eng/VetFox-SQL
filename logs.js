const logList = document.querySelector('.Log-list');
const apiUrl = "http://localhost:3000/v1"; // Replace with your API endpoint
let currentFilter = 'logs'; // Initialize the filter to 'logs' by default

document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners to the "Logs" and "Prescriptions" buttons
    const logsButton = document.querySelector('.logs#logs');
    const prescriptionsButton = document.querySelector('.logs#prescriptions');

    logsButton.addEventListener('click', () => {
        applyFilter('logs');
    });

    prescriptionsButton.addEventListener('click', () => {
        applyFilter('prescriptions');
    });

    // Event listener for the form should be inside the DOMContentLoaded event
    document.querySelector('.add-log-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const petId = document.querySelector('#petId').value;
        const description = document.querySelector('#description').value;
        const status = document.querySelector('#status').value;
        await addLog(petId, description, status);
    });

    // Fetch and display all logs by default
    applyFilter(currentFilter);
});

async function applyFilter(filter) {
    currentFilter = filter;

    if (filter === 'prescriptions') {
        await getPrescriptions();
    } else if (filter === 'logs') {
        await getLogs();
    }
}

function createLog(name, description, status) {

    const logItem = document.createElement('div');
    logItem.className = 'Log-List-Management';
    logItem.innerHTML = `
        <h2>${name}</h2>
        <p>${description}</p>
        <p>${status}</p>
        <div class="buttons">
            <button class="btn-ViewLog">VIEW LOG</button>
            <button class="btn-DeleteLog">DELETE LOG</button>
        </div>
    `;

    logList.appendChild(logItem);
}
function deleteLog(id) {
    // Ištrinti logą naudojant id ir atnaujinti sąrašą
    // ...

    // Pvz., šaliname logą iš sąrašo
    const logItem = document.querySelector(`[data-log-id="${id}"]`);
    if (logItem) {
        logItem.remove();
    }
}
async function addLog(petId, description, status) {
    try {

        const response = await fetch(apiUrl + '/logs/:petId', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                description: description,
                status: status,
            }),
        });

        if (!response.ok) {

            throw new Error('Failed to add a new log entry');

        }

        const newLog = await response.json();
        createLog(newLog.name, newLog.description, newLog.status);
    } catch (error) {
        console.error('Error adding a new log:', error);
    }
}

async function getPrescriptions() {
    try {
        const response = await fetch(apiUrl + '/meds');
        if (!response.ok) {
            throw new Error('Failed to fetch prescription data');
        }
        const prescriptionData = await response.json();
        prescriptionData.forEach(prescription => {
            createLog(prescription.name, prescription.description, prescription.status);
        });
    } catch (error) {
        console.error('Error fetching prescription data:', error);
    }
}

async function getLogs() {
    try {
        const response = await fetch(apiUrl + '/meds');
        if (!response.ok) {
            throw new Error('Failed to fetch log data');
        }
        const logData = await response.json();
        logData.forEach(log => {
            createLog(log.name, log.description, log.status);
        });
    } catch (error) {
        console.error('Error fetching log data:', error);
    }
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-ViewLog')) {
        const logItem = e.target.closest('.Log-List-Management');
        const logId = logItem.getAttribute('data-log-id'); // Gauti logId
        // Nukreipkite į redagavimo puslapį su logId
        window.location.href = `log.html?id=${logId}`;
        // Čia turėtumėte atvaizduoti išrašą pagal logId
    } else if (e.target.classList.contains('btn-DeleteLog')) {
        const logItem = e.target.closest('.Log-List-Management');
        logItem.remove();
        // Čia turėtumėte ištrinti išrašą, naudodami logId
    }

}
);


