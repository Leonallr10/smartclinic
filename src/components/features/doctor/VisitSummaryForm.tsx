'use client';

import { useState } from 'react';
import { useVisitSummary } from '@/hooks/useVisitSummary';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
  patientId: string;
  appointmentId: string;
  patientName: string;
  onRecordCreated: (recordId: string) => void;
}

export default function VisitSummaryForm({ patientId, appointmentId, patientName, onRecordCreated }: Props) {
  const [diagnosis, setDiagnosis] = useState('');
  const [notes, setNotes] = useState('');
  const { generate, loading, result, error } = useVisitSummary();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await generate({
      patientId,
      appointmentId,
      doctorNotes: notes,
      diagnosis,
    });
    if (res) {
      toast.success('Visit summary generated');
      onRecordCreated(res.recordId);
    }
  }

  if (result) {
    return (
      <div className="space-y-4">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <p className="text-sm font-medium text-green-800 mb-2">AI-Generated Visit Summary</p>
            <p className="text-sm text-green-700 whitespace-pre-wrap">{result.summary}</p>
          </CardContent>
        </Card>
        {result.keyTakeaways && result.keyTakeaways.length > 0 && (
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Key Takeaways</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              {result.keyTakeaways.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-sm text-muted-foreground">Patient: <span className="font-medium text-foreground">{patientName}</span></p>

      <div className="space-y-2">
        <Label>Diagnosis</Label>
        <Input
          type="text"
          required
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          placeholder="e.g. Upper respiratory tract infection"
        />
      </div>

      <div className="space-y-2">
        <Label>Visit Notes</Label>
        <Textarea
          required
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          placeholder="Patient presented with... Examination findings..."
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Generating Summary...' : 'Generate Visit Summary'}
      </Button>
    </form>
  );
}
