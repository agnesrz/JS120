function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],
    info() {
      console.log(`${this.name} is a ${this.year} year student.`);
    },

    listCourses() {
      return this.courses;
    },

    addCourse(courseObj) {
      this.courses.push(courseObj);
    },

    addNote(courseCode, note) {
      for (let course in this.courses) {
        if (this.courses[course].code === courseCode) {

          if (this.courses[course].note) {
            this.courses[course].note += `; ${note}`;
          } else {
            this.courses[course].note = note;
          }
          break;
        }
      }
    },

    viewNotes() {
      for (let course in this.courses) {
        if (this.courses[course].note) {
          console.log(`${this.courses[course].name}: ${this.courses[course].note}`);
        }
      }
    },

    updateNote(courseCode, note) {
      for (let course in this.courses) {
        if (this.courses[course].code === courseCode) {
          this.courses[course].note = note;
          break;
        }
      }
    },
  };
}

let school = {
  students: [],
  courses: [{name: 'Math', code: 101, students: []}, {name: 'Advanced Math', code: 102, students: []}, {name: 'Physics', code: 202, students: []}],
  
  addStudent(name, year) {
    if (['1st', '2nd', '3rd', '4th', '5th'].includes(year)) {
      let student = createStudent(name, year);
      this.students.push(student);
      return student;
    } else {
      console.log('Invalid Year');
    }
  },
  
  enrollStudent(studentName, courseName) {
    let student = this.students.filter(currentStudent => currentStudent.name === studentName)[0];
    let course = this.courses.filter(currentCourse => currentCourse.name === courseName)[0];
  
    course.students.push(student);
    student.courses.push(Object.assign({}, course));
  },
  
  addGrade(studentName, courseName, grade) {
    let student = this.students.filter(currentStudent => currentStudent.name === studentName)[0];
    let course = student.courses.filter(currentCourse => currentCourse.name === courseName)[0];
    
    course.grade = grade;
  },
  
  getReportCard(studentName) {
    let student = this.students.filter(currentStudent => currentStudent.name === studentName)[0];
    
    student.courses.forEach(course => {
      let grade = course.grade ? course.grade : 'In Progress';
      console.log(`${course.name}: ${grade}`);
    });
  },
  
  courseReport(courseName) {
    let course = this.courses.filter(currentCourse => currentCourse.name === courseName)[0];
    let numOfGrades = 0;
    let totalOfGrades = 0;
    
    console.log(`=${courseName} Grades=`);
    
    course.students.forEach(student => {
      let courseObj = student.courses.filter(course => course.name === courseName)[0];
      let grade = courseObj.grade;
      
      if (grade) {
        numOfGrades += 1;
        totalOfGrades += grade;
        console.log(`${student.name}: ${grade}`);
      }
    });
    
    console.log('---');
    console.log(`Course Average: ${totalOfGrades / numOfGrades}`);
  }
};

let foo = school.addStudent('foo', '3rd');
school.addStudent('bar', '1st');
school.addStudent('qux', '2nd');

school.enrollStudent('foo', 'Math');
school.enrollStudent('foo', 'Advanced Math');
school.enrollStudent('foo', 'Physics');
school.enrollStudent('bar', 'Math');
school.enrollStudent('qux', 'Math');
school.enrollStudent('qux', 'Advanced Math');

school.addGrade('foo', 'Math', 95);
school.addGrade('foo', 'Advanced Math', 90);
school.addGrade('bar', 'Math', 91);
school.addGrade('qux', 'Math', 93);
school.addGrade('qux', 'Advanced Math', 90);

school.getReportCard('foo');

school.courseReport('Math');
school.courseReport('Advanced Math');
school.courseReport('Physics');

console.log(foo);