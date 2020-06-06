import { createSlice } from '@reduxjs/toolkit';

const createData = (id, name, publicationDateFormatted, state) => {
  // const [dd, mm, yyyy] = publicationDateFormatted.split('/');
  // const publicationDate = new Date(`${mm}/${dd}/${yyyy}`);
  return { id, name, publicationDateFormatted, state };
};

export const movies = createSlice({
  name: 'movies',
  initialState: {
    movies: [
      createData(1, 'Jason Bourne', '15/08/16', 'Activo'),
      createData(
        2,
        'Alicia en el País de las Maravillas',
        '15/08/16',
        'Inactivo'
      ),
      createData(3, 'Tarzán La Leyenda', '15/08/16', 'Activo'),
      createData(4, 'Mi Buen Amigo Gigante', '15/08/16', 'Inactivo'),
      createData(5, 'Nada es lo que Parece 2', '15/08/16', 'Activo'),
    ],
  },
  reducers: {
    add: (state, { payload }) => {
      const { movie } = payload;
      const latestMovie = state.movies[state.movies.length - 1];
      movie.id = latestMovie.id + 1;
      const { movies } = state;
      movies.push(movie);
      Object.assign(state, { movies });
    },
    update: (state, { payload }) => {
      const { movie } = payload;
      const { movies } = state;
      const index = movies.findIndex((item) => item.id === movie.id);
      movies[index] = movie;
      Object.assign(state, { movies });
    },
    remove: (state, { payload }) => {
      const { movie } = payload;
      const movies = state.movies.filter((item) => item.id !== movie.id);
      Object.assign(state, { movies });
    },
  },
});

export const { add, update, remove } = movies.actions;

export const selectShow = (state) => state.movies.show;

export default movies.reducer;
