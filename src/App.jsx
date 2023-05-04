

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import dayjs from 'dayjs';
import { Container, Row, Col, Button } from 'react-bootstrap/'
import { React, useState } from 'react';
import { Navigation } from './Navigation';
import { FilmList } from './Components';
import FILMS from './films'
import Filters from './Filters_1';

/*const fl=new FilmLibrary();
fl.addNewFilm(new Film(1,'sharknado 1',true, '2019-8-30', 5));
fl.addNewFilm(new Film(2, 'Pulp Fiction', true, '2023-3-10' , 5));
fl.addNewFilm(new Film(3, '21 grams', false, '2023-3-17' , 4));
fl.addNewFilm(new Film(4, 'star wars', true, '2010-6-12' , 4));
fl.addNewFilm(new Film(5, 'shrek', true, '2009-1-6' , 3));
fl.addNewFilm(new Film(6, 'inception', false, '2009-1-6', 2));*/





function App() {
  const [activeFilter, setActiveFilter] = useState('filter-all');

  const filters = {
    'filter-all':       { label: 'All', id: 'filter-all', filterFunction: () => true},
    'filter-favorite':  { label: 'Favorites', id: 'filter-favorite', filterFunction: film => film.favorite},
    'filter-best':      { label: 'Best Rated', id: 'filter-best', filterFunction: film => film.rating >= 5},
    'filter-lastmonth': { label: 'Seen Last Month', id: 'filter-lastmonth', filterFunction: film => isSeenLastMonth(film)},
    'filter-unseen':    { label: 'Unseen', id: 'filter-unseen', filterFunction: film => film.watchDate ? false : true}
  };

  const isSeenLastMonth = (film) => {
    if('watchDate' in film) {  // Accessing watchDate only if defined
      const diff = film.watchDate.diff(dayjs(),'month')
      const isLastMonth = diff <= 0 && diff > -1 ;      // last month
      return isLastMonth;
    }
  }
  return ( 
  <Container fluid className='App'>
    <Navigation/>
    <Row className="vh-100">
        <Col md={4} xl={3} className="below-nav" id="left-sidebar">
        <Filters items={filters} selected={activeFilter} onSelect={setActiveFilter}/>
        </Col>

        <Col md={8} xl={9} className='below-nav'>
          <h1>Filter : <span> {filters[activeFilter].label}</span></h1>
          
          <FilmList films={FILMS.filter(filters[activeFilter].filterFunction)}/>
          <Button variant="primary" size="lg" className="fixed-right-bottom"> &#43; </Button>
        </Col>
    </Row>
    </Container>
  );

 
}

export default App;