import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Context from '../../../Context';
import Loading from '../../Loading';

const UpdateJournal = () => {
  const context = useContext(Context.Context);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [journal, setJournal] = useState('');
  const [volume, setVolume] = useState('');
  const [issue, setIssue] = useState('');
  const [pages, setPages] = useState('');
  const [publisher, setPublisher] = useState('');
  const [errors, setErrors] = useState([]);
  const authUser = context.authenticatedUser;

  const { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    context.data.getJournal(id)
      .then((response) => {
        if (response.error === "Sorry, we couldn't find the journal you were looking for.") {
          navigate('/notfound');
        } else {
          // If the currently authenticated user is the same as the Journal author
          // Allow the user to update the Journal
          if (authUser.id === response.userid) {
            setTitle(response.title);
            setAuthors(response.authors);
            setPublicationDate(response.publicationDate);
            setJournal(response.journal);
            setVolume(response.volume);
            setIssue(response.issue);
            setPages(response.pages);
            setPublisher(response.publisher);
          } else {
            navigate('/forbidden');
          }
        }
      })
      .catch(error => {
        console.error('Error fetching and parsing data', error);
        navigate('/error');
      })
      .finally(() => {
        setIsLoading(false);
      });
    // Clean up to prevent memory leak
    return () => controller?.abort();
  }, [authUser.id, id, navigate, context.data]);

  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    switch (name) {
      case 'title':
        setTitle(value);
        break;
      case 'authors':
        setAuthors(value);
        break;
      case 'publicationDate':
        setPublicationDate(value);
        break;
      case 'journal':
        setJournal(value);
        break;
      case 'volume':
        setVolume(value);
        break;
      case 'issue':
        setIssue(value);
        break;
      case 'pages':
        setPages(value);
        break;
      case 'publisher':
        setPublisher(value);
        break;
      default:
        break;
    }
  };

  const submit = (event) => {
    event.preventDefault();

    const updatedJournal = {
      title,
      authors,
      publicationDate,
      journal,
      volume,
      issue,
      pages,
      publisher,
      userid: authUser.id,
    };

    context.data.updateJournal(id, updatedJournal, authUser.emailAddress, authUser.password)
      .then((response) => {
        if (response.length) {
          setErrors(response);
        } else {
          navigate('/journals');
        }
      })
      .catch((error) => {
        console.error(error);
        navigate('/error');
      });
  };

  const cancel = (event) => {
    event.preventDefault();
    navigate('/journals');
  };

  return (
    isLoading ?
      <Loading />
      : <div className="wrap">
        <h2>Update Journal</h2>
        {errors.length ?
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>
          </div>
          : null
        }
        <form>
          <div className="main--flex">
            <div>
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" value={title} onChange={onChange} />

              <label htmlFor="authors">Authors</label>
              <input id="authors" name="authors" type="text" value={authors} onChange={onChange} />

              <label htmlFor="publicationDate">Publication Date</label>
              <input id="publicationDate" name="publicationDate" type="date" value={publicationDate} onChange={onChange} />

              <label htmlFor="journal">Journal</label>
              <input id="journal" name="journal" type="text" value={journal} onChange={onChange} />

              <label htmlFor="volume">Volume</label>
              <input id="volume" name="volume" type="text" value={volume} onChange={onChange} />

              <label htmlFor="issue">Issue</label>
              <input id="issue" name="issue" type="text" value={issue} onChange={onChange} />

              <label htmlFor="pages">Pages</label>
              <input id="pages" name="pages" type="text" value={pages} onChange={onChange} />

              <label htmlFor="publisher">Publisher</label>
              <input id="publisher" name="publisher" type="text" value={publisher} onChange={onChange} />
            </div>
          </div>
          <button className="button" type="submit" onClick={submit}>Update Journal</button>
          <button className="button button-secondary" onClick={cancel}>Cancel</button>
        </form>
      </div>
  );
};

export default UpdateJournal;
