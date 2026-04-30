'use client';

import { useState } from 'react';
import { useSmartSearch } from '@/hooks/useSmartSearch';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function SmartSearch() {
  const [query, setQuery] = useState('');
  const { search, loading, results, error } = useSmartSearch();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim().length > 2) {
      search(query);
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search patient records..."
          className="flex-1"
        />
        <Button
          type="submit"
          disabled={loading}
          size="icon"
        >
          <Search className="w-4 h-4" />
        </Button>
      </form>

      {error && <p className="text-xs text-destructive">{error}</p>}

      {results.length > 0 && (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {results.map((r) => (
            <Card key={r.id}>
              <CardContent className="p-3">
                <p className="text-sm font-medium text-foreground">{r.patient.user.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{r.diagnosis}</p>
                <p className="text-[10px] text-muted-foreground mt-1">
                  {new Date(r.recordedAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
