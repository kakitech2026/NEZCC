'use client';

import React, { useState, type CSSProperties } from 'react';

export type AnnouncementMarqueeItem = {
  id?: string | null;
  text?: string | null;
  isActive?: boolean | null;
  linkLabel?: string | null;
  linkUrl?: string | null;
};

export type UrgentNoticeProps = {
  enabled?: boolean | null;
  label?: string | null;
  announcements?: AnnouncementMarqueeItem[] | null;
};

function getSafeHref(value?: string | null) {
  const href = value?.trim();
  if (!href) return null;
  if (href.startsWith('/') && !href.startsWith('//')) return href;

  try {
    const url = new URL(href);
    return url.protocol === 'http:' || url.protocol === 'https:' ? href : null;
  } catch {
    return null;
  }
}

export default function UrgentNotice({
  enabled = true,
  label = 'Notice:',
  announcements = [],
}: UrgentNoticeProps) {
  const [isPaused, setIsPaused] = useState(false);
  const activeAnnouncements = announcements.filter(
    (item) => item.isActive !== false && Boolean(item.text?.trim()),
  ).map((item) => ({
    ...item,
    text: item.text?.trim() ?? '',
  }));

  if (!enabled || activeAnnouncements.length === 0) return null;

  const announcementLength = activeAnnouncements.reduce(
    (total, item) => total + item.text.length + (item.linkUrl ? (item.linkLabel?.length ?? 8) : 0),
    0,
  );
  const duration = Math.min(90, Math.max(22, Math.round(announcementLength * 0.45)));
  const trackStyle = {
    '--urgent-notice-duration': duration + 's',
  } as CSSProperties;
  const visibleLabel = label?.trim();

  const renderCopy = (isDuplicate: boolean) => (
    <div
      className={'urgent-notice__copy' + (isDuplicate ? ' urgent-notice__copy--duplicate' : '')}
      aria-hidden={isDuplicate ? true : undefined}
    >
      {activeAnnouncements.map((item, index) => {
        const href = getSafeHref(item.linkUrl);
        const linkLabel = item.linkLabel?.trim() || 'Read More';

        return (
          <div
            className="urgent-notice__item"
            key={(isDuplicate ? 'duplicate-' : 'primary-') + (item.id ?? index)}
          >
            <span className="urgent-notice__message">{item.text}</span>
            {href && (
              isDuplicate ? (
                <span className="urgent-notice__link">{linkLabel}</span>
              ) : (
                <a className="urgent-notice__link" href={href}>
                  {linkLabel}
                </a>
              )
            )}
            <span aria-hidden="true" className="urgent-notice__separator">•</span>
          </div>
        );
      })}
    </div>
  );

  return (
    <section aria-label="Announcements" aria-live="off" className="urgent-notice">
      <div className="urgent-notice__content max-w-container-max-width mx-auto px-4 md:px-8 py-2 md:py-2.5">
        <span aria-hidden="true" className="urgent-notice__icon material-symbols-outlined">
          campaign
        </span>
        {visibleLabel && <strong className="urgent-notice__label">{visibleLabel}</strong>}
        <div className="urgent-notice__viewport">
          <div
            className={'urgent-notice__track' + (isPaused ? ' urgent-notice__track--paused' : '')}
            style={trackStyle}
          >
            {renderCopy(false)}
            {renderCopy(true)}
          </div>
        </div>
        <button
          aria-label={isPaused ? 'Resume announcement scrolling' : 'Pause announcement scrolling'}
          aria-pressed={isPaused}
          className="urgent-notice__pause"
          onClick={() => setIsPaused((paused) => !paused)}
          type="button"
        >
          <span aria-hidden="true" className="material-symbols-outlined">
            {isPaused ? 'play_arrow' : 'pause'}
          </span>
        </button>
      </div>
    </section>
  );
}
