import type { PublicBookingSettings } from '@nezcc/cms/bookings/bookingSettingsService'
import { formatPolicyDate } from '@nezcc/cms/bookings/bookingSettingsService'

type BookingConsentFieldsProps = {
  settings: PublicBookingSettings
}

export function BookingConsentFields({ settings }: BookingConsentFieldsProps) {
  return (
    <fieldset className="space-y-stack-sm rounded border border-outline-variant bg-surface-container-lowest p-stack-md">
      <legend className="font-serif font-medium text-headline-md text-on-surface">Consent</legend>
      <p className="font-body-md text-sm text-on-surface-variant">
        Policy version {settings.policyVersion}, effective {formatPolicyDate(settings.policyDate)}
      </p>

      <input name="acceptedPolicyVersion" type="hidden" value={settings.policyVersion} />
      <input name="acceptedPolicyDate" type="hidden" value={settings.policyDate} />

      <label className="flex items-start gap-3 font-body-md text-body-md text-on-surface">
        <input className="mt-1 h-4 w-4 shrink-0 accent-primary" name="termsAccepted" required type="checkbox" value="true" />
        <span>I accept the NEZCC booking terms and conditions.</span>
      </label>

      <label className="flex items-start gap-3 font-body-md text-body-md text-on-surface">
        <input className="mt-1 h-4 w-4 shrink-0 accent-primary" name="privacyAccepted" required type="checkbox" value="true" />
        <span>I accept the privacy notice for use of my booking request information.</span>
      </label>
    </fieldset>
  )
}
