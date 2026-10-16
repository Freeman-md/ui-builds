import { useEffect, useRef, type FormEvent } from 'react'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Textarea } from '@/components/ui/Textarea'
import type { BookingDetailsErrors, BookingDetailsValues } from '../hooks/use-booking-flow'

type BookingDetailsProps = {
  values: BookingDetailsValues
  errors: BookingDetailsErrors
  onChange: (field: keyof BookingDetailsValues, value: string) => void
  onSubmit: (emailIsValid: boolean) => 'name' | 'email' | null
  isBooking: boolean
  bookingError: string | null
}

export function BookingDetails({ values, errors, onChange, onSubmit, isBooking, bookingError }: BookingDetailsProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  useEffect(() => { headingRef.current?.focus() }, [])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const email = form.elements.namedItem('email') as HTMLInputElement
    const invalidField = onSubmit(email.validity.valid)
    if (invalidField) (form.elements.namedItem(invalidField) as HTMLInputElement).focus()
  }

  return (
    <form className="booking-details-form" id="booking-details-form" noValidate onSubmit={handleSubmit} aria-labelledby="booking-details-heading" aria-busy={isBooking}>
      <h1 id="booking-details-heading" ref={headingRef} tabIndex={-1}>Your details</h1>
      <p className="booking-details-intro">A little context for our 30-minute project discussion. Required fields are marked *.</p>
      <fieldset className="booking-details-fields" disabled={isBooking}>
        <div className="booking-field">
          <Label htmlFor="booking-name">Name *</Label>
          <Input id="booking-name" name="name" autoComplete="name" required value={values.name} onChange={(event) => onChange('name', event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'booking-name-error' : undefined} />
          {errors.name ? <p className="booking-field-error" id="booking-name-error" role="alert">{errors.name}</p> : null}
        </div>
        <div className="booking-field">
          <Label htmlFor="booking-email">Email *</Label>
          <Input id="booking-email" name="email" type="email" autoComplete="email" required value={values.email} onChange={(event) => onChange('email', event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'booking-email-error' : undefined} />
          {errors.email ? <p className="booking-field-error" id="booking-email-error" role="alert">{errors.email}</p> : null}
        </div>
        <div className="booking-field">
          <Label htmlFor="booking-note">Project note <span className="booking-optional">(optional)</span></Label>
          <Textarea id="booking-note" name="note" rows={3} value={values.note} onChange={(event) => onChange('note', event.target.value)} placeholder="What would you like to discuss?" />
        </div>
      </fieldset>
      {isBooking ? <p className="booking-details-notice" role="status">Confirming your demo booking…</p> : null}
      {bookingError ? <p className="booking-field-error" role="alert">{bookingError}</p> : null}
    </form>
  )
}
