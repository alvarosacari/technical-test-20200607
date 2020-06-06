import React from 'react';
import Template from '../Template';
import MoviesTable from './Table';
import MovieModalCreate from '../Movie/Modal/Create';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';

class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openCreateModal: false,
    };

    this.openCreateModal = this.openCreateModal.bind(this);
    this.closeCreateModal = this.closeCreateModal.bind(this);
  }

  openCreateModal() {
    this.setState({ openCreateModal: true });
  }

  closeCreateModal() {
    this.setState({ openCreateModal: false });
  }

  render() {
    const { classes } = this.props;
    const { openCreateModal } = this.state;

    return (
      <Template>
        <Box className={classes.titleBar}>
          <h1>Películas</h1>
          <Button
            variant="contained"
            color="primary"
            onClick={this.openCreateModal}
          >
            Nueva Película
          </Button>
        </Box>

        <MoviesTable />
        <MovieModalCreate
          open={openCreateModal}
          launchCloseModal={this.closeCreateModal}
        />
      </Template>
    );
  }
}

const useStyles = (theme) => ({
  titleBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default withStyles(useStyles)(Movies);
