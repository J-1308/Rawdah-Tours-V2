// Shared between the booking server action and the booking form.

export type BookingValues = {
  roomId: string
  fullName: string
  email: string
  phone: string
  gender: string
  age: string
  citizenship: string
  emergencyContactName: string
  emergencyContactPhone: string
  medicalInfo: string
  paymentMethod: 'card' | 'bank_transfer'
  accurate: boolean
  terms: boolean
}

export type BookingErrors = Partial<Record<keyof BookingValues, string>>

export type BookingState =
  | { status: 'idle'; key: number }
  | { status: 'invalid'; key: number; errors: BookingErrors; values: BookingValues }
  | { status: 'blocked'; key: number; message: string; values: BookingValues }
  | { status: 'unavailable'; key: number; message: string; values: BookingValues }
