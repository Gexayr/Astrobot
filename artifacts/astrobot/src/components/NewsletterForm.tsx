import React, { useState } from 'react';
import { useSubscribe } from '@workspace/api-client-react';

export const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const mutation = useSubscribe();

  if (mutation.isSuccess) {
    return <p className="text-sm text-primary font-medium">Thanks! You're subscribed.</p>;
  }

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate({ data: { email: email.trim() } });
      }}
    >
      <div className="flex gap-2">
        <input
          type="email"
          required
          maxLength={254}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          aria-label="Email address"
          className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50 w-full"
        />
        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-primary/20 text-primary border border-primary/50 rounded-lg px-4 py-2 text-sm font-semibold hover:bg-primary hover:text-white transition-colors disabled:opacity-60"
        >
          {mutation.isPending ? '…' : 'Subscribe'}
        </button>
      </div>
      {mutation.isError && (
        <p className="text-xs text-red-400">Couldn't subscribe. Please check the email and try again.</p>
      )}
    </form>
  );
};
