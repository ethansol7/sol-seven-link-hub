import { useMemo, useRef, useState } from 'react'
import {
  ArrowRight,
  BadgePercent,
  Blocks,
  Camera,
  CheckCircle2,
  ChevronRight,
  Download,
  ExternalLink,
  Globe2,
  Link2,
  Mail,
  RefreshCw,
  Send,
  ShoppingBag,
  Sparkles,
} from 'lucide-react'
import './App.css'

export const SOL_SEVEN_STUDIOS_URL = 'https://www.solsevenstudios.com/'
export const PLASTIVISTA_URL = 'https://ethansol7.github.io/plasti-vista-site/'
export const PERSONAL_PORTFOLIO_URL = 'https://www.ethansolodukhin.com/'
export const LINKEDIN_URL = 'PLACEHOLDER_LINKEDIN_URL'
export const INSTAGRAM_URL = 'PLACEHOLDER_INSTAGRAM_URL'

export const SOL_LAMP_BUY_URL = SOL_SEVEN_STUDIOS_URL
export const S01_LAMP_BUY_URL = SOL_SEVEN_STUDIOS_URL
export const S02_LAMP_BUY_URL = SOL_SEVEN_STUDIOS_URL
export const S03_LAMP_BUY_URL = SOL_SEVEN_STUDIOS_URL
export const ORIGINAL_SOL_COLLECTION_URL = SOL_SEVEN_STUDIOS_URL
export const CUSTOM_ICFF_INQUIRY_URL = '#contact'

export const DISCOUNT_CODE = 'ICFFSOL15%'
export const LEAD_CAPTURE_ENDPOINT = ''
export const LOCAL_LEADS_STORAGE_KEY = 'solseven_linkhub_leads'

const assetPath = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

const linkCards = [
  {
    title: 'Sol Seven Studios',
    description: 'The studio home for modular lighting, product systems, and circular design work.',
    cta: 'Visit Studio',
    href: SOL_SEVEN_STUDIOS_URL,
    icon: Globe2,
  },
  {
    title: 'PlastiVista',
    description: 'A circular manufacturing and product-design system for turning waste into finished objects.',
    cta: 'Explore PlastiVista',
    href: PLASTIVISTA_URL,
    icon: Blocks,
  },
  {
    title: "Ethan's Portfolio",
    description: 'Selected product, industrial, brand, and systems design work by Ethan Solodukhin.',
    cta: 'View Portfolio',
    href: PERSONAL_PORTFOLIO_URL,
    icon: Sparkles,
  },
  {
    title: 'LinkedIn',
    description: 'Professional updates, project milestones, and partnership context.',
    cta: 'Connect',
    href: LINKEDIN_URL,
    icon: Link2,
  },
  {
    title: 'Instagram',
    description: 'Studio process, launches, product moments, and visual updates from Sol Seven Studios.',
    cta: 'Follow',
    href: INSTAGRAM_URL,
    icon: Camera,
  },
]

const lampCards = [
  {
    title: 'Original SOL Lamp',
    description: 'The first modular SOL lighting object: sculptural, configurable, and built around repairable parts.',
    cta: 'Buy Now',
    href: ORIGINAL_SOL_COLLECTION_URL,
  },
  {
    title: 'SOL Lamp S01',
    description: 'A compact desk-scale lamp for clean workspaces, gallery shelves, and launch collectors.',
    cta: 'Buy Now',
    href: S01_LAMP_BUY_URL,
  },
  {
    title: 'SOL Lamp S02',
    description: 'A taller statement profile with the same modular language and collectible SOL silhouette.',
    cta: 'Buy Now',
    href: S02_LAMP_BUY_URL,
  },
  {
    title: 'SOL Lamp S03',
    description: 'A bolder fixture expression for people who want the lamp to anchor the room.',
    cta: 'Buy Now',
    href: S03_LAMP_BUY_URL,
  },
  {
    title: 'Custom / ICFF Inquiry',
    description: 'For wholesale, custom finishes, press, collaborations, and ICFF follow-up conversations.',
    cta: 'Inquire',
    href: CUSTOM_ICFF_INQUIRY_URL,
    intent: 'inquire',
  },
]

const interestTypes = [
  'Buy a lamp',
  'Wholesale',
  'Press',
  'Collaboration',
  'ICFF follow up',
  'Custom order',
  'Other',
]

function isPlaceholderUrl(href) {
  return !href || href.startsWith('PLACEHOLDER_')
}

