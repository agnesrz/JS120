function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],
    
    info() {
      console.log(`${this.name} is a ${this.year} year student.`);
    },
    addCourse(course) {
      this.courses.push(course);
    },
    listCourses() {
      console.log(this.courses);
    },
    addNote(courseCode, note) {
      let thisCourse = this.courses.filter(course => course.code === courseCode)[0];
      if (thisCourse.note) {
        thisCourse.note += "; " + note;
      } else {
        thisCourse.note = note;
      }
      

    },
    updateNote(courseCode, newNote) {
      let thisCourse = this.courses.filter(course => course.code === courseCode)[0];
      
      thisCourse.note = newNote;
    },
    viewNotes() {
      this.courses.forEach(course => {
        if (course.note) {
          console.log(`${course.name}: ${course.note}`);
        }
      });
    }
  };
}

let foo = createStudent('Foo', '1st');
foo.info();
// "Foo is a 1st year student"
foo.listCourses();
// [];
foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
foo.listCourses();
// [{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
foo.addNote(102, 'Difficult subject');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
// "Advance Math: Difficult subject"
foo.updateNote(101, 'Fun course');
foo.viewNotes();
// "Math: Fun course"
// "Advanced Math: Difficult subject"