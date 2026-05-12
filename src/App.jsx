import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowRight,
  Blocks,
  Camera,
  ChevronRight,
  Download,
  ExternalLink,
  Globe2,
  Link2,
  Mail,
  Send,
  ShoppingBag,
  Sparkles,
} from 'lucide-react'
import './App.css'

export const SOL_SEVEN_STUDIOS_URL = 'https://www.solsevenstudios.com/'
export const SOL_SEVEN_CONFIGURATOR_URL = 'https://ethansol7.github.io/SolSevenStudios/'
export const PLASTIVISTA_URL = 'https://ethansol7.github.io/plasti-vista-site/'
export const PERSONAL_PORTFOLIO_URL = 'https://www.ethansolodukhin.com/'
export const LINKEDIN_URL = 'https://www.linkedin.com/in/ethan-solodukhin/'
export const STUDIO_INSTAGRAM_URL = 'https://www.instagram.com/solsevenstudios/'
export const PERSONAL_INSTAGRAM_URL = 'https://www.instagram.com/ethansolodukhin/'

export const WIX_SHOP_URL = 'https://www.solsevenstudios.com/shop'
export const SOL_LAMP_BUY_URL = WIX_SHOP_URL
export const S01_LAMP_BUY_URL = 'https://www.solsevenstudios.com/product-page/s01'
export const S02_LAMP_BUY_URL = 'https://www.solsevenstudios.com/product-page/s02'
export const S03_LAMP_BUY_URL = 'https://www.solsevenstudios.com/product-page/s03'
export const S04_LAMP_BUY_URL = 'https://www.solsevenstudios.com/product-page/s04'
export const S01_SHADE_BUY_URL = 'https://www.solsevenstudios.com/product-page/s01-shade'
export const S02_SHADE_BUY_URL = 'https://www.solsevenstudios.com/product-page/s02-shade'
export const S03_SHADE_BUY_URL = 'https://www.solsevenstudios.com/product-page/s03-shade'
export const S04_SHADE_BUY_URL = 'https://www.solsevenstudios.com/product-page/s04-shade'
export const SOL_PLANTER_BUY_URL = 'https://www.solsevenstudios.com/product-page/s0l-planter'
export const SOL_COMBO_BUY_URL = 'https://www.solsevenstudios.com/product-page/s0-combo'
export const ORIGINAL_SOL_COLLECTION_URL = WIX_SHOP_URL
export const CUSTOM_ICFF_INQUIRY_URL = '#contact'

export const DISCOUNT_CODE = 'ICFFSOL15%'
export const LEAD_CAPTURE_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbzbsyq90MK4_5MCOmCVn_YZ901hioj16a0EepEEnRvd5KqrFD07ATe-XkR81t4FaySE/exec'
export const LEAD_CAPTURE_SHEET_NAME = 'ICFF Contact List'
export const LEAD_CAPTURE_FORM_NAME = 'Sol Seven ICFF Link Hub'
export const LOCAL_LEADS_STORAGE_KEY = 'solseven_linkhub_leads'

const assetPath = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
const shopImage = (name) => assetPath(`assets/shop/${name}`)

const linkCards = [
  {
    title: 'Sol Seven Studios',
    description: 'Modular lighting, product systems, and circular design.',
    cta: 'Visit Studio',
    href: SOL_SEVEN_CONFIGURATOR_URL,
    icon: Globe2,
  },
  {
    title: 'PlastiVista',
    description: 'Circular production, material reuse, and product design research.',
    cta: 'Explore PlastiVista',
    href: PLASTIVISTA_URL,
    icon: Blocks,
  },
  {
    title: "Ethan's Portfolio",
    description: 'Selected product, industrial, brand, and systems design work.',
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
    title: 'Sol Seven Studios Instagram',
    description: 'Studio process, launches, product moments, and visual updates from Sol Seven Studios.',
    cta: 'Follow',
    href: STUDIO_INSTAGRAM_URL,
    icon: Camera,
  },
  {
    title: "Ethan's Instagram",
    description: 'Personal design process, product experiments, studio work, and behind-the-scenes updates.',
    cta: 'Follow',
    href: PERSONAL_INSTAGRAM_URL,
    icon: Camera,
  },
]

