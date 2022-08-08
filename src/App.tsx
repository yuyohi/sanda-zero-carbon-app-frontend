import './App.css';
import GenreButton from './components/lookback/GenreButton';
import MissionList from './components/lookback/MissionList';
import DailyGraph from './components/lookback/DailyGraph';

// var today は書き換える
const App = () => {
  const today = new Date();

  return (
    <div className="App">
      <div>
        <GenreButton />
      </div>
      <br />
      <div>
        <DailyGraph />
      </div>
      <br />
      <div>
        <MissionList date={today} />
      </div>
      <br />
      <div>
        <MissionList date={today} />
      </div>
    </div>
  );
};

export default App;
