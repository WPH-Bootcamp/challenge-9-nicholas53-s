import { Toaster } from 'sonner';

export default function AppToaster() {
  return (
    <Toaster
      position="top-center"
      theme="dark"
      offset={80}
      containerAriaLabel="Notifications"
      toastOptions={{
        style: {
          background: '#00000040',
          color: 'white',
          borderRadius: '16px',
          padding: '12px 24px',
          fontSize: '16px',
          fontWeight: '500',
          textAlign: 'center',
        },
      }}
      style={{
        top: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'auto',
        minWidth: '300px',
      }}
    />
  );
}
