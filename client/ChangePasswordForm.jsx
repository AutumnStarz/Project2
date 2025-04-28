import React, { useState } from 'react';

// this componant allows users to change their password
const ChangePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Password changed successfully!');
        setOldPassword('');
        setNewPassword('');
      } else {
        setMessage(data.error || 'Error changing password.');
      }
    } catch (err) {
      console.error('Error:', err);
      setMessage('An error occurred.');
    }
  };

  return (
    <form onSubmit={handleChangePassword}>
      <h3>Change Password</h3>
      <input
        type="password"
        placeholder="Old Password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      <button type="submit">Change Password</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default ChangePasswordForm;
