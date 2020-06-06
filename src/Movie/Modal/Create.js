import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import MovieFormCreate from '../Form/Create';
import DialogTitle from '../../Dialog/Title';
import DialogContent from '../../Dialog/Content';

export default function MovieModalCreate(props) {
  const { open } = props;
  const { launchCloseModal } = props;

  const handleClose = () => {
    launchCloseModal();
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="nueva película"
        open={open}
      >
        <DialogTitle id="nueva película" onClose={handleClose}>
          Nueva Película
        </DialogTitle>
        <DialogContent dividers>
          <MovieFormCreate launchCloseModal={launchCloseModal} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
