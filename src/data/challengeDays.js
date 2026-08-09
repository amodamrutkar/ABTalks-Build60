export const CHALLENGE_DAYS = {
  12: {
    day: 12,
    subtitle: "TODAY'S CHALLENGE",
    title: 'Build a Weather Dashboard',
    category: 'Frontend · API',
    difficulty: 'Medium',
    duration: '~2–3 hours',
    accent: '#22d3ee',
    description: 'Turn live weather data into a dashboard people can actually use.',
    requirements: [
      'Search for a city',
      'Display current temperature',
      'Show weather condition',
      'Display humidity',
      'Display wind speed',
      'Handle invalid cities',
    ],
    criteria: [
      { label: 'Works on mobile', hint: 'Check it at 390px — no horizontal scroll.' },
      { label: 'Uses an API', hint: 'Live data from OpenWeather or similar.' },
      { label: 'Has working interactions', hint: 'Search, toggle, refresh — all clickable.' },
      { label: 'Handles errors', hint: 'Wrong city names show a clear message.' },
      { label: 'Has a clean UI', hint: 'Consistent spacing and readable sizes.' },
      { label: 'Project is accessible', hint: 'Labels, focus states, readable contrast.' },
    ],
    resources: [
      {
        icon: '📚',
        title: 'API Documentation',
        sub: 'Learn the API',
        url: 'https://openweathermap.org/current',
        body:
          'The official docs cover endpoints, query parameters and the response shape. The /weather endpoint is all you need for today.',
      },
      {
        icon: '💡',
        title: 'Starter Guide',
        sub: 'Helpful reference',
        url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data',
        body:
          'A clean walkthrough of fetch(), handling responses, and what to do when a request fails.',
      },
      {
        icon: '📈',
        title: 'Shipped Examples',
        sub: 'See real dashboards',
        url: 'https://github.com/topics/weather-app',
        body:
          'Scan a few real weather app repos for layout, error states and state patterns worth borrowing.',
      },
    ],
    tip: 'Build the smallest working version first. Polish it after the core functionality works.',
    steps: [
      { label: 'Understand', demo: 'Read the challenge and requirements once, fully.' },
      { label: 'Build', demo: 'Start implementing the core functionality.' },
      { label: 'Test', demo: 'Try wrong cities and unreliable networks.' },
      { label: 'Submit', demo: 'Paste your GitHub and LinkedIn proof below.' },
      { label: 'Complete', demo: 'Bank the day. Your streak continues.' },
    ],
  },
}

export function getChallenge(day) {
  return CHALLENGE_DAYS[day] ?? CHALLENGE_DAYS[12]
}