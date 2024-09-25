import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Header from './Components/Header';
import Dashboard from './Components/Dashboard';
import Courses from './Components/Courses/Courses';
import CourseDetail from './Components/Courses/CourseDetail';
import UpdateCourse from './Components/Courses/UpdateCourse';
import UserSignIn from './Components/User/UserSignIn';
import UserSignUp from './Components/User/UserSignUp';
import UserSignOut from './Components/User/UserSignOut';
import UpdateUser from './Components/User/UpdateUser';
import CreateCourse from './Components/Courses/CreateCourse';
import CreatePublication from './Components/Publications/CreatePublication';
import Events from './Components/Events/Events';
import CreateEvent from './Components/Events/CreateEvent';
import EventDetail from './Components/Events/EventDetail';
import UpdateEvent from './Components/Events/UpdateEvent';
import Journals from './Components/Publications/Journal/Journals';
import CreateJournal from './Components/Publications/Journal/CreateJournal';
import JournalDetail from './Components/Publications/Journal/JournalDetail';
import UpdateJournal from './Components/Publications/Journal/UpdateJournal';
import Conferences from './Components/Publications/Conference/Conferences';
import CreateConference from './Components/Publications/Conference/CreateConference';
import ConferenceDetail from './Components/Publications/Conference/ConferenceDetail';
import UpdateConference from './Components/Publications/Conference/UpdateConference';
import Books from './Components/Publications/Book/Books';
import CreateBook from './Components/Publications/Book/CreateBook';
import BookDetail from './Components/Publications/Book/BookDetail';
import UpdateBook from './Components/Publications/Book/UpdateBook';
import Patents from './Components/Publications/Patent/Patents';
import CreatePatent from './Components/Publications/Patent/CreatePatent';
import PatentDetail from './Components/Publications/Patent/PatentDetail';
import UpdatePatent from './Components/Publications/Patent/UpdatePatent';
import NotFound from './Components/Errors/NotFound';
import Forbidden from './Components/Errors/Forbidden';
import UnhandledError from './Components/Errors/UnhandledError';

import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <div id="root">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Navigate replace to="/dashboard" />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/courses" element={<PrivateRoute />}>
            <Route path="/courses" element={<Courses />} />
          </Route>
          <Route path="/courses/:id" element={<PrivateRoute />}>
            <Route path="/courses/:id" element={<CourseDetail />} />
          </Route>
          <Route path="/courses/:id/update" element={<PrivateRoute />}>
            <Route path="/courses/:id/update" element={<UpdateCourse />} />
          </Route>
          <Route path="/signin" element={<UserSignIn />} />
          <Route path="/signup" element={<UserSignUp />} />
          <Route path="/signout" element={<UserSignOut />} />
          <Route path="/user/:id/update" element={<UpdateUser />} />
          <Route path="/publications/create" element={<PrivateRoute />}>
            <Route path="/publications/create" element={<CreatePublication />} />
          </Route>
          <Route path="/courses/create" element={<PrivateRoute />}>
            <Route path="/courses/create" element={<CreateCourse />} />
          </Route>
          <Route path="/events" element={<PrivateRoute />}>
            <Route path="/events" element={<Events />} />
          </Route>
          <Route path="/events/create" element={<PrivateRoute />}>
            <Route path="/events/create" element={<CreateEvent />} />
          </Route>
          <Route path="/events/:id" element={<PrivateRoute />}>
            <Route path="/events/:id" element={<EventDetail />} />
          </Route>
          <Route path="/events/:id/update" element={<PrivateRoute />}>
            <Route path="/events/:id/update" element={<UpdateEvent />} />
          </Route>
          
          <Route path="/journals" element={<PrivateRoute />}>
            <Route path="/journals" element={<Journals />} />
          </Route>
          <Route path="/journals/create" element={<PrivateRoute />}>
            <Route path="/journals/create" element={<CreateJournal />} />
          </Route>
          <Route path="/journals/:id" element={<PrivateRoute />}>
            <Route path="/journals/:id" element={<JournalDetail />} />
          </Route>
          <Route path="/journals/:id/update" element={<PrivateRoute />}>
            <Route path="/journals/:id/update" element={<UpdateJournal />} />
          </Route>


          <Route path="/conferences" element={<PrivateRoute />}>
            <Route path="/conferences" element={<Conferences />} />
          </Route>
          <Route path="/conferences/create" element={<PrivateRoute />}>
            <Route path="/conferences/create" element={<CreateConference />} />
          </Route>
          <Route path="/conferences/:id" element={<PrivateRoute />}>
            <Route path="/conferences/:id" element={<ConferenceDetail />} />
          </Route>
          <Route path="/conferences/:id/update" element={<PrivateRoute />}>
            <Route path="/conferences/:id/update" element={<UpdateConference />} />
          </Route>

          <Route path="/books" element={<PrivateRoute />}>
            <Route path="/books" element={<Books />} />
          </Route>
          <Route path="/books/create" element={<PrivateRoute />}>
            <Route path="/books/create" element={<CreateBook />} />
          </Route>
          <Route path="/books/:id" element={<PrivateRoute />}>
            <Route path="/books/:id" element={<BookDetail />} />
          </Route>
          <Route path="/books/:id/update" element={<PrivateRoute />}>
            <Route path="/books/:id/update" element={<UpdateBook />} />
          </Route>

          <Route path="/patents" element={<PrivateRoute />}>
            <Route path="/patents" element={<Patents />} />
          </Route>
          <Route path="/patents/create" element={<PrivateRoute />}>
            <Route path="/patents/create" element={<CreatePatent />} />
          </Route>patents
          <Route path="/patents/:id" element={<PrivateRoute />}>
            <Route path="/patents/:id" element={<PatentDetail />} />
          </Route>
          <Route path="/patents/:id/update" element={<PrivateRoute />}>
            <Route path="/patents/:id/update" element={<UpdatePatent />} />
          </Route>


          <Route path="/notfound" element={<NotFound />} />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="/error" element={<UnhandledError />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
