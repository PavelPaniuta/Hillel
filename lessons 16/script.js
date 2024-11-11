function Student(firstName, lastName, birthYear) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.birthYear = birthYear;
  this.grades = [];
  this.attendance = new Array(25).fill(null);

  this.getAge = () => {
    const currentYear = new Date().getFullYear();
    return currentYear - this.birthYear;
  };

  this.addGrades = (grade) => {
    if (this.grades.length < 25) {
      this.grades.push(grade);
    } else {
      console.log("The maximum number of ratings has already been added");
    }
  };

  this.getAverageGrade = () => {
    const total = this.grades.reduce((acc, next) => acc + next, 0);
    return Math.round(this.grades.length ? total / this.grades.length : 0);
  };

  this.getAverageAttendance = function() {
    const attended = this.attendance.filter(a => a === true).length;
    return this.attendance.length ? attended / this.attendance.length : 0;
};

  this.present = () => {
    const index = this.attendance.indexOf(null);
    if (index !== -1) {
      this.attendance[index] = true;
    } else {
      console.log("The maximum number of attendance records has been reached");
    }
  };

  this.absent = () => {
    const index = this.attendance.indexOf(null);
    if (index !== -1) {
      this.attendance[index] = false;
    } else {
      console.log("The maximum number of attendance records has been reached");
    }
  };

  this.summary = () => {
    const averageGrade = this.getAverageGrade();
    const averageAttendance = this.getAverageAttendance();

    if (averageGrade > 90 && averageAttendance > 0.9) {
      console.log("Well done!");
    } else if (averageGrade <= 90 && averageAttendance <= 0.9) {
      console.log("Radish!");
    } else {
      console.log("Good, but it can be better");
    }
  };
}

const student1 = new Student("Pavel", "Paniuta", "1989");

student1.addGrades(12);
student1.addGrades(11);
student1.addGrades(11);
student1.addGrades(23);
student1.addGrades(11);
student1.addGrades(11);
student1.addGrades(12);
student1.addGrades(23);
student1.addGrades(11);
student1.addGrades(12);
student1.addGrades(11);
student1.addGrades(11);
student1.addGrades(12);
student1.addGrades(23);
student1.addGrades(11);
student1.addGrades(12);
student1.addGrades(11);
student1.addGrades(11);
student1.addGrades(12);
student1.addGrades(11);
student1.addGrades(11);
student1.addGrades(12);
student1.addGrades(23);
student1.addGrades(11);
student1.addGrades(12);
student1.addGrades(11);
student1.present();
student1.present();
student1.absent();
student1.absent();
student1.absent();
student1.absent();
student1.present();
student1.present();
student1.present();
student1.present();
student1.present();
student1.present();
student1.present();
student1.present();
student1.absent();
student1.absent();
student1.absent();
student1.absent();
student1.present();
student1.present();
student1.present();
student1.present();
student1.present();
student1.present();
student1.present();
student1.present();
console.log(`Age: ${student1.getAge()}`);
console.log(`Average Grade: ${student1.getAverageGrade()}`);
student1.summary();
