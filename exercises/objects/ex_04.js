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


let foo = createStudent('Foo', '1st');
foo.info();
// = "Foo is a 1st year student"
foo.listCourses();
// [];
foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
foo.listCourses();
// = [{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
foo.viewNotes();
// = "Math: Fun course; Remember to study for algebra"
foo.addNote(102, 'Difficult subject');
foo.viewNotes();
// = "Math: Fun course; Remember to study for algebra"
// = "Advance Math: Difficult subject"
foo.updateNote(101, 'Fun course');
foo.viewNotes();
// = "Math: Fun course"
// = "Advanced Math: Difficult subject"