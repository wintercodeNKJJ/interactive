import './App.css';
import Layout from './components/layout';
import MyContext from './context/context';

function App() {
  return (
    <div className='app'>
      <MyContext>
        <Layout/>
      </MyContext>
    </div>
  );
}

export default App;
