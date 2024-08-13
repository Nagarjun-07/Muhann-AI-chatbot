// src/app/components/Message.js
import { Box } from '@mui/material';

export default function Message({ role, content }) {
  return (
    <Box
      display="flex"
      justifyContent={role === 'assistant' ? 'flex-start' : 'flex-end'}
    >
      <Box
        bgcolor={role === 'assistant' ? 'primary.main' : 'secondary.main'}
        color="white"
        borderRadius={16}
        p={3}
      >
        {content}
      </Box>
    </Box>
  );
}
