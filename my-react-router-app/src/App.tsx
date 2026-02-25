import './App.css';
import Button from './components/Button';
import Button2 from './components/Button2';

function App() {
  return (
    <>
      <Button link="https://www.naver.com" title="버튼입니다." color="blue" />
      <Button2
        label="버튼2"
        onClick={e => {
          console.log(e);
        }}
        children
      />
    </>
  );
}

export default App;
