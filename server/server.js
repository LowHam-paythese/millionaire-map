const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "../client")));

async function getConvertedAmount(from, to, amount) {
  try {
    const response = await fetch(
      `https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`,
    );
    const data = await response.json();
    const rate = data.rates[to];
    return (amount * rate).toFixed(2);
  } catch (error) {
    return null;
  }
}

const countries = JSON.parse(
  fs.readFileSync(path.join(__dirname, "./data/currencylist.json"), "utf8"),
);

async function checkMillionaire(amount, baseCurrency = "ZAR") {
  const millionaireCountries = [];
  const nearMillionaireCountries = [];
  const base = baseCurrency.toUpperCase();

  for (const key in countries) {
    if (key === base) continue;
    const country = countries[key];
    const converted = await getConvertedAmount(base, key, amount);

    if (converted) {
      const val = parseFloat(converted);
      if (val >= 1000000) {
        millionaireCountries.push({
          country: country,
          currency: key,
          converted: converted,
        });
      } else if (val >= 800000) {
        nearMillionaireCountries.push({
          country: country,
          currency: key,
          converted: converted,
        });
      }
    }
  }

  return { millionaireCountries, nearMillionaireCountries };
}

app.get("/millionaire/:amount", async (req, res) => {
  const { amount } = req.params;
  const numericAmount = parseFloat(amount);

  if (isNaN(numericAmount)) {
    return res.status(400).json({ success: false, message: "Invalid amount" });
  }

  const { base } = req.query;
  const { millionaireCountries, nearMillionaireCountries } = await checkMillionaire(numericAmount, base);

  res.json({
    success: true,
    original: numericAmount,
    millionaireCountries,
    nearMillionaireCountries,
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
