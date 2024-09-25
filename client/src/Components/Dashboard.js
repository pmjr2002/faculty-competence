import React, { useContext, useEffect, useState } from 'react';
import Context from '../Context';
import { Building, Globe, BookOpen, GraduationCap, Mail, Tag } from 'lucide-react';

export default function Component() {
  const context = useContext(Context.Context);
  const authUser = context.authenticatedUser;
  const [coursesCount, setCoursesCount] = useState(0); // To store the actual number of courses
  const [publicationsCount, setPublicationsCount] = useState(0); // To store the actual number of publications
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authUser) {
      // Fetch courses and count them
      context.data.getCourses()
        .then((response) => {
          const filteredCourses = response.filter(course => course.userId === authUser.id);
          
          // Calculate publications count
          
          setCoursesCount(filteredCourses.length);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data', error);
          setIsLoading(false);
        });
    }
  }, [authUser, context.data]);

  if (!authUser) {
    return <div className="text-center p-8">No user data available.</div>;
  }

  const facultyData = {
    name: authUser.firstName + ' ' + authUser.lastName,
    affiliation: authUser.affiliation,
    homepage: authUser.homepage,
    interests: authUser.areasOfInterest,
    email: authUser.emailAddress
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
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

          {/* Publications */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Publications</h2>
            <div className="flex items-center justify-between">
              <BookOpen className="h-8 w-8 text-blue-500" />
              <span className="text-3xl font-bold">
                {isLoading ? 'Loading...' : publicationsCount}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Total publications</p>
          </div>

          {/* Courses */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Courses</h2>
            <div className="flex items-center justify-between">
              <GraduationCap className="h-8 w-8 text-green-500" />
              <span className="text-3xl font-bold">
                {isLoading ? 'Loading...' : coursesCount}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Total courses taught</p>
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
