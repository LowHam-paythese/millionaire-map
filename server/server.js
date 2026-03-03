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

async function checkMillionaire(amountZAR) {
  const results = [];


  // for (const country of countries) {

  // console.log(countries);

  for (const key in countries) {
    const country = countries[key];

    // console.log(country)
    // console.log("this is the values", key, country)
    const converted = await getConvertedAmount(
      "ZAR",
      key,
      amountZAR,
    );


    console.log("This is the converted amount", converted, "this is the country", country)

    if (parseFloat(converted) >= 1000000) {
      results.push({
        country: country,
        currency: key,
        converted: converted,
      });
    }

  }

  // console.log(`Checking ${country.name} (${country.currency})...`);
  // const converted = await getConvertedAmount(
  //   "ZAR",
  //   country.currency,
  //   amountZAR,
  // );

  // if (converted && parseFloat(converted) >= 1000000) {
  //   console.log(
  //     `Millionaire in ${country.name} (${country.currency}): ${converted} >= 1000000`,
  //   );
  //   results.push({
  //     country: country.name,
  //     currency: country.currency,
  //     converted: converted,
  //   });
  // } else {
  //   console.log(
  //     `Not a millionaire in ${country.name} (${country.currency}): ${converted} < 1000000`,
  //   );
  // }
  // }

  return results;
}

app.get("/millionaire/:amount", async (req, res) => {
  const { amount } = req.params;
  const numericAmount = parseFloat(amount);

  if (isNaN(numericAmount)) {
    return res.status(400).json({ success: false, message: "Invalid amount" });
  }

  const millionaireCountries = await checkMillionaire(numericAmount);

  res.json({
    success: true,
    original: numericAmount,
    millionaireCountries,
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
