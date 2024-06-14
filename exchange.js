// Obtener referencias a los elementos del DOM
const baseCurrencySelect = document.getElementById("base-currency");
const targetCurrencySelect = document.getElementById("target-currency");
const convertButton = document.getElementById("convert-btn");
const rateValue = document.getElementById("rate-value");
const resultValue = document.getElementById("result-value");

// Función para cargar la lista de monedas disponibles
function loadCurrencyOptions() {
    fetch("https://api.exchangerate-api.com/v4/latest/USD") // Cambia USD por tu moneda base predeterminada
        .then((response) => response.json())
        .then((data) => {
            const currencies = Object.keys(data.rates);
            currencies.forEach((currency) => {
                const option = document.createElement("option");
                option.value = currency;
                option.textContent = currency;
                baseCurrencySelect.appendChild(option.cloneNode(true));
                targetCurrencySelect.appendChild(option);
            });
        })
        .catch((error) => {
            console.error("Error fetching currency options:", error);
        });
}

// esta funcion es la que realiza la conversion en los diversas tasas de cambio
function convertCurrency() {
    const baseCurrency = baseCurrencySelect.value;
    const targetCurrency = targetCurrencySelect.value;
    const baseAmount = parseFloat(document.getElementById("base-input").value);

    fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`)
        .then((response) => response.json())
        .then((data) => {
            const rate = data.rates[targetCurrency];
            const convertedAmount = baseAmount * rate;
            rateValue.textContent = `Tasa de cambio: 1 ${baseCurrency} = ${rate} ${targetCurrency}`;
            resultValue.textContent = `${baseAmount} ${baseCurrency} = ${convertedAmount} ${targetCurrency}`;
        })
        .catch((error) => {
            console.error("Error fetching exchange rate:", error);
        });
}


window.addEventListener("DOMContentLoaded", loadCurrencyOptions);
convertButton.addEventListener("click", convertCurrency);
