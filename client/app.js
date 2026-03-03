document.addEventListener('DOMContentLoaded', async () => {
    const baseCurrencySelect = document.getElementById('baseCurrency');
    try {
        const res = await fetch('https://api.frankfurter.dev/v1/currencies');
        const currencies = await res.json();

        for (const [code, name] of Object.entries(currencies)) {
            const option = document.createElement('option');
            option.value = code;
            option.textContent = `${code} - ${name}`;
            if (code === 'ZAR') option.selected = true;
            baseCurrencySelect.appendChild(option);
        }
    } catch (error) {
        console.error('Failed to load currencies', error);
        // Fallback to ZAR if API fails
        const option = document.createElement('option');
        option.value = 'ZAR';
        option.textContent = 'ZAR - South African Rand';
        option.selected = true;
        baseCurrencySelect.appendChild(option);
    }
});

async function check() {



    const amountInput = document.getElementById('amount');
    const resultsGrid = document.getElementById('results');
    const loader = document.getElementById('loader');
    const baseCurrency = document.getElementById('baseCurrency').value;
    const amount = amountInput.value;

    if (!amount || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    try {
        loader.style.display = "flex";
        resultsGrid.innerHTML = "";

        const res = await fetch(`/millionaire/${amount}?base=${baseCurrency}`);
        const data = await res.json();

        loader.style.display = "none";

        if (data.millionaireCountries.length === 0 && data.nearMillionaireCountries.length === 0) {
            resultsGrid.innerHTML = "<div class='empty-state'>You're not a millionaire anywhere yet — keep saving! 💪</div>";
            return;
        }

        const allCountries = [
            ...data.millionaireCountries.map(c => ({ ...c, type: 'millionaire' })),
            ...data.nearMillionaireCountries.map(c => ({ ...c, type: 'near' }))
        ];

        allCountries.forEach((c, index) => {
            const card = document.createElement('div');
            card.className = `country-card ${c.type}`;
            card.style.animationDelay = `${index * 0.1}s`;

            const tagText = c.type === 'millionaire' ? 'Millionaire' : 'Getting Close!';

            card.innerHTML = `
                <div class="card-header">
                    <div class="country-name">${c.country}</div>
                    <span class="tag ${c.type}">${tagText}</span>
                </div>
                <div class="currency-info">${c.currency}</div>
                <div class="amount-converted">${parseFloat(c.converted).toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            `;
            resultsGrid.appendChild(card);
        });
    } catch (error) {
        loader.style.display = "none";
        alert("Something went wrong. Please try again later.");
        console.error(error);
    }


}

