document.addEventListener('DOMContentLoaded', function () {
    const uploadButton = document.getElementById('upload-button');
    const visualizationDiv = document.getElementById('process-visualization');
    const resultsContainer = document.getElementById('results-container');
    const customBtn = document.getElementById('custom-upload-btn');
    const fileNameSpan = document.getElementById('selected-file-name');

    customBtn.addEventListener('click', () => uploadButton.click());
    uploadButton.addEventListener('change', function () {
        fileNameSpan.textContent = uploadButton.files[0] ? uploadButton.files[0].name : '';

        visualizationDiv.innerHTML = '';
        resultsContainer.classList.remove('visible');

        animateProcessVisualization(() => {
            fetch('/static/data/result.json')
                .then(response => response.json())
                .then(data => {
                    // Old Model
                    const oldCard = document.querySelector('.result-card');
                    if (oldCard) {
                        const oldLabels = oldCard.querySelectorAll('.label');
                        const oldValue = oldCard.querySelector('.value');
                        if (oldLabels.length > 0) oldLabels[0].textContent = data.old_model.name;
                        if (oldValue) oldValue.textContent = 'Total alerts: ' + data.old_model.total_alerts;
                        if (oldLabels.length > 1) oldLabels[oldLabels.length - 1].textContent = `False Positive Rate: ${data.old_model.false_positive_rate}%`;
                    }

                    // New Model
                    const newCard = document.querySelector('.result-card.success');
                    if (newCard) {
                        const newLabels = newCard.querySelectorAll('.label');
                        const newValue = newCard.querySelector('.value');
                        if (newLabels.length > 0) newLabels[0].textContent = data.new_model.name;
                        if (newValue) newValue.textContent = 'Total alerts: ' + data.new_model.total_alerts;
                        if (newLabels.length > 1) newLabels[newLabels.length - 1].textContent = `False Positive Rate: ${data.new_model.false_positive_rate}%`;
                    }

                    // Einsparung
                    const summary = document.getElementById('reduction-summary');
                    if (summary) summary.textContent = `Einsparung: ${data.new_model.reduction_percent}%`;

                    resultsContainer.classList.add('visible');
                })
                .catch(error => {
                    visualizationDiv.innerHTML = `<p>Fehler beim Laden der Ergebnisse: ${error.message}</p>`;
                });
        });
    });


    function animateProcessVisualization(callback) {
        const bankNode = document.getElementById('node-bank');
        const agentNode = document.getElementById('node-agent');
        const aggregatorNode = document.getElementById('node-aggregator');
        [bankNode, agentNode, aggregatorNode].forEach(node => {
            node.classList.remove('active', 'success');
        });
        setTimeout(() => {
            bankNode.classList.add('active');
            setTimeout(() => {
                bankNode.classList.remove('active');
                bankNode.classList.add('success');
                setTimeout(() => {
                    bankNode.classList.remove('success');
                    agentNode.classList.add('active');
                    setTimeout(() => {
                        agentNode.classList.remove('active');
                        agentNode.classList.add('success');
                        setTimeout(() => {
                            agentNode.classList.remove('success');
                            aggregatorNode.classList.add('active');
                            setTimeout(() => {
                                aggregatorNode.classList.remove('active');
                                aggregatorNode.classList.add('success');
                                setTimeout(() => {
                                    aggregatorNode.classList.remove('success');
                                    if (callback) callback();
                                }, 800);
                            }, 1200);
                        }, 800);
                    }, 1200);
                }, 800);
            }, 1200);
        }, 200);
    }
});
