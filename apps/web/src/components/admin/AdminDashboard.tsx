import React from 'react'

const quickActions = [
  {
    title: 'Create news update',
    description: 'Publish announcements, press notes, and public updates.',
    href: '/admin/collections/news/create',
    badge: 'News',
  },
  {
    title: 'Add event',
    description: 'Schedule upcoming cultural programs and activities.',
    href: '/admin/collections/events/create',
    badge: 'Event',
  },
  {
    title: 'Upload media',
    description: 'Manage photos, documents, and reusable uploads.',
    href: '/admin/collections/media/create',
    badge: 'Media',
  },
  {
    title: 'Post tender',
    description: 'Create advertisements, tender notices, and documents.',
    href: '/admin/collections/tenders/create',
    badge: 'Tender',
  },
]

const contentSections = [
  {
    title: 'Content & Updates',
    description: 'News, activities, events, and campaigns for the public site.',
    links: [
      { label: 'News', href: '/admin/collections/news' },
      { label: 'Newsletter Editions', href: '/admin/collections/newsletter-editions' },
      { label: 'Events', href: '/admin/collections/events' },
      { label: 'Activities', href: '/admin/collections/activities' },
      { label: 'Campaigns', href: '/admin/collections/campaigns' },
      { label: 'Member States', href: '/admin/collections/member-states' },
    ],
  },
  {
    title: 'Documents & Notices',
    description: 'Tender notices, categories, and annual report records.',
    links: [
      { label: 'Tenders', href: '/admin/collections/tenders' },
      { label: 'Tender Categories', href: '/admin/collections/tender-categories' },
      { label: 'Annual Reports', href: '/admin/collections/annual-reports' },
    ],
  },
  {
    title: 'Media & Resources',
    description: 'Reusable uploads and gallery albums for the website.',
    links: [
      { label: 'Media Library', href: '/admin/collections/media' },
      { label: 'Galleries', href: '/admin/collections/gallery' },
      { label: 'Library Resources', href: '/admin/collections/library-resources' },
      { label: 'Library Categories', href: '/admin/collections/library-categories' },
    ],
  },
  {
    title: 'Inbox',
    description: 'Visitor messages and newsletter subscriber requests.',
    links: [
      { label: 'Contact Submissions', href: '/admin/collections/contact-submissions' },
      { label: 'Newsletter Subscribers', href: '/admin/collections/newsletter-subscribers' },
      { label: 'Feedback Submissions', href: '/admin/collections/feedback-submissions' },
    ],
  },
  {
    title: 'Site Pages',
    description: 'Edit homepage and listing-page content shown to visitors.',
    links: [
      { label: 'Home Page', href: '/admin/globals/home-page' },
      { label: 'Events Page', href: '/admin/globals/events-page' },
      { label: 'Tenders Page', href: '/admin/globals/tenders-page' },
      { label: 'Annual Reports Page', href: '/admin/globals/annual-reports-page' },
      { label: 'RTI Page', href: '/admin/globals/rti-page' },
      { label: 'Leadership & Team Page', href: '/admin/globals/leadership-page' },
      { label: 'Library Page', href: '/admin/globals/library-page' },
      { label: 'Newsletter Page', href: '/admin/globals/newsletter-page' },
    ],
  },
]

const overview = [
  { value: '16', label: 'collections', detail: 'structured content areas' },
  { value: '8', label: 'site pages', detail: 'editable page settings' },
  { value: '3', label: 'workflows', detail: 'publish, media, documents' },
]

export const AdminDashboard: React.FC = () => {
  return (
    <main className="nezcc-dashboard">
      <section className="nezcc-dashboard__hero">
        <div>
          <p className="nezcc-dashboard__eyebrow">NEZCC Content Management</p>
          <h1>Admin Dashboard</h1>
          <p className="nezcc-dashboard__intro">
            Manage public website content, media, tenders, reports, and page settings from one organized workspace.
          </p>
        </div>

        <div className="nezcc-dashboard__hero-actions" aria-label="Primary admin actions">
          <a className="nezcc-button nezcc-button--primary" href="/admin/collections/news/create">
            New update
          </a>
          <a className="nezcc-button nezcc-button--secondary" href="/">
            View site
          </a>
        </div>
      </section>

      <section className="nezcc-dashboard__overview" aria-label="Admin overview">
        {overview.map((item) => (
          <article className="nezcc-dashboard__metric" key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
            <small>{item.detail}</small>
          </article>
        ))}
      </section>

      <section className="nezcc-dashboard__section">
        <div className="nezcc-dashboard__section-heading">
          <h2>Quick Actions</h2>
          <p>Start the most common publishing tasks directly.</p>
        </div>

        <div className="nezcc-dashboard__quick-grid">
          {quickActions.map((action) => (
            <a className="nezcc-dashboard__action-card" href={action.href} key={action.href}>
              <span>{action.badge}</span>
              <strong>{action.title}</strong>
              <p>{action.description}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="nezcc-dashboard__section">
        <div className="nezcc-dashboard__section-heading">
          <h2>Workspace</h2>
          <p>Content is grouped by how the NEZCC team actually maintains the site.</p>
        </div>

        <div className="nezcc-dashboard__workspace-grid">
          {contentSections.map((section) => (
            <article className="nezcc-dashboard__workspace-card" key={section.title}>
              <div>
                <h3>{section.title}</h3>
                <p>{section.description}</p>
              </div>

              <div className="nezcc-dashboard__links">
                {section.links.map((link) => (
                  <a href={link.href} key={link.href}>
                    {link.label}
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
