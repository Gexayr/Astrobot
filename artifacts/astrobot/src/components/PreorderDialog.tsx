import React, { useState } from 'react';
import { useCreatePreorder } from '@workspace/api-client-react';
import { track } from '@/lib/analytics';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'wouter';

const inputCls =
  'w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-primary/60';

export const PreorderDialog = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [doneId, setDoneId] = useState<number | null>(null);
  const mutation = useCreatePreorder();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const str = (k: string) => String(f.get(k) ?? '').trim() || undefined;
    mutation.mutate(
      {
        data: {
          name: str('name') ?? '',
          email: str('email') ?? '',
          phone: str('phone'),
          country: str('country'),
          quantity: Number(f.get('quantity') ?? 1),
          comment: str('comment'),
        },
      },
      {
        onSuccess: (res) => {
          setDoneId(res.id);
          track('preorder-submitted', true);
        },
      },
    );
  };

  const onOpenChange = (v: boolean) => {
    setOpen(v);
    if (!v) {
      setDoneId(null);
      mutation.reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-background border-white/10 sm:max-w-md">
        {doneId ? (
          <div className="text-center py-6">
            <CheckCircle2 className="w-14 h-14 text-primary mx-auto mb-4" />
            <DialogTitle className="text-2xl font-display mb-2">You're on the list!</DialogTitle>
            <DialogDescription>
              Reservation #{doneId} confirmed. We'll email you before shipping with payment details.
            </DialogDescription>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-display">Reserve your AstroBot</DialogTitle>
              <DialogDescription>
                Early Bird price $199. No payment now, we'll contact you before shipping.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={onSubmit} className="space-y-3 mt-2">
              <input name="name" required maxLength={120} placeholder="Full name" className={inputCls} autoComplete="name" />
              <input name="email" type="email" required maxLength={254} placeholder="Email" className={inputCls} autoComplete="email" />
              <div className="grid grid-cols-2 gap-3">
                <input name="phone" maxLength={40} placeholder="Phone (optional)" className={inputCls} autoComplete="tel" />
                <input name="country" maxLength={80} placeholder="Country" className={inputCls} autoComplete="country-name" />
              </div>
              <label className="flex items-center justify-between gap-3 text-sm text-white/70">
                Quantity
                <select name="quantity" defaultValue="1" className={`${inputCls} w-24`}>
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i + 1} value={i + 1} className="bg-background">
                      {i + 1}
                    </option>
                  ))}
                </select>
              </label>
              <textarea name="comment" maxLength={1000} rows={3} placeholder="Comment (optional)" className={inputCls} />
              {mutation.isError && (
                <p className="text-sm text-red-400">
                  {(mutation.error as { data?: { error?: string } })?.data?.error ??
                    'Something went wrong. Please try again.'}
                </p>
              )}
              <p className="text-xs leading-relaxed text-white/45">
                No payment is taken now and the reservation is not binding. By submitting you agree to our{' '}
                <Link href="/terms" className="underline hover:text-white" onClick={() => setOpen(false)}>Terms</Link> and{' '}
                <Link href="/privacy" className="underline hover:text-white" onClick={() => setOpen(false)}>Privacy Policy</Link>.
              </p>
              <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 glow-blue transition-all disabled:opacity-60"
              >
                {mutation.isPending ? 'Sending…' : 'Reserve Now'}
              </button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
