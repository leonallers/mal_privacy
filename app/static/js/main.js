document.addEventListener('DOMContentLoaded', function () {
    // Elemente holen
    const uploadButton = document.getElementById('upload-button');
    const customBtn = document.getElementById('custom-upload-btn');
    const fileNameSpan = document.getElementById('selected-file-name');
    const resultsContainer = document.getElementById('results-container');
    const statusText = document.getElementById('status-text');

    // Event Listeners
    customBtn.addEventListener('click', () => uploadButton.click());

    uploadButton.addEventListener('change', function () {
        if (!uploadButton.files[0]) return;

        fileNameSpan.textContent = uploadButton.files[0].name;
        resultsContainer.classList.remove('visible');
        resultsContainer.classList.add('hidden');

        animateProcess().then(() => {
            statusText.textContent = 'Ergebnisse werden geladen...';

            fetch('/static/data/result.json')
                .then(response => response.json())
                .then(data => {
                    // KORRIGIERT: Status-Text nach Erfolg aktualisieren
                    statusText.textContent = 'Ergebnisse erfolgreich geladen.';

                    // Ihre funktionierende Logik zum Befüllen der Karten
                    const oldCard = document.querySelector('.result-card');
                    if (oldCard) {
                        const oldLabels = oldCard.querySelectorAll('.label');
                        const oldValue = oldCard.querySelector('.value');
                        if (oldLabels.length > 0) oldLabels[0].textContent = data.old_model.name;
                        if (oldValue) oldValue.textContent = data.old_model.total_alerts;
                        if (oldLabels.length > 1) oldLabels[oldLabels.length - 1].textContent = `False Positive Rate: ${data.old_model.false_positive_rate}%`;
                    }
                    const newCard = document.querySelector('.result-card.success');
                    if (newCard) {
                        const newLabels = newCard.querySelectorAll('.label');
                        const newValue = newCard.querySelector('.value');
                        if (newLabels.length > 0) newLabels[0].textContent = data.new_model.name;
                        if (newValue) newValue.textContent = data.new_model.total_alerts;
                        if (newLabels.length > 1) newLabels[newLabels.length - 1].textContent = `False Positive Rate: ${data.new_model.false_positive_rate}%`;
                    }
                    const summary = document.getElementById('reduction-summary');
                    if (summary) summary.innerHTML = `Reduktion der manuellen Prüfungen um <strong>${data.new_model.reduction_percent}%</strong>`;

                    resultsContainer.classList.remove('hidden');
                    resultsContainer.classList.add('visible');
                })
                .catch(error => {
                    // KORRIGIERT: Status-Text bei Fehler aktualisieren
                    console.error('Fehler:', error);
                    statusText.textContent = `Fehler beim Laden der Ergebnisse: ${error.message}`;
                });
        });
    });

    const sleep = ms => new Promise(res => setTimeout(res, ms));

    async function animateProcess() {
        const bankNode = document.getElementById('node-bank');
        const agentNode = document.getElementById('node-agent');
        const aggregatorNode = document.getElementById('node-aggregator');
        const dataPacket = document.getElementById('packet-1');

        // Reset
        [bankNode, agentNode, aggregatorNode].forEach(node => node.classList.remove('active', 'success'));
        dataPacket.classList.remove('moving');

        // KORRIGIERT: Animation mit korrektem Timing
        statusText.textContent = 'Status: Reading local data batch...';
        bankNode.classList.add('active');
        await sleep(500); // Kurze Pause, bevor das Paket startet

        dataPacket.classList.add('moving'); // Startet die Datenpaket-Animation
        await sleep(500); // Warten, während Paket unterwegs ist

        statusText.textContent = 'Status: Applying Differential Privacy filter...';
        bankNode.classList.remove('active');
        agentNode.classList.add('active');
        await sleep(2000); // Warten, bis Paket-Animation fast fertig ist

        statusText.textContent = 'Status: Aggregating updates...';
        agentNode.classList.remove('active');
        aggregatorNode.classList.add('active');
        await sleep(1500);

        statusText.textContent = 'Status: Process complete.';
        aggregatorNode.classList.remove('active');
        aggregatorNode.classList.add('success');
        await sleep(1000);

        aggregatorNode.classList.remove('success');
    }
});