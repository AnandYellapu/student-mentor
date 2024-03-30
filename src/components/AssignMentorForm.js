// AssignMentorForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const AssignMentorForm = () => {
  const [students, setStudents] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedMentor, setSelectedMentor] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('https://stu-men-be.onrender.com/api/students');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error.message);
      }
    };

    const fetchMentors = async () => {
      try {
        const response = await axios.get('https://stu-men-be.onrender.com/api/mentors');
        setMentors(response.data);
      } catch (error) {
        console.error('Error fetching mentors:', error.message);
      }
    };

    fetchStudents();
    fetchMentors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`https://stu-men-be.onrender.com/api/students/${selectedStudent}/assign-mentor/${selectedMentor}`);
      alert('Mentor assigned successfully!');
      setSelectedStudent('');
      setSelectedMentor('');
    } catch (error) {
      console.error('Error assigning mentor:', error.message);
      alert('Error assigning mentor. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>Select Student:</label>
        <select
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
          className="form-input"
        >
          <option value="" disabled>Select a student</option>
          {students.map(student => (
            <option key={student._id} value={student._id}>{student.name}</option>
          ))}
        </select>

        <label>Select Mentor:</label>
        <select
          value={selectedMentor}
          onChange={(e) => setSelectedMentor(e.target.value)}
          className="form-input"
        >
          <option value="" disabled>Select a mentor</option>
          {mentors.map(mentor => (
            <option key={mentor._id} value={mentor._id}>{mentor.name}</option>
          ))}
        </select>

        <button type="submit" className="form-button">Assign Mentor</button>
      </form>
    </div>
  );
};

export default AssignMentorForm;
