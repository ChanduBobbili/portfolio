const GITHUB_USERNAME = 'ChanduBobbili'

export const AVAILABLE_YEARS = [2026, 2025, 2024] as const
export type AvailableYear = (typeof AVAILABLE_YEARS)[number]

const CONTRIBUTION_CALENDAR_QUERY = `
  query($userName: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $userName) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`

export type ContributionLevel =
  | 'NONE'
  | 'FIRST_QUARTILE'
  | 'SECOND_QUARTILE'
  | 'THIRD_QUARTILE'
  | 'FOURTH_QUARTILE'

export type ContributionCalendar = {
  totalContributions: number
  weeks: {
    contributionDays: {
      date: string
      contributionCount: number
      contributionLevel: ContributionLevel
    }[]
  }[]
}

type GraphQLResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: ContributionCalendar
      }
    }
  }
  errors?: { message: string }[]
}

export function isAvailableYear(year: number): year is AvailableYear {
  return (AVAILABLE_YEARS as readonly number[]).includes(year)
}

function getYearBounds(year: AvailableYear) {
  return {
    from: `${year}-01-01T00:00:00.000Z`,
    to: `${year}-12-31T23:59:59.000Z`,
  }
}

export async function getContributionCalendar(year: AvailableYear): Promise<ContributionCalendar> {
  const token = process.env.GITHUB_TOKEN

  if (!token) {
    throw new Error('GITHUB_TOKEN is not set')
  }

  const { from, to } = getYearBounds(year)

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: CONTRIBUTION_CALENDAR_QUERY,
      variables: { userName: GITHUB_USERNAME, from, to },
    }),
    next: { revalidate: 43200 },
  })

  if (!response.ok) {
    throw new Error(`GitHub API returned status ${response.status}`)
  }

  const json = (await response.json()) as GraphQLResponse

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join('; '))
  }

  const calendar = json.data?.user?.contributionsCollection?.contributionCalendar

  if (!calendar) {
    throw new Error('Contribution calendar data not found in GitHub response')
  }

  return calendar
}
