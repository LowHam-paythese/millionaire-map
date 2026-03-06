# 💰 Millionaire Map
<img width="1880" height="834" alt="image" src="https://github.com/user-attachments/assets/2f135c8b-34cf-4ccb-a186-3d63162fb4fc" />

> Discover where your savings make you a millionaire — in any currency, anywhere in the world.

## Overview

**Millionaire Map** is a lightweight full-stack web application that calculates where your savings surpass the millionaire threshold in different currencies. It also highlights countries where your wealth is close to reaching one million units in local currency.

This project demonstrates real-time API integration, clean REST API design, and a minimalistic frontend built without frameworks — showcasing practical full-stack development skills.

---

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
