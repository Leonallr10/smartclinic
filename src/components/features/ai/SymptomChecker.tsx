'use client';

import { useState } from 'react';
import { useSymptomCheck } from '@/hooks/useSymptomCheck';
import BookAppointmentModal from '@/components/features/appointments/BookAppointmentModal';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

const urgencyStyles = {
  LOW:       'border-green-200 bg-green-50 text-green-800',
  MEDIUM:    'border-amber-200 bg-amber-50 text-amber-800',
  HIGH:      'border-orange-200 bg-orange-50 text-orange-800',
  EMERGENCY: 'border-red-200 bg-red-50 text-red-800',
};

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState('');
  const [bookOpen, setBookOpen] = useState(false);
  const { check, loading, result, error } = useSymptomCheck();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="space-y-3">
        <Label>Describe your symptoms</Label>
        <Textarea
          className="h-28 resize-none"
          placeholder="e.g. I have a persistent headache for 2 days, mild fever, and sore throat..."
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        />
        <Button
          onClick={() => check(symptoms)}
          disabled={loading || symptoms.length < 10}
          className="w-full"
        >
          {loading ? 'Analysing...' : 'Check symptoms'}
        </Button>
      </div>

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      {result && (
        <div className="space-y-4">
          <div className={`rounded-lg border px-4 py-3 text-sm font-medium ${urgencyStyles[result.urgency]}`}>
            Urgency: {result.urgency} — {result.suggestion}
          </div>

          {result.possibleConditions.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase mb-2">
                Possible conditions
              </p>
              <div className="flex flex-wrap gap-2">
                {result.possibleConditions.map((c) => (
                  <Badge key={c} variant="secondary" className="bg-purple-50 text-purple-700 border-purple-100">
                    {c}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {result.redFlags.length > 0 && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <p className="font-medium mb-1">Red flags — seek care immediately if:</p>
                <ul className="list-disc list-inside text-xs space-y-0.5">
                  {result.redFlags.map((f) => <li key={f}>{f}</li>)}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {result.selfCare.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Self-care tips</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                {result.selfCare.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
          )}

          <Button
            onClick={() => setBookOpen(true)}
            variant="outline"
            className="w-full"
          >
            Book an appointment based on this result
          </Button>
        </div>
      )}

      <BookAppointmentModal
        open={bookOpen}
        onClose={() => setBookOpen(false)}
        suggestedSpecialisation={result?.suggestion}
      />
    </div>
  );
}
