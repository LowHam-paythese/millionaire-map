# 💰 Millionaire Map

**[View Live App](https://millionaire-map-production.up.railway.app/)**

> **Discover where your savings make you a millionaire — in any currency, anywhere in the world.**

## Overview

**Millionair Map** is a lightweight full-stack web application that helps users discover where their savings would make them a millionaire in any currency worldwide. By entering an amount and selecting a base currency, the app converts the value across all supported currencies, identifies where the converted amount meets or exceeds one million units, and highlights currencies where the amount is within 20 % of a million.

The project showcases real‑time API integration with the Frankfurter exchange‑rate service, clean REST API design, and a minimalistic vanilla‑JS frontend, providing a clear example of full‑stack development without the overhead of heavy frameworks.

### Why it exists

Many people wonder how far their savings would go in different parts of the world, especially when planning long‑term financial goals or comparing purchasing power across countries. This app provides a simple, interactive way to explore that question, turning abstract exchange‑rate data into tangible, visual results. It also serves as a teaching tool for developers interested in building full‑stack applications that consume external APIs, handle currency conversion, and present data in an engaging UI.


---
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="YOUR_DARK_IMAGE_URL">
  <source media="(prefers-color-scheme: light)" srcset="YOUR_LIGHT_IMAGE_URL">
  <img alt="Millionaire Map Dashboard" src="https://github.com/user-attachments/assets/2f135c8b-34cf-4ccb-a186-3d63162fb4fc">
</picture>


## Features

- 🌍 **Multi-currency support** — 30+ currencies powered by the [Frankfurter API](https://www.frankfurter.dev/)
- 🔄 **Dynamic base currency** — choose any currency as your starting point
- ✅ **Millionaire detection** — see where your net worth exceeds 1,000,000 in local currency
- 🔶 **Near-million visualization** — highlights currencies where your amount is within 20% of a million
- ⚡ **Lightweight and fast** — vanilla JS frontend, Node.js backend, no build step required

---

## Tech Stack

| Layer    | Technology                        |
|----------|-----------------------------------|
| Frontend | HTML, CSS, JavaScript (vanilla)   |
| Backend  | Node.js, Express                  |
| Data     | [Frankfurter API](https://www.frankfurter.dev/) (live exchange rates) |

---

## My Contributions

- Built a full-stack web app from scratch using Node.js and vanilla JavaScript
- Designed the backend REST API with dynamic currency conversion logic
- Integrated the Frankfurter API for real-time exchange rates
- Developed a responsive, minimalistic UI with animated result cards
- Implemented "millionaire" and "near-million" detection logic efficiently
- Ensured the app is lightweight, fast, and easy to deploy

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+

### Installation

```bash
git clone https://github.com/LowHam-paythese/millionaire-explorer.git
cd millionaire-map
npm install
```

### Run Locally

```bash
npm start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
millionaire-map/
├── client/
│   ├── index.html      # App shell
│   ├── style.css       # Minimalistic design system
│   └── app.js          # UI logic & API calls
└── server/
    ├── server.js       # Express API
    └── data/
        └── currencylist.json   # Currency → country map
```

---

## How It Works

1. The frontend fetches the list of available currencies from Frankfurter on load.
2. Users select a base currency and enter an amount.
3. A request is sent to `GET /millionaire/:amount?base=CURRENCY`.
4. The backend converts the amount across all currencies and identifies:
   - Currencies where the value ≥ 1,000,000
   - Currencies within 20% of a million
5. Results are returned as JSON and displayed as animated cards in the frontend.

---

## License

MIT
