import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import MovieModalEdit from '../Movie/Modal/Edit';
import MovieModalConfirmDelete from '../Movie/Modal/ConfirmDelete';
import { remove as removeMovie } from '../Movies/reducer';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'id', disablePadding: false, label: 'ID' },
  { id: 'name', disablePadding: false, label: 'Nombre' },
  { id: 'publicationDate', disablePadding: false, label: 'F. Publicación' },
  { id: 'state', disablePadding: false, label: 'Estado' },
  { id: 'actions', disablePadding: false, label: '' },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

class MoviesTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 'asc',
      orderBy: 'id',
      openEditModal: false,
      openConfirmDeleteModal: false,
      selectedMovie: null,
    };

    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleCloseEditModal = this.handleCloseEditModal.bind(this);
    this.handleConfirmDeleteMovie = this.handleConfirmDeleteMovie.bind(this);
  }

  handleRequestSort = (event, property) => {
    const { order, orderBy } = this.state;
    const isAsc = orderBy === property && order === 'asc';
    this.setState({
      order: isAsc ? 'desc' : 'asc',
      orderBy: property,
    });
  };

  handleCloseEditModal = () => {
    this.setState({ openEditModal: false });
  };

  handleCloseConfirmDeleteModal = () => {
    this.setState({ openConfirmDeleteModal: false });
  };

  handleEditClick = (movie) => {
    this.setState({
      selectedMovie: movie,
      openEditModal: true,
    });
  };

  handleDeleteClick = (movie) => {
    this.setState({
      selectedMovie: movie,
      openConfirmDeleteModal: true,
    });
  };

  handleConfirmDeleteMovie = () => {
    const { selectedMovie: movie } = this.state;
    this.props.removeMovie({ movie });
    this.setState({ openConfirmDeleteModal: false });
  };

  render() {
    const { classes } = this.props;
    const { movies } = this.props;
    const {
      order,
      orderBy,
      openEditModal,
      openConfirmDeleteModal,
      selectedMovie,
    } = this.state;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="Películas"
              aria-label="Películas"
              size="small"
            >
              <EnhancedTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={this.handleRequestSort}
              />
              <TableBody>
                {stableSort(movies, getComparator(order, orderBy)).map(
                  (item, index) => {
                    return (
                      <TableRow hover tabIndex={-1} key={index}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.publicationDateFormatted}</TableCell>
                        <TableCell>{item.state}</TableCell>
                        <TableCell width="100">
                          <IconButton
                            size="small"
                            aria-label="edit"
                            color="primary"
                            onClick={() => {
                              this.handleEditClick(item);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            aria-label="delete"
                            color="secondary"
                            onClick={() => {
                              this.handleDeleteClick(item);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <MovieModalEdit
          movie={selectedMovie}
          open={openEditModal}
          launchCloseModal={this.handleCloseEditModal}
        />
        <MovieModalConfirmDelete
          open={openConfirmDeleteModal}
          onClose={this.handleCloseConfirmDeleteModal}
          onConfirm={this.handleConfirmDeleteMovie}
        />
      </div>
    );
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
  },
  table: {
    minWidth: 750,
  },
}));

const mapStateToProps = (state) => {
  return {
    movies: state.movies.movies,
  };
};

const mapDispatchToProps = {
  removeMovie,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(MoviesTable));
