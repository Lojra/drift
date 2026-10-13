import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: string }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: '' };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error: error?.message || 'Application render error' };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('DRIFT Root ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ backgroundColor: '#050507', color: '#F4F4F6', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
          <div style={{ maxWidth: '420px', width: '100%', textAlign: 'center', background: '#0C0C10', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '28px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3B82F6', margin: '0 auto 12px auto' }}></div>
            <h2 style={{ fontSize: '15px', fontWeight: 600, letterSpacing: '-0.02em', margin: '0 0 8px 0', color: '#F4F4F6' }}>
              DRIFT // Session Refresh
            </h2>
            <p style={{ fontSize: '12px', color: '#8E8E9E', margin: '0 0 20px 0', lineHeight: 1.6 }}>
              A cached browser asset mismatch was detected. Click below to refresh your session state.
            </p>
            <button
              onClick={() => {
                if ('serviceWorker' in navigator) {
                  navigator.serviceWorker.getRegistrations().then(regs => {
                    for (const r of regs) r.unregister();
                  });
                }
                if ('caches' in window) {
                  caches.keys().then(keys => keys.forEach(k => caches.delete(k)));
                }
                localStorage.clear();
                window.location.reload();
              }}
              style={{ background: '#3B82F6', color: '#FFFFFF', border: 'none', borderRadius: '6px', padding: '10px 20px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s' }}
            >
              Clear Cache & Refresh
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
