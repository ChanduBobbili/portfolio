import { AVAILABLE_YEARS, getContributionCalendar, isAvailableYear } from '@/lib/github'

export const revalidate = 43200

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const yearParam = searchParams.get('year')
  const year = yearParam ? Number(yearParam) : new Date().getFullYear()

  if (!isAvailableYear(year)) {
    return Response.json(
      { error: `Invalid year. Must be one of: ${AVAILABLE_YEARS.join(', ')}` },
      { status: 400 }
    )
  }

  try {
    const calendar = await getContributionCalendar(year)
    return Response.json(calendar)
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : 'Failed to fetch GitHub activity' },
      { status: 500 }
    )
  }
}
