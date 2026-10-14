// Placeholder wordmark. Swap in the official Ethixweb logo file from /public when available.
export default function Logo({ light = false }) {
  return (
    <span className="inline-flex items-center gap-2.5" aria-label="Ethixweb India">
      <svg width="34" height="34" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#D11A2A" />
        <path d="M10 9h13v3.2H13.4v3.3h8.2v3.1h-8.2v3.2H23V25H10z" fill="#fff" />
      </svg>
      <span className={`font-display text-xl font-bold tracking-tight ${light ? 'text-white' : 'text-ink'}`}>
        ethixweb<span className="ml-1.5 text-sm font-semibold text-red">India</span>
      </span>
    </span>
  )
}
