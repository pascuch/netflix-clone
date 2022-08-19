const API_KEY = '29d2a44b472138f9374f83f794cdf035'

const requests = {
    fetchGenres: `/genre/movie/list?api_key=${API_KEY}`,
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchMoviesByGenre: `/discover/movie?api_key=${API_KEY}&with_genres=`,
}

export default requests;