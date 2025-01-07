import { CoursesComponentDemo } from '@/components/general/courses-c';
import React from 'react';

const Courses = () => {
    return (
        <div className="">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Toate Cursurile</h1>
            <CoursesComponentDemo hasTitle={false} allCourses />
        </div>
    );
};

export default Courses;