function safeLocalRead() {
  if (typeof window === 'undefined') return []

  try {
    const raw = window.localStorage.getItem(LOCAL_LEADS_STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function safeLocalWrite(entry) {
  if (typeof window === 'undefined') return []

  const entries = [...safeLocalRead(), entry]
  window.localStorage.setItem(LOCAL_LEADS_STORAGE_KEY, JSON.stringify(entries))
  return entries
}

function getCampaignContext() {
  if (typeof window === 'undefined') {
    return {
      sourcePage: '',
      campaign: '',
    }
  }

  const url = new URL(window.location.href)
  const campaign = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'ref']
    .map((key) => {
      const value = url.searchParams.get(key)
      return value ? `${key}=${value}` : ''
    })
    .filter(Boolean)
    .join('; ')

  return {
    sourcePage: `${url.pathname}${url.search}`,
    campaign,
  }
}

function createSubmissionId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `solseven-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function exportLeadsCsv() {
  const entries = safeLocalRead()
  if (entries.length === 0) return

  const headers = [
    'timestamp',
    'name',
    'email',
    'phone',
    'interest_type',
    'message',
    'source_page',
    'campaign',
    'submission_id',
    'capture_mode',
    'discount_code',
  ]

  const rows = entries.map((entry) => [
    entry.submittedAt,
    entry.name,
    entry.email,
    entry.phone,
    entry.interestType,
    entry.message,
    entry.sourcePage,
    entry.campaign,
    entry.submissionId,
    entry.captureMode,
    entry.discountCode,
  ])

  const csv = [headers, ...rows]
    .map((row) => row.map((value) => `"${String(value ?? '').replace(/"/g, '""')}"`).join(','))
    .join('\n')

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = window.URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = 'sol-seven-launch-leads.csv'
  anchor.click()
  window.URL.revokeObjectURL(url)
}

function ExternalAction({ href, children, className = '', iconOnly = false }) {
  const placeholder = isPlaceholderUrl(href)
  const classes = `action-link ${className}${placeholder ? ' is-disabled' : ''}`

  if (placeholder) {
    return (
      <span
        className={classes}
        aria-disabled="true"
        title={`Replace ${href} in src/App.jsx before publishing this link.`}
      >
        {children}
        {!iconOnly && <ExternalLink size={16} strokeWidth={2.1} />}
      </span>
    )
  }

  return (
    <a className={classes} href={href} target="_blank" rel="noreferrer">
      {children}
      {!iconOnly && <ExternalLink size={16} strokeWidth={2.1} />}
    </a>
  )
}

function InternalAction({ href, children, className = '' }) {
  return (
    <a className={`action-link ${className}`} href={href}>
      {children}
      <ArrowRight size={16} strokeWidth={2.2} />
    </a>
  )
}

function SectionIntro({ label, title, children }) {
  return (
    <div className="section-intro">
      <p className="section-label">{label}</p>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  )
}

function LinkHubCard({ card, index }) {
  const Icon = card.icon

  return (
    <article className="hub-card reveal-card" style={{ '--delay': `${index * 80}ms` }}>
      <div className="card-topline">
        <span className="icon-shell">
          <Icon size={22} strokeWidth={2} />
        </span>
        <span className="link-status">{isPlaceholderUrl(card.href) ? 'Placeholder' : 'External'}</span>
      </div>
      <h3>{card.title}</h3>
      <p>{card.description}</p>
      <ExternalAction href={card.href} className="card-action">
        {card.cta}
      </ExternalAction>
    </article>
  )
}

function LampCard({ lamp, index }) {
  const isInquiry = lamp.intent === 'inquire'

  return (
    <article className="lamp-card reveal-card" style={{ '--delay': `${index * 70}ms` }}>
      <div className="lamp-card-visual" aria-hidden="true">
        <span className="lamp-core" />
        <span className="lamp-ring" />
      </div>
      <div>
        <p className="lamp-index">{String(index + 1).padStart(2, '0')}</p>
        <h3>{lamp.title}</h3>
        <p>{lamp.description}</p>
      </div>
      {isInquiry ? (
        <InternalAction href={lamp.href} className="card-action inquiry-action">
          {lamp.cta}
        </InternalAction>
      ) : (
        <ExternalAction href={lamp.href} className="card-action buy-action">
          {lamp.cta}
        </ExternalAction>
      )}
    </article>
  )
}

