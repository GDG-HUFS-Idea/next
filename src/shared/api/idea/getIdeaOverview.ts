import { useQuery } from '@tanstack/react-query'
import { useGetCookie } from '../cookie'

// Define the response types based on the API documentation
export interface MarketTrendItem {
  year: number
  volume: number
  currency: string
  growth_rate: number
  source: string
}

export interface AvgRevenueItem {
  amount: number
  currency: string
  source: string
}

export interface MarketStats {
  industry_path: string[]
  score: number
  market_trend: {
    domestic: MarketTrendItem[]
    global: MarketTrendItem[]
  }
  avg_revenue: {
    domestic: AvgRevenueItem
    global: AvgRevenueItem
  }
}

export interface SimilarServiceItem {
  description: string
  logo_url?: string
  website_url?: string
  tags: string[]
  summary: string
}

export interface SimilarService {
  score: number
  items: SimilarServiceItem[]
}

export interface SupportProgram {
  name: string
  organizer: string
  start_date?: string
  end_date?: string
}

export interface TargetMarket {
  target: string
  order: number
  reasons: string
  appeal: string
  online_activity: string
  online_channels: string
  offline_channels: string
}

export interface BusinessModelInvestment {
  order: number
  section: string
  description: string
}

export interface BusinessModel {
  summary: string
  value_prop: string
  revenue: string
  investments: BusinessModelInvestment[]
}

export interface Opportunity {
  score: number
  items: string[]
}

export interface LimitationItem {
  category: string
  detail: string
  impact: string
  solution: string
}

export interface Limitation {
  score: number
  items: LimitationItem[]
}

export interface TeamRequirement {
  order: number
  title: string
  skill: string
  responsibility: string
}

export interface IdeaOverviewResponse {
  review: string
  project: {
    id: number
    name: string
  }
  market_stats: MarketStats
  similar_service: SimilarService
  support_programs: SupportProgram[]
  target_markets: TargetMarket[]
  business_model: BusinessModel
  opportunity: Opportunity
  limitation: Limitation
  team_requirements: TeamRequirement[]
}

/**
 * Hook to fetch idea overview data by project ID
 * @param id - Project ID to fetch overview data for
 * @returns Query result with project analysis data
 */

export const useGetIdeaOverview = (projectId: number | undefined) => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const { data: token } = useGetCookie()
  return useQuery<IdeaOverviewResponse, Error>({
    enabled: !!projectId,
    queryKey: [
      'projects',
      'analyses',
      'overview',
      projectId,
      token,
      apiBaseUrl,
    ],
    queryFn: async () => {
      if (!projectId) {
        throw new Error('Project ID is required')
      }

      if (!token) {
        throw new Error('Authentication token is not available')
      }

      try {
        const response = await fetch(
          `${apiBaseUrl}/projects/analyses/overview?id=${projectId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`API error (${response.status}): ${errorText}`)
        }

        return await response.json()
      } catch (error) {
        console.error('Failed to fetch idea overview:', error)
        throw error
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    retry: 1,
  })
}
