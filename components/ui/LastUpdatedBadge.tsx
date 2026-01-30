import { siteConfig, getLastUpdatedText } from '@/lib/siteConfig'

interface LastUpdatedBadgeProps {
  date?: string
  variant?: 'default' | 'compact'
}

export default function LastUpdatedBadge({ 
  date, // If not provided, uses siteConfig
  variant = 'default' 
}: LastUpdatedBadgeProps) {
  const displayDate = date || getLastUpdatedText('short')

  if (variant === 'compact') {
    return (
      <span className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs font-semibold inline-block">
        📅 {displayDate}
      </span>
    )
  }

  return (
    <span className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold inline-block">
      📅 Mis à jour: {displayDate}
    </span>
  )
}
