import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogTitle from '../../Dialog/Title';
import DialogContent from '../../Dialog/Content';

function MovieModalConfirmDelete(props) {
  const { open } = props;
  const { onClose } = props;

  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    props.onConfirm();
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="confirmar eliminar"
        open={open}
      >
        <DialogTitle id="confirmar eliminar" onClose={handleClose}>
          Eliminar Película
        </DialogTitle>
        <DialogContent dividers>
          <p>
            ¿Está seguro que desea eliminar la película? Esta acción no se podrá
            revertir.
          </p>
          <Button color="secondary" variant="contained" onClick={handleConfirm}>
            Eliminar
          </Button>
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

MovieModalConfirmDelete.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default MovieModalConfirmDelete;
