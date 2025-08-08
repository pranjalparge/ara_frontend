import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

export function ViewDoc({ open, data, close }) {
  console.log(data?.fileUrl);
  return (
    <div>
      {' '}
      <Dialog
        open={open}
        onClose={close}
        fullWidth
        maxWidth="lg"
        sx={{
          '& .MuiPaper-root': {
            height: '80vh',
            maxWidth: '1600px',
          },
        }}
      >
        <DialogTitle backgroundColor="primary.main" color="common.white">
          {data?.row?.full_name}, {data?.row?.amount}, {data?.row?.transaction_id},{' '}
          {data?.row?.name}{' '}
        </DialogTitle>
        <DialogContent
          sx={{
            overflowY: 'auto',
            height: 'calc(80vh - 64px)',
          }}
        >
          <div>
            <img
              src={data?.fileUrl}
              width={'100%'}
              height={'700px'}
              allowFullScreen
              autoFocus
            ></img>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
