# Global Holiday Finder

A personal React project I started during my summer break before my final year of Computing Science.

The application explores upcoming public holidays around the world and provides searching, filtering, sorting, date-range filtering, localisation, theme switching and holiday detail views.

## Why I built it

I wanted to develop a complete React application outside formal coursework and practise working with:

- third-party REST APIs
- reusable React components
- state and effect management
- filtering and sorting
- localisation
- responsive design
- testing and debugging
- Git / GitHub
- deployment with Vercel

## Features

- Worldwide upcoming holiday data using the Nager.Date REST API
- Search by holiday name
- Filter by country
- Filter by holiday type
- Filter by start and end date
- Sort by holiday name or date
- Holiday details modal
- English and Spanish localisation
- Light and dark themes
- Responsive layout
- Live local date and time
- API error handling with retry
- Empty-state and loading feedback

## Technologies

- React
- JavaScript
- REST APIs
- react-i18next / i18next
- React Datepicker
- Jest / React Testing Library
- Git / GitHub
- Vercel

## Recent maintenance refresh

I revisited the project in 2026 and treated it as an example of maintaining existing software rather than simply rewriting it.

The refresh included:

- updating the holiday API from the legacy v2 endpoint to v3
- adding explicit API failure handling and retry behaviour
- removing a duplicated API request from the top-level component
- improving filtering and empty states
- improving accessibility and modal behaviour
- making the light/dark theme persist between sessions
- refreshing the responsive interface
- updating stale project documentation
- updating tests to match the current component behaviour

This was useful because it highlighted a realistic software-engineering lesson: software that worked when first developed still needs maintenance as APIs, dependencies and expectations change.

## Running locally

```bash
npm install
npm start
```

Then open:

```text
http://localhost:3000
```

## Production build

```bash
npm run build
```

## Data source

Holiday data is provided by the public Nager.Date API:

`https://date.nager.at/api/v3/NextPublicHolidaysWorldwide`

The worldwide endpoint returns upcoming public holidays for the next several days.

## Future improvements

- modernise the older Create React App dependency stack
- expand automated test coverage
- add country names rather than displaying only country codes
- add a country/year view using the Nager.Date country-specific endpoint
- improve caching and offline behaviour
- add basic observability for client-side failures
