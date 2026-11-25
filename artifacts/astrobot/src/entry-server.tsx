// Build-time prerender entry (see scripts/prerender.mjs). Not shipped to the browser.
import { renderToString } from 'react-dom/server';
import App from './App';
export { faqs } from './components/FAQSection';

export function render(url: string): string {
  return renderToString(<App ssrPath={url} />);
}
