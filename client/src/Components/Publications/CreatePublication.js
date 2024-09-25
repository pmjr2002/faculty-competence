import React from 'react';

import { Link } from 'react-router-dom';

// import Loading from '../Loading';

const CreatePublication = () => {

  return (
    <div className="wrap main--grid">
        
        <Link to='/journals' className="course--module course--add--module">
          <span className="course--add--title">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
            Journals
          </span>
        </Link>

        <Link to='/conferences' className="course--module course--add--module">
            <span className="course--add--title">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                Conferences
            </span>
        </Link>

        <Link to='/books' className="course--module course--add--module">
            <span className="course--add--title">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                Books
            </span>
        </Link>

        <Link to='/patents' className="course--module course--add--module">
            <span className="course--add--title">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                    Patents
            </span>
        </Link>
       
      </div>
  );
}

export default CreatePublication;
