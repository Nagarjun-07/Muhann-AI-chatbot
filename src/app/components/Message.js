// src/app/components/InputField.js
import { Button, TextField, Stack } from '@mui/material';
import { useState } from 'react';

export default function InputField({ sendMessage, isLoading }) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    sendMessage(message);
    setMessage('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <Stack direction={'row'} spacing={2}>
      <TextField
        label="Message"
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isLoading}
      />
      <Button
        variant="contained"
        onClick={handleSend}
        disabled={isLoading}
      >
        {isLoading ? 'Sending...' : 'Send'}
      </Button>
    </Stack>
  );
}
