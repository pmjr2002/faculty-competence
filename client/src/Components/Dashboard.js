import React, { useContext, useEffect, useState } from 'react';
import Context from '../Context';
import { Building, Globe, BookOpen, Mail, Tag, FileText, PenTool, Book, Briefcase } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function Component() {
  const context = useContext(Context.Context);
  const authUser = context.authenticatedUser;

  const [coursesCount, setCoursesCount] = useState(0);
  const [journalsCount, setJournalsCount] = useState(0);
  const [booksCount, setBooksCount] = useState(0);
  const [conferencesCount, setConferencesCount] = useState(0);
  const [patentsCount, setPatentsCount] = useState(0);
  const [eventsCount, setEventsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [yearlyData, setYearlyData] = useState([]);

  useEffect(() => {
    if (authUser) {
      setIsLoading(true);

      const fetchData = async () => {
        try {
          const courses = await context.data.getCourses();
          const journals = await context.data.getJournals();
          const books = await context.data.getBooks();
          const conferences = await context.data.getConferences();
          const patents = await context.data.getPatents();
          const events = await context.data.getEvents();

          const filteredCourses = courses.filter(course => course.userId === authUser.id);
          const filteredJournals = journals.filter(journal => journal.userid === authUser.id);
          const filteredBooks = books.filter(book => book.userid === authUser.id);
          const filteredConferences = conferences.filter(conference => conference.userid === authUser.id);
          const filteredPatents = patents.filter(patent => patent.userid === authUser.id);
          const filteredEvents = events.filter(event => event.userid === authUser.id);

          setCoursesCount(filteredCourses.length);
          setJournalsCount(filteredJournals.length);
          setBooksCount(filteredBooks.length);
          setConferencesCount(filteredConferences.length);
          setPatentsCount(filteredPatents.length);
          setEventsCount(filteredEvents.length);

          // Prepare yearly data for the bar chart
          const currentYear = new Date().getFullYear();
          const yearsData = [];
          for (let i = 0; i < 5; i++) {
            const year = currentYear - i;
            yearsData.push({
              year,
              courses: filteredCourses.filter(course => new Date(course.startDate).getFullYear() === year).length,
              journals: filteredJournals.filter(journal => new Date(journal.publicationDate).getFullYear() === year).length,
              books: filteredBooks.filter(book => new Date(book.publicationDate).getFullYear() === year).length,
              conferences: filteredConferences.filter(conf => new Date(conf.publicationDate).getFullYear() === year).length,
              patents: filteredPatents.filter(patent => new Date(patent.publicationDate).getFullYear() === year).length,
              events: filteredEvents.filter(event => new Date(event.Date).getFullYear() === year).length,
            });
          }
          setYearlyData(yearsData.reverse());

          // Prepare events data for the line chart
          const eventsYearsData = [];
          for (let i = 0; i < 5; i++) {
            const year = currentYear - i;
            eventsYearsData.push({
              year,
              events: filteredEvents.filter(event => new Date(event.Date).getFullYear() === year).length,
            });
          }

          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching data', error);
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [authUser, context.data]);

  if (!authUser) {
    return <div className="text-center p-8">No user data available.</div>;
  }

  const facultyData = {
    name: `${authUser.firstName} ${authUser.lastName}`,
    affiliation: authUser.affiliation,
    homepage: authUser.homepage,
    interests: authUser.areasOfInterest,
    email: authUser.emailAddress
  };

  const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  const pieChartData = [
    { name: 'Journals', value: journalsCount },
    { name: 'Books', value: booksCount },
    { name: 'Conferences', value: conferencesCount },
    { name: 'Patents', value: patentsCount },
    { name: 'Events', value: eventsCount },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">{facultyData.name}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Faculty Overview */}
          <div className="col-span-full bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Faculty Overview</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Building className="h-5 w-5 text-gray-500" />
                <span>{facultyData.affiliation}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-gray-500" />
                <a href={facultyData.homepage} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  {facultyData.homepage}
                </a>
              </div>
              <div className="flex flex-wrap gap-2">
                <Tag className="h-5 w-5 text-gray-500" />
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                  {facultyData.interests}
                </span>
              </div>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="col-span-full bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Distribution of Academic Activities</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="col-span-full bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Yearly Academic Activities</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={yearlyData}>
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="journals" fill="#00C49F" />
                <Bar dataKey="books" fill="#FFBB28" />
                <Bar dataKey="conferences" fill="#FF8042" />
                <Bar dataKey="patents" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Line Chart */}
          <div className="col-span-full bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Yearly Patents</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={yearlyData}>
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="patents" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Activity Counts */}
          <div className="col-span-full grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { title: 'Courses', count: coursesCount, icon: BookOpen, color: 'text-green-500' },
              { title: 'Journals', count: journalsCount, icon: FileText, color: 'text-orange-500' },
              { title: 'Books', count: booksCount, icon: Book, color: 'text-purple-500' },
              { title: 'Conferences', count: conferencesCount, icon: Briefcase, color: 'text-red-500' },
              { title: 'Patents', count: patentsCount, icon: PenTool, color: 'text-pink-500' },
              { title: 'Events', count: eventsCount, icon: BookOpen, color: 'text-blue-500' },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">{item.title}</h2>
                <div className="flex items-center justify-between">
                  <item.icon className={`h-8 w-8 ${item.color}`} />
                  <span className="text-3xl font-bold">
                    {isLoading ? 'Loading...' : item.count}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Total {item.title.toLowerCase()}</p>
              </div>
            ))}
          </div>

          {/* Personal Information */}
          <div className="col-span-full bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-gray-500" />
              <a href={`mailto:${facultyData.email}`} className="text-blue-600 hover:underline">
                {facultyData.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
