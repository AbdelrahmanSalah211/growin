import React from "react";

const CloseAccountTab = () => (
  <div className="p-8">
    {/* Close Account Heading */}
    <div
      style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 700,
        fontSize: '2.5rem',
        lineHeight: '100%',
        color: '#2C3E50',
        width: '21.75rem',
        height: '3rem',
        marginBottom: '1.5rem',
      }}
    >
      Close Account
    </div>
    {/* Horizontal line */}
    <div
      style={{
        width: '56.25rem',
        height: 0,
        borderTop: '1px solid #E0E6EB',
        marginBottom: '2rem',
      }}
    />
    {/* Warning text */}
    <div
      style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 700,
        fontSize: '1.125rem',
        lineHeight: '100%',
        color: '#2C3E50',
        width: '43.4375rem',
        height: '5.5rem',
        marginBottom: '2rem',
      }}
    >
      <span style={{ color: '#E53935' }}>Warning:</span> If you close your account, you will be unsubscribed from all 2 of your courses and will lose access to your account and data associated with your account forever, even if you choose to create a new account using the same email address in the future.
    </div>
  </div>
);

export default CloseAccountTab; 