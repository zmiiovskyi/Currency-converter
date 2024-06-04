document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '42e2bc656bf0cb8a91aeb51f'; // Замініть на ваш API ключ
    const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const convertButton = document.getElementById('convertButton');
    const resultDiv = document.getElementById('result');

    // Отримання списку валют та встановлення в випадаючі списки
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.conversion_rates);
            currencies.forEach(currency => {
                const optionFrom = document.createElement('option');
                const optionTo = document.createElement('option');
                optionFrom.value = currency;
                optionFrom.textContent = currency;
                optionTo.value = currency;
                optionTo.textContent = currency;
                fromCurrencySelect.appendChild(optionFrom);
                toCurrencySelect.appendChild(optionTo);
            });
        });

    // Функція конвертації валют
    convertButton.addEventListener('click', function () {
        const amount = amountInput.value;
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        if (amount === '' || isNaN(amount)) {
            resultDiv.textContent = 'Please enter a valid amount';
            return;
        }

        fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}/${amount}`)
            .then(response => response.json())
            .then(data => {
                const convertedAmount = data.conversion_result;
                resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
            })
            .catch(error => {
                resultDiv.textContent = 'Error fetching data';
                console.error(error);
            });
    });
});
