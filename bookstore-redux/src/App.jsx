import './App.css'
import BookContainer from './components/BookContainer'
import Form from './components/Form'
import Layout from './components/Layout'
import Navbar from './components/Navbar'
import { store } from './redux/store'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <Layout>
        <BookContainer />
        <Form />
      </Layout>
    </Provider>
  )
}

export default App

/* 
- Add new book from the form input
- edit the book
- delete the book
- filter by all and featured
- implement search option
*/
