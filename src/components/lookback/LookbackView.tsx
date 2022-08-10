import { FC } from 'react';
import GenreButton from './GenreButton';
import DailyGraph from './DailyGraph';
import AchievementList from './AchievementList';

const LookbackView: FC = () => {
  const achievements = [
    {
      date: new Date(),
      title: 'エアコンの温度を１度下げる',
      point: 20,
    },
    {
      date: new Date(),
      title: 'シャワーを出しっぱなしにしない',
      point: 10,
    },
    {
      date: new Date(2022, 7, 8, 10, 13),
      title: 'テレビをつけっぱなしにしない',
      point: 10,
    },
  ];

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
        <AchievementList achievements={achievements} />
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default LookbackView;
