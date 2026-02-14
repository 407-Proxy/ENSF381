// ===== Exercise 3A =====

// 4. Declare array
const classRoster = ["Alice", "Tom", "Charlie", "Diana", "Evan"];


// 5. Convert to string and log
const rosterString = classRoster.toString();
console.log("Roster as string:", rosterString);


// 6. Show original array unchanged
console.log("Original roster:", classRoster);


// 7. Add Fiona and Nancy
classRoster.push("Fiona");
classRoster.push("Nancy");


// 8. Remove first student
const removedStudent = classRoster.shift();
console.log("Removed student:", removedStudent);


// 9. Log updated array
console.log("Updated roster:", classRoster);


// 10. Log length
console.log("Total students:", classRoster.length);


// ===== Exercise 3B =====

// 1. Create classInfo object with nested details
const classInfo = {
    className: "ENSF381: Full-Stack Web Development",
    instructor: "Dr. Smith",
    students: classRoster,
    details: {
        semester: "Winter",
        year: 2025
    }
};

// 2. Add schedule property (array)
classInfo.schedule = ["Monday", "Wednesday", "Friday"];

// 3. Update instructor property (do not re-declare object)
classInfo.instructor = "Dr. Abdellatif";

// 4. Log className, instructor, students
console.log("className:", classInfo.className);
console.log("instructor:", classInfo.instructor);
console.log("students:", classInfo.students);

// 5. Access and log semester from nested details
console.log("semester:", classInfo.details.semester);

// 6. Log updated classInfo object
console.log("Updated classInfo:", classInfo);

// 7. Destructure className and students from classInfo
const { className, students } = classInfo;
console.log("Destructured className:", className);
console.log("Destructured students:", students);

// 8. Destructure semester and year from nested details
const { semester, year } = classInfo.details;
console.log("Destructured semester:", semester);
console.log("Destructured year:", year);

// 9 + 10. Destructure first two students and the rest
const [student1, student2, ...remainingStudents] = classRoster;

// 11. Log student1, student2, remainingStudents
console.log("student1:", student1);
console.log("student2:", student2);
console.log("remainingStudents:", remainingStudents);