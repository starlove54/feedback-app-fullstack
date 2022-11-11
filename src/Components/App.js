import Header from './Header'
import FeedbackList from './FeedbackList'
import FeedbackStats from './FeedbackStats'
import FeedbackForm from './FeedbackForm'
import AboutPage from '../Pages/About'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import AboutIconLink from './AboutIconLink'
import {FeedbackProvider} from './Context/FeedbackContext'
function App() {

  return (
    <FeedbackProvider>
    <Router>
    <Header />
    <div className="container">
    <Routes>
    <Route
    exact path = '/' 
    element = {
        <>
            <FeedbackForm/>
            <FeedbackStats/>
            <FeedbackList/>
        </>
    }
    />

    <Route path = '/about' element = {<AboutPage/>} />
    </Routes>
    <AboutIconLink/>
        </div>
    </Router>
    </FeedbackProvider>

  )
}

export default App
