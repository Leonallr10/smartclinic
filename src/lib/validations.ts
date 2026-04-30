import { z } from 'zod';

export const symptomCheckSchema = z.object({
  symptoms: z
    .string()
    .min(10, 'Please describe your symptoms in more detail')
    .max(1000, 'Too long'),
});

export const appointmentCreateSchema = z.object({
  doctorId: z.string().uuid(),
  scheduledAt: z.string().refine((d) => new Date(d) > new Date(), {
    message: 'Appointment must be in the future',
  }),
  durationMins: z.number().min(15).max(120).optional().default(30),
  notes: z.string().max(500).optional(),
});

export const appointmentUpdateSchema = z.object({
  status: z.enum(['CONFIRMED', 'COMPLETED', 'CANCELLED']).optional(),
  scheduledAt: z.string().optional(),
  notes: z.string().max(500).optional(),
});

export const patientProfileSchema = z.object({
  phone: z.string().max(20).optional(),
  dateOfBirth: z.string().optional(),
  bloodGroup: z.string().max(5).optional(),
  address: z.string().max(300).optional(),
});

export const doctorProfileSchema = z.object({
  specialisation: z.string().max(100).optional(),
  licenseNumber: z.string().max(50).optional(),
  experienceYears: z.number().min(0).max(60).optional(),
  bio: z.string().max(500).optional(),
  isAvailable: z.boolean().optional(),
});
