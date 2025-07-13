import React from "react";

const CloseAccountTab = () => (
  <div className="p-8">
    {/* Close Account Heading */}
    <div
      style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 700,
        fontSize: '2.5rem', // 40px
        lineHeight: '100%',
        color: '#2C3E50',
        width: '21.75rem', // 348px
        height: '3rem', // 48px
        marginBottom: '1.5rem',
      }}
    >
      Close Account
    </div>
    {/* Horizontal line */}
    <div
      style={{
        width: '48rem', // larger line, more suitable for container
        height: 0,
        borderTop: '1px solid #E0E6EB',
        margin: '0 auto 2rem auto', // center horizontally
      }}
    />
    {/* Warning text */}
    <div
      style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 700,
        fontSize: '1.125rem', // 18px
        lineHeight: '100%',
        color: '#2C3E50',
        width: '43.4375rem', // 695px
        height: '5.5rem', // 88px
        marginBottom: '2rem',
      }}
    >
      <span style={{ color: '#E53935' }}>Warning:</span> If you close your account, you will be unsubscribed from all 2 of your courses and will lose access to your account and data associated with your account forever, even if you choose to create a new account using the same email address in the future.
    </div>
  </div>
);

export default CloseAccountTab; 