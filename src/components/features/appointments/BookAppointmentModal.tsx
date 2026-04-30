'use client';

import { useEffect, useState } from 'react';
import { useDoctors, useBookAppointment } from '@/hooks/useAppointments';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface Props {
  open: boolean;
  onClose: () => void;
  suggestedSpecialisation?: string;
}

export default function BookAppointmentModal({ open, onClose, suggestedSpecialisation }: Props) {
  const { doctors, loading: loadingDoctors, fetchDoctors } = useDoctors();
  const { book, loading, error } = useBookAppointment();
  const router = useRouter();

  const [doctorId, setDoctorId] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (open) {
      fetchDoctors();
    }
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = await book({ doctorId, scheduledAt, notes: notes || undefined });
    if (result) {
      toast.success('Appointment booked successfully!');
      onClose();
      setDoctorId('');
      setScheduledAt('');
      setNotes('');
      router.refresh();
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
        </DialogHeader>

        {suggestedSpecialisation && (
          <div className="px-3 py-2 bg-purple-50 border border-purple-100 rounded-lg">
            <p className="text-xs text-purple-700">
              <span className="font-semibold">AI Suggestion:</span> {suggestedSpecialisation}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Select Doctor</Label>
            {loadingDoctors ? (
              <p className="text-sm text-muted-foreground">Loading doctors...</p>
            ) : (
              <Select value={doctorId} onValueChange={setDoctorId} required>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a doctor" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((d) => (
                    <SelectItem key={d.id} value={d.id}>
                      Dr. {d.user.name} {d.specialisation ? `— ${d.specialisation}` : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="space-y-2">
            <Label>Date & Time</Label>
            <Input
              type="datetime-local"
              required
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>

          <div className="space-y-2">
            <Label>Notes (optional)</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Describe your symptoms or reason for visit..."
            />
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Booking...' : 'Confirm Booking'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
