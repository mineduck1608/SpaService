import logo from './logo.svg'
import './App.css'

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          Learn React
        </a>
      </header>
      <div className='flex h-screen flex-col items-center justify-center bg-gray-100'>
        <h1 className='text-3xl font-bold text-blue-500'>Hello, Tailwind CSS & SCSS!</h1>
        <button className='custom-button mt-4'>Click Me</button>
      </div>
    </div>
  )
}

export default App
