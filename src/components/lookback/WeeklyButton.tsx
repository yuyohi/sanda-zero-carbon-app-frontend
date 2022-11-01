import Button from '@mui/material/Button';

const WeeklyButton = (props: {
  title: string;
  img: string;
  currentDate: Date;
  change: number;
  setCurrentDate: (date: Date) => void;
}) => {
  const { title, img, currentDate, change, setCurrentDate } = props;
  const handleClick = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + change);
    setCurrentDate(newDate);
  };

  return (
    <Button
      type="submit"
      style={{ width: '25vw' }}
      sx={{ backgroundColor: 'transparent', height: '8vh' }}
      onClick={handleClick}
    >
      <img src={img} alt={title} width={100} />
    </Button>
  );
};

export default WeeklyButton;
