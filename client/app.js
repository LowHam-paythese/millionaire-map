async function check() {



    const amountInput = document.getElementById('amount');
    const resultsGrid = document.getElementById('results');
    const loader = document.getElementById('loader');
    const amount = amountInput.value;

    if (!amount || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    try {
        const res = await fetch(`/millionaire/${amount}`);
        const data = await res.json();

        loader.style.display = "none";

        if (data.millionaireCountries.length === 0) {
            resultsGrid.innerHTML = "<p style='text-align:center; grid-column: 1/-1; color: var(--text-muted);'>You are not a millionaire anywhere yet... Keep saving!</p>";
            return;
        }

        data.millionaireCountries.forEach((c, index) => {
            const card = document.createElement('div');
            card.className = 'country-card';
            card.style.animationDelay = `${index * 0.1}s`;

            card.innerHTML = `
                <div class="country-name">${c.country}</div>
                <div class="currency-info">Currency: ${c.currency}</div>
                <div class="amount-converted">${parseFloat(c.converted).toLocaleString()}</div>
            `;
            resultsGrid.appendChild(card);
        });
    } catch (error) {
        loader.style.display = "none";
        alert("Something went wrong. Please try again later.");
        console.error(error);
    }


}

