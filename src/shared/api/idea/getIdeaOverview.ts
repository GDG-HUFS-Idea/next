import { useQuery } from '@tanstack/react-query'
import { useGetCookie } from '../cookie'
import * as ideaType from '@/shared/type/ideaType'

/**
 * Hook to fetch idea overview data by project ID
 * @param id - Project ID to fetch overview data for
 * @returns Query result with project analysis data
 */

export const useGetIdeaOverview = (projectId: number) => {
  const { data } = useGetCookie()
  const token = data?.jwt ?? null
  return useQuery<ideaType.IdeaOverviewResponse, Error>({
    enabled: !!projectId,
    queryKey: ['analyses', 'overview', projectId, token],
    queryFn: async () => {
      if (!projectId) {
        throw new Error('Project ID is required')
      }

      if (!token) {
        throw new Error('Authentication token is not available')
      }

      try {
        const response = await fetch(
          `/api/analyses/overview?project_id=${projectId}`,
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