function LeadForm() {
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [errors, setErrors] = useState({})
  const [hasLocalLeads, setHasLocalLeads] = useState(() => safeLocalRead().length > 0)
  const recentSignature = useRef(null)

  const submitLabel = useMemo(() => {
    if (status.type === 'submitting') return 'Sending...'
    if (status.type === 'success') return 'Added'
    return 'Join the Launch List'
  }, [status.type])

  async function handleSubmit(event) {
    event.preventDefault()
    if (status.type === 'submitting') return

    const form = event.currentTarget
    const formData = new FormData(form)
    const campaignContext = getCampaignContext()
    const payload = {
      name: String(formData.get('name') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      phone: String(formData.get('phone') ?? '').trim(),
      interestType: String(formData.get('interestType') ?? '').trim(),
      message: String(formData.get('message') ?? '').trim(),
      sourcePage: campaignContext.sourcePage,
      campaign: campaignContext.campaign,
      submissionId: createSubmissionId(),
      discountCode: DISCOUNT_CODE,
    }

    const nextErrors = {}
    if (!payload.name) nextErrors.name = 'Please enter your name.'
    if (!payload.email) {
      nextErrors.email = 'Please enter your email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      nextErrors.email = 'Please enter a valid email.'
    }
    if (!payload.interestType) nextErrors.interestType = 'Please choose an interest type.'
    if (!payload.message) nextErrors.message = 'Please share a short message.'

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setStatus({ type: 'error', message: 'Please correct the highlighted fields.' })
      return
    }

    const signature = [payload.email.toLowerCase(), payload.interestType, payload.message].join('|')
    const now = Date.now()
    if (recentSignature.current?.signature === signature && now - recentSignature.current.time < 12000) {
      setStatus({
        type: 'error',
        message: 'This looks like the same response. Give it a moment before sending again.',
      })
      return
    }

    setErrors({})
    setStatus({ type: 'submitting', message: '' })

    const entry = {
      ...payload,
      submittedAt: new Date().toISOString(),
      captureMode: LEAD_CAPTURE_ENDPOINT ? 'endpoint-and-local' : 'static-local',
    }

    try {
      safeLocalWrite(entry)
      setHasLocalLeads(true)

      if (LEAD_CAPTURE_ENDPOINT) {
        await fetch(LEAD_CAPTURE_ENDPOINT, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify(entry),
        })
      }

      recentSignature.current = { signature, time: now }
      form.reset()
      setStatus({
        type: 'success',
        message: `You’re on the list. Use code ${DISCOUNT_CODE} for 10% off your first SOL Lamp.`,
      })
    } catch {
      setStatus({
        type: 'error',
        message: 'The browser could not save this submission. Please try again or use a direct contact link.',
      })
    }
  }

  if (status.type === 'success') {
    return (
      <div className="success-panel" role="status">
        <span className="success-icon">
          <CheckCircle2 size={28} strokeWidth={2} />
        </span>
        <h3>You are on the list.</h3>
        <p>{status.message}</p>
        <div className="success-actions">
          <ExternalAction href={SOL_SEVEN_STUDIOS_URL} className="primary-action">
            Shop with code
          </ExternalAction>
          {hasLocalLeads && (
            <button className="secondary-action" type="button" onClick={exportLeadsCsv}>
              <Download size={16} strokeWidth={2.1} />
              Download CSV
            </button>
          )}
          <button className="ghost-action" type="button" onClick={() => setStatus({ type: 'idle', message: '' })}>
            <RefreshCw size={16} strokeWidth={2.1} />
            Submit another
          </button>
        </div>
      </div>
    )
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid two">
        <label className="field">
          <span>Name</span>
          <input name="name" type="text" autoComplete="name" placeholder="Ethan Solodukhin" />
          {errors.name && <small>{errors.name}</small>}
        </label>
        <label className="field">
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" placeholder="you@example.com" />
          {errors.email && <small>{errors.email}</small>}
        </label>
      </div>

      <div className="form-grid two">
        <label className="field">
          <span>Phone optional</span>
          <input name="phone" type="tel" autoComplete="tel" placeholder="(555) 000-0000" />
        </label>
        <label className="field">
          <span>Interest type</span>
          <select name="interestType" defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            {interestTypes.map((type) => (
              <option value={type} key={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.interestType && <small>{errors.interestType}</small>}
        </label>
      </div>

      <label className="field">
        <span>Message</span>
        <textarea
          name="message"
          rows="5"
          placeholder="Tell me what you are interested in buying, stocking, covering, or building together."
        />
        {errors.message && <small>{errors.message}</small>}
      </label>

      {status.type === 'error' && <div className="form-alert">{status.message}</div>}

      <div className="form-footer">
        <p>
          Entries save locally in this browser and can be exported as CSV. Add an Apps Script endpoint later if you want
          live spreadsheet capture.
        </p>
        <div className="form-actions">
          {hasLocalLeads && (
            <button className="secondary-action" type="button" onClick={exportLeadsCsv}>
              <Download size={16} strokeWidth={2.1} />
              Export CSV
            </button>
          )}
          <button className="primary-action" type="submit" disabled={status.type === 'submitting'}>
            <Send size={16} strokeWidth={2.1} />
            {submitLabel}
          </button>
        </div>
      </div>
    </form>
  )
}

function App() {
  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand-lockup" href="#top" aria-label="Sol Seven Studios home">
          <img src={assetPath('assets/brand/sol-seven-mark.png')} alt="" />
          <span>
            <strong>Sol Seven Studios</strong>
            <small>Ethan Solodukhin</small>
          </span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#links">Links</a>
          <a href="#shop">Shop</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 id="hero-title">Ethan Solodukhin / Sol Seven Studios</h1>
            <p>
              Modular lighting, circular manufacturing, and product design systems built for the next generation of
              objects.
            </p>
            <div className="hero-actions" aria-label="Primary actions">
              <ExternalAction href={SOL_LAMP_BUY_URL} className="primary-action">
                <ShoppingBag size={17} strokeWidth={2.2} />
                Shop SOL Lamps
              </ExternalAction>
              <InternalAction href="#contact" className="secondary-action">
                <Mail size={17} strokeWidth={2.2} />
                Join the Launch List
              </InternalAction>
              <ExternalAction href={PERSONAL_PORTFOLIO_URL} className="ghost-action">
                View Portfolio
              </ExternalAction>
            </div>
          </div>

          <div className="hero-product" aria-label="SOL lamp collection preview">
            <div className="product-glass">
              <img src={assetPath('assets/sol/sol-hero-collection.png')} alt="SOL lamp collection" />
              <div className="product-caption">
                <span>SOL Lamp System</span>
                <strong>Buy or inquire through Sol Seven Studios</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="link-hub section-pad" id="links" aria-labelledby="links-title">
          <SectionIntro label="Link Hub" title="One clean path into the studio world.">
            Studio site, circular manufacturing work, portfolio, and social links in a premium mobile-first hub.
          </SectionIntro>
          <div className="hub-grid">
            {linkCards.map((card, index) => (
              <LinkHubCard card={card} index={index} key={card.title} />
            ))}
          </div>
        </section>

        <section className="sales-funnel section-pad" id="shop" aria-labelledby="shop-title">
          <div className="funnel-layout">
            <div>
              <SectionIntro label="SOL Lamp Sales Funnel" title="Explore, choose, and head straight to buy.">
                Product URLs are constants in code now. Swap them later when the exact Sol Seven product pages are live.
              </SectionIntro>
              <div className="funnel-steps" aria-label="SOL lamp shopping flow">
                <span>Explore SOL Lamp System</span>
                <ChevronRight size={18} />
                <span>Choose a lamp or collection</span>
                <ChevronRight size={18} />
                <span>Click Buy Now</span>
                <ChevronRight size={18} />
                <span>Go to Sol Seven Studios</span>
              </div>
            </div>
            <div className="funnel-image">
              <img src={assetPath('assets/sol/sol-lamp-collection.png')} alt="SOL lamps arranged as a product collection" />
            </div>
          </div>

          <div className="lamp-grid">
            {lampCards.map((lamp, index) => (
              <LampCard lamp={lamp} index={index} key={lamp.title} />
            ))}
          </div>
        </section>

        <section className="contact-section section-pad" id="contact" aria-labelledby="contact-title">
          <div className="contact-copy">
            <p className="section-label">Lead Capture</p>
            <h2 id="contact-title">Buy, stock, cover, or collaborate on SOL.</h2>
            <p>
              A focused launch-list form for lamp buyers, wholesale conversations, press, ICFF follow-up, custom
              orders, and design collaborations.
            </p>
            <div className="code-card">
              <BadgePercent size={24} strokeWidth={2} />
              <span>
                <strong>{DISCOUNT_CODE}</strong>
                <small>Easy-to-edit discount constant</small>
              </span>
            </div>
          </div>
          <LeadForm />
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <strong>Sol Seven Studios</strong>
          <p>Designed by Ethan Solodukhin</p>
        </div>
        <nav aria-label="Footer links">
          <ExternalAction href={SOL_SEVEN_STUDIOS_URL} iconOnly>
            Sol Seven Studios
          </ExternalAction>
          <ExternalAction href={PLASTIVISTA_URL} iconOnly>
            PlastiVista
          </ExternalAction>
          <ExternalAction href={PERSONAL_PORTFOLIO_URL} iconOnly>
            Portfolio
          </ExternalAction>
          <ExternalAction href={LINKEDIN_URL} iconOnly>
            LinkedIn
          </ExternalAction>
          <ExternalAction href={INSTAGRAM_URL} iconOnly>
            Instagram
          </ExternalAction>
        </nav>
      </footer>
    </div>
  )
}

export default App
