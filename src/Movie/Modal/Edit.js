import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import MovieFormEdit from '../Form/Edit';
import DialogTitle from '../../Dialog/Title';
import DialogContent from '../../Dialog/Content';

export default function MovieModalEdit(props) {
  const { open, movie } = props;
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
          Editar Película
        </DialogTitle>
        <DialogContent dividers>
          <MovieFormEdit movie={movie} launchCloseModal={launchCloseModal} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
