// Define the response types based on the actual API data structure
export interface MarketTrendItem {
  year: number
  size: number // Changed from 'volume' to 'size'
  currency: string
  growth_rate: number
  source: string
}

export interface AvgRevenueItem {
  average_revenue: number // Changed from 'amount' to 'average_revenue'
  currency: string
  source: string
}

export interface MarketStats {
  domestic: MarketTrendItem[]
  global: MarketTrendItem[]
}

export interface RevenueBenchmarks {
  domestic: AvgRevenueItem
  global: AvgRevenueItem
}

export interface SimilarServiceItem {
  name: string // Added name field
  description: string
  logo_url?: string
  website?: string // Changed from 'website_url' to 'website'
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
  url?: string // Added url field
}

export interface TargetMarket {
  segment: string // Changed from 'target' to 'segment'
  reason: string // Changed from 'reasons' to 'reason'
  value_prop: string // Changed from 'appeal' to 'value_prop'
  activities: {
    online: string
  }
  touchpoints: {
    online: string // Changed from 'online_channels' to nested structure
    offline: string // Changed from 'offline_channels' to nested structure
  }
}

export interface BusinessModelPriority {
  name: string
  description: string
}

export interface ValueProposition {
  main: string
  detail: string
}

export interface BusinessModel {
  summary: string
  value_proposition: ValueProposition
  revenue_stream: string // Changed from 'revenue' to 'revenue_stream'
  break_even_point: string // Added break_even_point field
  priorities: BusinessModelPriority[] // Changed from 'investments' to 'priorities'
}

export interface MarketingPhase {
  pre: string
  launch: string
  growth: string
}

export interface MarketingPlan {
  approach: string
  budget: number
  channels: string[]
  kpis: string[]
  messages: string[]
  phase: MarketingPhase
}

export interface LimitationItem {
  category: string
  detail: string
  impact: string
  mitigation: string // Changed from 'solution' to 'mitigation'
}

export interface TeamRequirement {
  priority: string // Changed from 'order' to 'priority'
  position: string // Changed from 'title' to 'position'
  skill: string
  tasks: string // Changed from 'responsibility' to 'tasks'
}

export interface KSICHierarchy {
  large: {
    code: string
    name: string
  }
  medium: {
    code: string
    name: string
  }
  small: {
    code: string
    name: string
  }
  detail: {
    code: string
    name: string
  }
}

export interface Score {
  market: number
  opportunity: number
  risk: number
  simliar_service: number // Note: keeping the typo as it appears in the data
}

export interface IdeaOverviewResponse {
  evaluation: string // Added evaluation field
  ksic_hierarchy: KSICHierarchy // Added KSIC hierarchy
  market_trends: MarketStats // Changed from 'market_stats' to 'market_trends'
  revenue_becnhmarks: RevenueBenchmarks // Note: keeping the typo as it appears in the data
  similar_services: SimilarServiceItem[] // Changed to array directly
  support_programs: SupportProgram[]
  target_markets: TargetMarket[]
  business_model: BusinessModel
  marketing_plan: MarketingPlan // Added marketing plan
  opportunities: string[] // Changed to string array
  limitations: LimitationItem[] // Changed to array directly
  team_requirements: TeamRequirement[]
  score: Score // Added score object
}