const lampCards = [
  {
    title: 'S01',
    category: 'Table Light',
    price: '$70.00',
    image: shopImage('s01.png'),
    description: 'A sculptural modular table lamp with customizable RGB illumination.',
    cta: 'Buy Now',
    href: S01_LAMP_BUY_URL,
  },
  {
    title: 'S02',
    category: 'Table Light',
    price: '$70.00',
    image: shopImage('s02.png'),
    description: 'A minimal, versatile table lamp for broad ambient lighting and daily color control.',
    cta: 'Buy Now',
    href: S02_LAMP_BUY_URL,
  },
  {
    title: 'S03',
    category: 'Table Light',
    price: '$70.00',
    image: shopImage('s03.png'),
    description: 'A warm organic lamp profile with a refined, inviting silhouette.',
    cta: 'Buy Now',
    href: S03_LAMP_BUY_URL,
  },
  {
    title: 'S04',
    category: 'Table Light',
    price: '$70.00',
    image: shopImage('s04.png'),
    description: 'A sharper geometric SOL profile with layered visual rhythm.',
    cta: 'Buy Now',
    href: S04_LAMP_BUY_URL,
  },
  {
    title: 'S01 Shade',
    category: 'Shade',
    price: '$15.00',
    image: shopImage('s01-shade.png'),
    description: 'The foundational stackable shade for the S0 modular system.',
    cta: 'Buy Now',
    href: S01_SHADE_BUY_URL,
  },
  {
    title: 'S02 Shade',
    category: 'Shade',
    price: '$15.00',
    image: shopImage('s02-shade.png'),
    description: 'A soft curved shade for diffuse, ambient lighting and calm visual weight.',
    cta: 'Buy Now',
    href: S02_SHADE_BUY_URL,
  },
  {
    title: 'S03 Shade',
    category: 'Shade',
    price: '$15.00',
    image: shopImage('s03-shade.png'),
    description: 'A wide dome shade that creates warm, even light and sculptural volume.',
    cta: 'Buy Now',
    href: S03_SHADE_BUY_URL,
  },
  {
    title: 'S04 Shade',
    category: 'Shade',
    price: '$15.00',
    image: shopImage('s04-shade.png'),
    description: 'A bold geometric shade for stacked visual depth and interlocking expression.',
    cta: 'Buy Now',
    href: S04_SHADE_BUY_URL,
  },
  {
    title: 'S0L Planter',
    category: 'Add-On',
    price: '$25.00',
    image: shopImage('s0l-planter.png'),
    description: 'A modular planter add-on that turns unused shades into functional decor.',
    cta: 'Buy Now',
    href: SOL_PLANTER_BUY_URL,
  },
  {
    title: 'S0L Combo',
    category: 'Bundle',
    price: '$195.00 sale',
    compareAt: '$210.00 regular',
    image: shopImage('s0l-combo.png'),
    description: 'The full modular lighting bundle with S01, S02, S03, bulbs, clips, and extra shades.',
    cta: 'Buy Now',
    href: SOL_COMBO_BUY_URL,
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
    'target_sheet',
    'form_name',
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
    entry.sheetName,
    entry.formName,
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
        title="Link pending"
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
        <span className="link-status">{isPlaceholderUrl(card.href) ? 'Pending' : 'External'}</span>
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
  return (
    <article className="lamp-card reveal-card" style={{ '--delay': `${index * 70}ms` }}>
      <div className="lamp-card-visual">
        <img src={lamp.image} alt={`${lamp.title} product image`} loading="lazy" />
      </div>
      <div>
        <p className="lamp-index">{String(index + 1).padStart(2, '0')}</p>
        <div className="lamp-card-meta">
          <span>{lamp.category}</span>
          <strong>
            {lamp.compareAt && <em>{lamp.compareAt}</em>}
            {lamp.price}
          </strong>
        </div>
        <h3>{lamp.title}</h3>
        <p>{lamp.description}</p>
      </div>
      <ExternalAction href={lamp.href} className="card-action buy-action">
        {lamp.cta}
      </ExternalAction>
    </article>
  )
}

function LampInquiryBand() {
  return (
    <div className="lamp-inquiry-band">
      <div>
        <span>Custom / ICFF Inquiry</span>
        <h3>Need wholesale, press, custom orders, or ICFF follow-up?</h3>
        <p>For wholesale, press, custom work, and ICFF conversations.</p>
      </div>
      <InternalAction href={CUSTOM_ICFF_INQUIRY_URL} className="card-action inquiry-action">
        Start an Inquiry
      </InternalAction>
    </div>
  )
}

function DiscountModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return undefined

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="discount-modal-backdrop" onMouseDown={onClose}>
      <div
        className="discount-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="discount-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h3 id="discount-modal-title">You're in</h3>
        <p>Use code {DISCOUNT_CODE} for 10% off your first SOL Lamp.</p>
        <div className="discount-modal-actions">
          <a className="primary-action" href={SOL_SEVEN_CONFIGURATOR_URL}>
            Start Building
            <ArrowRight size={16} strokeWidth={2.2} />
          </a>
          <button className="secondary-action" type="button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

function LeadForm() {
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [errors, setErrors] = useState({})
  const [hasLocalLeads, setHasLocalLeads] = useState(() => safeLocalRead().length > 0)
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false)
  const recentSignature = useRef(null)

  const submitLabel = useMemo(() => {
    if (status.type === 'submitting') return 'Sending...'
    return 'Send Message'
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
      sheetName: LEAD_CAPTURE_SHEET_NAME,
      targetSheet: LEAD_CAPTURE_SHEET_NAME,
      formName: LEAD_CAPTURE_FORM_NAME,
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

    const submittedAt = new Date().toISOString()
    const entry = {
      ...payload,
      timestamp: submittedAt,
      submittedAt,
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
      setStatus({ type: 'idle', message: '' })
      setIsDiscountModalOpen(true)
    } catch {
      setStatus({
        type: 'error',
        message: 'The browser could not save this submission. Please try again or use a direct contact link.',
      })
    }
  }

  return (
    <>
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
          <textarea name="message" rows="5" placeholder="Tell me what you have in mind." />
          {errors.message && <small>{errors.message}</small>}
        </label>

        {status.type === 'error' && <div className="form-alert">{status.message}</div>}

        <div className="form-footer">
          <p>Your info stays private.</p>
          <div className="form-actions">
            {hasLocalLeads && (
              <button className="secondary-action" type="button" onClick={exportLeadsCsv}>
                <Download size={16} strokeWidth={2.1} />
                Download contacts
              </button>
            )}
            <div className="submit-stack">
              <span className="signup-offer">Get 10% off when you sign up</span>
              <button className="primary-action" type="submit" disabled={status.type === 'submitting'}>
                <Send size={16} strokeWidth={2.1} />
                {submitLabel}
              </button>
            </div>
          </div>
        </div>
      </form>
      <DiscountModal isOpen={isDiscountModalOpen} onClose={() => setIsDiscountModalOpen(false)} />
    </>
  )
}

function App() {
  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand-lockup" href={SOL_SEVEN_CONFIGURATOR_URL} aria-label="Sol Seven Studios configurator">
          <img src={assetPath('assets/brand/sol-seven-mark.png')} alt="" />
          <span>
            <strong>Sol Seven Studios</strong>
            <small>Product systems</small>
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
            <h1 id="hero-title">Sol Seven Studios</h1>
            <p>Modular lighting, circular production, and product design.</p>
            <p className="patent-note">Patent Pending</p>
            <div className="hero-actions" aria-label="Primary actions">
              <ExternalAction href={SOL_LAMP_BUY_URL} className="primary-action">
                <ShoppingBag size={17} strokeWidth={2.2} />
                Shop SOL Lamps
              </ExternalAction>
              <InternalAction href="#contact" className="secondary-action">
                <Mail size={17} strokeWidth={2.2} />
                Get in Touch
              </InternalAction>
              <ExternalAction href={PERSONAL_PORTFOLIO_URL} className="ghost-action">
                View Portfolio
              </ExternalAction>
            </div>
          </div>

          <div className="hero-product" aria-label="SOL lamp collection preview">
            <div className="product-glass">
              <img src={shopImage('s0l-stack.png')} alt="Stacked SOL lamp system product render" />
              <div className="product-caption">
                <span>Original SOL Collection</span>
                <strong>Shop the collection</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="link-hub section-pad" id="links" aria-labelledby="links-title">
          <SectionIntro label="Links" title="Sol Seven Studios">
            Lighting systems and circular product design.
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
              <SectionIntro label="SOL Lamp System" title="Build your setup." />
              <div className="funnel-steps" aria-label="SOL lamp setup">
                <span>Explore SOL</span>
                <ChevronRight size={18} />
                <span>Choose a lamp</span>
                <ChevronRight size={18} />
                <span>Add-ons</span>
                <ChevronRight size={18} />
                <span>Finish your setup</span>
              </div>
            </div>
            <div className="funnel-image">
              <img src={shopImage('s0l-combo.png')} alt="S0L Combo product image" />
            </div>
          </div>

          <div className="lamp-grid">
            {lampCards.map((lamp, index) => (
              <LampCard lamp={lamp} index={index} key={lamp.title} />
            ))}
          </div>
          <LampInquiryBand />
        </section>

        <section className="contact-section section-pad" id="contact" aria-labelledby="contact-title">
          <div className="contact-copy">
            <h2 id="contact-title">Get in touch</h2>
            <p>For orders, collaborations, or questions.</p>
          </div>
          <LeadForm />
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <strong>Sol Seven Studios</strong>
          <p>Modular lighting and circular product design.</p>
          <p className="footer-legal">&copy; Sol Seven Studios. Patent Pending.</p>
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
          <ExternalAction href={STUDIO_INSTAGRAM_URL} iconOnly>
            Studio Instagram
          </ExternalAction>
          <ExternalAction href={PERSONAL_INSTAGRAM_URL} iconOnly>
            Ethan Instagram
          </ExternalAction>
        </nav>
      </footer>
    </div>
  )
}

export default App
