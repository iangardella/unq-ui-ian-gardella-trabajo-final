import './App.css'
import { Quiz } from './components/Quiz'
import { QuestionProvider } from './context/QuestionProvider'

const App = () => {
  return (
    <QuestionProvider>
      <Quiz/>
    </QuestionProvider>
  )
}

export default App
