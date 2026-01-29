import Link from 'next/link'
import { Building2, ExternalLink } from 'lucide-react'

interface DataSourceProps {
  label: string; // e.g. "Revenu Québec - Grilles de calcul 2026"
  url: string;   // e.g. "https://www.revenuquebec.ca/..."
  lastUpdate?: string; // e.g. "Janvier 2026"
}

export default function DataSource({ label, url, lastUpdate }: DataSourceProps) {
  return (
    <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-3 px-4 bg-slate-50 border border-slate-100 rounded-lg text-xs">
      {/* Left: The Source Link */}
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-white border border-slate-200 rounded-md shadow-sm">
          <Building2 className="w-3.5 h-3.5 text-slate-400" />
        </div>
        <div className="flex flex-col">
          <span className="text-slate-400 font-medium text-[10px] uppercase tracking-wider">
            Source Officielle
          </span>
          <Link 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1 font-semibold text-slate-700 hover:text-emerald-600 hover:underline transition-colors"
          >
            {label}
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Right: Last Update Badge */}
      {lastUpdate && (
        <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 text-emerald-700 rounded-md border border-emerald-100">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold">Données: {lastUpdate}</span>
        </div>
      )}
    </div>
  )
}
