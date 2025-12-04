import { useState } from 'react';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';
import './Memo.css';

const Memo = ({}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const nextPage = () => {(currentPage<3) ? setCurrentPage(currentPage + 1) : setCurrentPage(currentPage);};
  const prevPage = () => {(currentPage>1) ? setCurrentPage(currentPage - 1) : setCurrentPage(currentPage);};
  const goToPage4 = () => setCurrentPage(4);
  const renderPage = () => {
    switch(currentPage) {
      case 1: 
        return <Page1/>;
      case 2:
        return <Page2/>;
      case 3: 
        return <Page3 onDone={goToPage4}/>;
      case 4:
        return <Page4/>;
    };
  };


  return (
    <div>
        {currentPage !==4 && (
        <>
          <button className="next-btn" onClick={nextPage}>Next{">>"}</button>
          <button className="back-btn" onClick={prevPage}>{"<<"}Back</button>
        </>
        )}
        <div className="App">
          {renderPage()}
        </div>
    </div>
  );
};

export default Memo;