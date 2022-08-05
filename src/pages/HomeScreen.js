import Banner from "../components/Banner"
import NavBar from "../components/NavBar"
import Row from "../components/Row"
import requests from "../Requests"

function HomeScreen() {
  return (
    <div className="pb-8 w-full">
        <NavBar />
        <Banner />
        <div className="">
            <Row 
                title='NETFLIX ORIGINALS'
                fetchURL={requests.fetchNetflixOriginals}
                isLargeRow
            />
            <Row
                title='Trending Now'
                fetchURL={requests.fetchTrending}
            />
            <Row
                title='Top Rated'
                fetchURL={requests.fetchTopRated}
            />
            <Row 
                title='Action Movies'
                fetchURL={requests.fetchActionMovies}
            />
            <Row 
                title='Comedy Movies'
                fetchURL={requests.fetchComedyMovies}
            />
            <Row 
                title='Horror Movies'
                fetchURL={requests.fetchHorrorMovies}
            />
            <Row 
                title='Romance Movies'
                fetchURL={requests.fetchRomanceMovies}
            />
            <Row 
                title='Documentaries'
                fetchURL={requests.fetchDocumentaries}
            />
        </div>
    </div>
  )
}

export default HomeScreen