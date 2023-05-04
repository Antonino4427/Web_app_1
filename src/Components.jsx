import 'bootstrap-icons/font/bootstrap-icons.css';
import 'dayjs';
import { Table, Form } from 'react-bootstrap/'


function FilmList(props) {
    const q=props.films;
    

    return (
        <Table striped>
          <tbody>
            { props.films.map((film) => <FilmRow film={film} key={film.id}/>) }
          </tbody>
        </Table>
      );
}



function FilmDetails(props) {

    return <>
        <h2> Films:</h2>
        <table className="table" id="filmtable">
            <thead >
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Text</th>
                <th scope="col">Author</th>
                <th scope="col">Score</th>
                
              </tr>
            </thead>
            <tbody>
             {props.films.map((f)=> <FilmRow key={f.id} film={f} />)}
            </tbody>
            <tfoot>

            </tfoot>
            
          </table>
    
    </>
}

function FilmRow(props) {
  
    const formatWatchDate = (dayJsDate, format) => {
      return dayJsDate ? dayJsDate.format(format) : '';
    }
  
    return(
      <tr>
        <td>
           <p className={props.film.favorite ? "favorite" : ""} >
            {props.film.title}
          </p>
        </td>
        <td>
          <Form.Check type="checkbox" label="Favorite" defaultChecked={props.film.favorite ? true : false}/>
        </td>
        <td>
          {formatWatchDate(props.film.watchDate, 'MMMM D, YYYY')}
        </td>
        <td>
          <Rating rating={props.film.rating} maxStars={5}/>
        </td>
      </tr>
    );
}

function Rating(props) {
  return [...Array(props.maxStars)].map((el, index) =>
    <i key={index} className={(index < props.rating) ? "bi bi-star-fill" : "bi bi-star"} />
  )
}


export {FilmList};