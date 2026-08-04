import { Check, Search } from 'lucide-react'


const MarketPlaceCard = () => {
  return (
    <div className="bg-surface border border-line rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-violet/40 transition-all group shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-violet/10 border border-violet-border flex items-center justify-center text-violet group-hover:scale-110 transition-transform">
                    <Search className="w-6 h-6" />
                  </div>
                
                </div>
                <h3 className="text-xl font-bold font-display text-ink mb-2">Job Marketplace</h3>
                <p className="text-muted text-xs sm:text-sm leading-relaxed mb-4">
                  Explore curated tech positions scored dynamically by fit percentage. Filter by match score, salary range, and technical stack (React, WASM, Node, Rust) with 1-click apply.
                </p>
                <div className="space-y-1.5 font-sans text-xs text-ink/80 border-t border-line pt-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-violet shrink-0" />
                    <span>One-Click Apply with Resume Selection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-violet shrink-0" />
                    <span>Advanced Search & Smart Filters</span>
                  </div>
                  
                </div>
              </div>
              {/* <div className="p-3 bg-overlay border border-line rounded-xl text-xs font-sans text-muted flex items-center justify-between">
                <span>Active Listings</span>
                <span className="text-ink font-bold">$180k - $260k Avg</span>
              </div> */}
            </div>
  )
}

export default MarketPlaceCard