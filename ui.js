import { validateProfile } from './validate.js';
import { evaluateEligibility } from './engine.js';
import { roles } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const evaluateBtn = document.getElementById('evaluate-btn');
    const validationMessageEl = document.getElementById('validation-message');
    const countsContainer = document.getElementById('counts-container');
    const resultsContainer = document.getElementById('results-container');

    evaluateBtn.addEventListener('click', () => {
        // Clear old results and counts before each new evaluation
        // This ensures that if validation fails, all previous results/counts are cleared.
        validationMessageEl.textContent = '';
        countsContainer.textContent = '';
        resultsContainer.innerHTML = '';

        // Collect form data
        const profile = {
            branch: document.getElementById('branch').value,
            cgpa: document.getElementById('cgpa').value,
            graduationYear: document.getElementById('graduationYear').value,
            activeBacklogs: document.getElementById('activeBacklogs').value,
            skills: document.getElementById('skills').value
        };

        // Perform validation
        const validationResult = validateProfile(profile);

        if (!validationResult.isValid) {
            // Stop and show validation error codes
            validationMessageEl.textContent = validationResult.errors.join(', ');
            validationMessageEl.style.color = 'red';
            return;
        }

        // Pass normalized student data to engine and get results
        const results = evaluateEligibility(validationResult.normalizedProfile, roles);

        // Show ELIGIBLE roles first, INELIGIBLE roles second.
        // Within each group, sort by role title case-insensitively, then role ID.
        results.sort((a, b) => {
            if (a.status !== b.status) {
                return a.status === 'ELIGIBLE' ? -1 : 1;
            }
            const titleCmp = a.role.name.toLowerCase().localeCompare(b.role.name.toLowerCase());
            if (titleCmp !== 0) return titleCmp;
            return a.role.id.localeCompare(b.role.id);
        });

        // Display the eligible count and ineligible count
        const eligibleCount = results.filter(r => r.status === 'ELIGIBLE').length;
        const ineligibleCount = results.filter(r => r.status === 'INELIGIBLE').length;
        countsContainer.innerHTML = `<strong>Eligible:</strong> ${eligibleCount} | <strong>Ineligible:</strong> ${ineligibleCount}`;

        // Render results
        results.forEach(result => {
            const resultCard = document.createElement('div');
            resultCard.className = 'role-card ' + result.status.toLowerCase();
            resultCard.style.border = '1px solid #ccc';
            resultCard.style.padding = '10px';
            resultCard.style.margin = '10px 0';
            
            const titleEl = document.createElement('h3');
            titleEl.textContent = `${result.role.name} (${result.role.id}) - ${result.status}`;
            resultCard.appendChild(titleEl);

            // Display every failure reason in the order returned by engine.js
            if (result.status === 'INELIGIBLE' && result.failures.length > 0) {
                const failureList = document.createElement('ul');
                result.failures.forEach(failure => {
                    const li = document.createElement('li');
                    li.textContent = failure;
                    failureList.appendChild(li);
                });
                resultCard.appendChild(failureList);
            }

            resultsContainer.appendChild(resultCard);
        });
    });
});
