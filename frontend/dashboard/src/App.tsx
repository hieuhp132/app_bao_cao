import './assets/style.css';
import  Header  from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Body from './components/Body/Body';
import Dropdown from './components/Header/Dropdown';

const App = () => {
  return (
    <div>
      <Header
        left={<Dropdown/>}
        right={<h1>Account details</h1>}
      />

      <Body
        left={<p>This is the left content. It takes 90% of the width.</p>}
        right={<p>This is the right content. It takes 10% of the width.</p>}
      />

      <Body
        left={<p>This is the left content. It takes 90% of the width.</p>}
        right={<p>This is the right content. It takes 10% of the width.</p>}
      />

      <Body
        left={<p>This is the left content. It takes 90% of the width.</p>}
        right={<p>This is the right content. It takes 10% of the width.</p>}
      />

      <Body
        left={<p>This is the left content. It takes 90% of the width.</p>}
        right={<p>This is the right content. It takes 10% of the width.</p>}
      />

      <Footer children={<p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved </p>}/>
      

    </div>
  );
};

export default App;
