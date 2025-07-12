import React, { useState } from "react";

const AccountSecurityTab = () => {
  const [email, setEmail] = useState<string>("you@example.com");
  const [editingEmail, setEditingEmail] = useState<boolean>(false);

  return (
    <div className="p-8">
      <div className="text-[#2C3E50] font-bold text-[2.5rem] leading-none mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
        Account Security
      </div>
      <div className="w-full h-[0.0625rem] bg-[#E0E6EB] mb-8"></div>
      {/* Basic label */}
      <div
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          fontSize: '1.5rem',
          lineHeight: '100%',
          color: '#2C3E50',
          height: '1.8125rem',
          width: '9.5625rem',
          marginBottom: '1.5rem',
        }}
      >
        Basic
      </div>
      {/* Email label */}
      <div
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: '1.125rem',
          lineHeight: '100%',
          color: '#2C3E50',
          height: '1.375rem',
          width: '2.875rem',
          marginBottom: '0.5rem',
        }}
      >
        Email
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
        {/* Input field container */}
        <div
          style={{
            width: '17.5rem',
            height: '3.4375rem',
            borderRadius: '0.625rem',
            background: '#F2F5F7',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '1rem',
          }}
        >
          {/* @ sign SVG */}
          <span style={{ display: 'flex', alignItems: 'center', width: '1.193rem', height: '1.21875rem' }}>
            <svg fill="#2C3E50" width="1.193rem" height="1.21875rem" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M26.2,8.5c-2.2-3.2-5.6-5.2-9.3-5.5c-0.3,0-0.6,0-0.9,0c-3.7,0-7.2,1.6-9.7,4.3c-2.5,2.7-3.6,6.4-3.2,10.1 c0.7,6,5.5,10.8,11.5,11.4C15,29,15.5,29,16,29c2.6,0,5-0.7,7.2-2.2c0.5-0.3,0.6-0.9,0.3-1.4c-0.3-0.5-0.9-0.6-1.4-0.3 c-2.2,1.4-4.7,2.1-7.3,1.8c-5.1-0.5-9.1-4.6-9.7-9.7C4.7,14.1,5.7,11,7.8,8.7c2.3-2.5,5.6-3.9,9-3.6c3.2,0.2,6,1.9,7.8,4.6 c1.9,2.9,2.4,6.3,1.3,9.6l0,0.1c-0.3,1-1.3,1.7-2.4,1.7c-1.4,0-2.5-1.1-2.5-2.5V17v-2v-4c0-0.6-0.4-1-1-1s-1,0.4-1,1v0 c-0.8-0.6-1.9-1-3-1c-2.8,0-5,2.2-5,5v2c0,2.8,2.2,5,5,5c1.4,0,2.6-0.6,3.5-1.4c0.7,1.4,2.2,2.4,4,2.4c1.9,0,3.6-1.2,4.3-3.1l0-0.1 C29.1,16,28.5,11.9,26.2,8.5z M19,17c0,1.7-1.3,3-3,3s-3-1.3-3-3v-2c0-1.7,1.3-3,3-3s3,1.3,3,3V17z"></path></svg>
          </span>
          {/* Email input or text */}
          {editingEmail ? (
            <input
              type="email"
              value={email}
              autoFocus
              onChange={e => setEmail(e.target.value)}
              onBlur={() => setEditingEmail(false)}
              onKeyDown={e => {
                if (e.key === 'Enter') setEditingEmail(false);
              }}
              style={{
                marginLeft: '1rem',
                background: 'transparent',
                outline: 'none',
                border: 'none',
                color: '#2C3E50',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '1.125rem', // 18px
                width: '10.0625rem', // 161px
                height: '1.375rem', // 22px
              }}
            />
          ) : (
            <span
              style={{
                marginLeft: '1rem',
                color: '#2C3E50',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '1.125rem',
                width: '10.0625rem',
                height: '1.375rem',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {email}
            </span>
          )}
        </div>
        {/* Pin icon container */}
        <div
          style={{
            marginLeft: '1rem',
            width: '3.4375rem',
            height: '3.4375rem',
            borderRadius: '0.625rem',
            background: '#F2F5F7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={() => setEditingEmail(true)}
          tabIndex={-1}
          role="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2C3E50" width="1.5rem" height="1.5rem">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
        </div>
      </div>
      {/* Horizontal line */}
      <div
        style={{
          width: '48.3126rem',
          height: 0,
          borderTop: '1px solid #E0E6EB',
          margin: '2rem 0 1.5rem 0',
        }}
      />
      {/* Password label */}
      <div
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          fontSize: '1.5rem',
          lineHeight: '100%',
          color: '#2C3E50',
          height: '1.8125rem',
          width: '7.6875rem',
          marginBottom: '1.5rem',
        }}
      >
        Password
      </div>
      {/* Description text */}
      <div
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: '1.125rem',
          lineHeight: '100%',
          color: '#2C3E50',
          width: '43.4375rem',
          height: '2.75rem',
          marginBottom: '2rem',
        }}
      >
        To set or change your password, you’ll first need to verify your identity using your email address{' '}
        <span style={{ fontWeight: 700, fontFamily: 'Inter, sans-serif', fontSize: '1.125rem', lineHeight: '100%' }}>{email}</span>.
        We’ll send a verification link to this address.
      </div>
      <div
        style={{
          width: '22.9375rem',
          height: '3.4375rem',
          borderRadius: '0.625rem',
          background: '#F2F5F7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <button
          style={{
            width: '13.5rem',
            height: '1.375rem',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            fontSize: '1.125rem',
            lineHeight: '100%',
            color: '#2C3E50',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          Set or Change password
        </button>
      </div>
    </div>
  );
};

export default AccountSecurityTab; 