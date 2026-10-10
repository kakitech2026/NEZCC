import type { PublicBookingSettings } from '@nezcc/cms/bookings/bookingSettingsService'
import { formatPolicyDate } from '@nezcc/cms/bookings/bookingSettingsService'

type BookingPolicySummaryProps = {
  settings: PublicBookingSettings
}

const PolicyBlock = ({ children, title }: { children?: string; title: string }) => {
  if (!children) return null

  return (
    <section className="rounded border border-outline-variant bg-white p-3">
      <h3 className="font-label-md text-label-md text-on-surface">{title}</h3>
      <p className="mt-1 font-body-md text-sm leading-relaxed text-on-surface-variant whitespace-pre-wrap">{children}</p>
    </section>
  )
}

export function BookingPolicySummary({ settings }: BookingPolicySummaryProps) {
  return (
    <div className="space-y-stack-sm" id="booking-policy">
      <div className="rounded border border-outline-variant bg-surface-container-low p-3">
        <div className="flex items-start gap-2">
          <span className="material-symbols-outlined text-[20px] text-primary" aria-hidden="true">policy</span>
          <div>
            <h2 className="font-serif font-medium text-headline-md text-on-surface">Booking Policy</h2>
            <p className="mt-1 font-body-md text-sm leading-relaxed text-on-surface-variant">{settings.publicBookingNotice}</p>
            <p className="mt-2 font-caption text-caption text-on-surface-variant">
              Policy version {settings.policyVersion}, effective {formatPolicyDate(settings.policyDate)}
            </p>
          </div>
        </div>
      </div>

      <PolicyBlock title="Terms and Conditions">{settings.termsAndConditions}</PolicyBlock>
      <PolicyBlock title="Privacy Notice">{settings.privacyNotice}</PolicyBlock>
      <PolicyBlock title="Cancellation Policy">{settings.cancellationPolicy}</PolicyBlock>
      <PolicyBlock title="Payment and Refund Policy">{settings.paymentRefundPolicy}</PolicyBlock>

      {(settings.bookingSupportEmail || settings.bookingSupportPhone) && (
        <section className="rounded border border-outline-variant bg-white p-3">
          <h3 className="font-label-md text-label-md text-on-surface">Booking Support</h3>
          <div className="mt-2 space-y-1 font-body-md text-sm text-on-surface-variant">
            {settings.bookingSupportEmail && (
              <a className="block text-primary hover:underline" href={`mailto:${settings.bookingSupportEmail}`}>{settings.bookingSupportEmail}</a>
            )}
            {settings.bookingSupportPhone && <p>{settings.bookingSupportPhone}</p>}
          </div>
        </section>
      )}
    </div>
  )
}
