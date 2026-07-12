-- ============================================================
-- University Information System — Database Checkpoint
-- Normalized to 3NF | SQLite-compatible (portable ANSI SQL)
-- ============================================================

PRAGMA foreign_keys = ON;   -- SQLite only: enable FK enforcement

-- ------------------------------------------------------------
-- STEP 1 & 2: SCHEMA DESIGN + TABLE CREATION
--
-- Normalization notes (3NF):
--   1NF: all attributes are atomic (no repeating groups/arrays).
--   2NF: in enrollments, grade depends on the FULL composite key
--        (student_id, course_id) — no partial dependencies.
--   3NF: no transitive dependencies — instructor details (name,
--        department) live in instructors, not in courses;
--        student details live only in students, not enrollments.
-- ------------------------------------------------------------

CREATE TABLE instructors (
    instructor_id  INTEGER PRIMARY KEY,
    name           VARCHAR(100) NOT NULL,
    department     VARCHAR(100) NOT NULL
);

CREATE TABLE students (
    student_id  INTEGER PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    email       VARCHAR(255) NOT NULL UNIQUE,
    age         INTEGER NOT NULL CHECK (age > 17)
);

CREATE TABLE courses (
    course_id      INTEGER PRIMARY KEY,
    title          VARCHAR(150) NOT NULL UNIQUE,
    credits        INTEGER NOT NULL CHECK (credits BETWEEN 1 AND 6),
    instructor_id  INTEGER NOT NULL,
    FOREIGN KEY (instructor_id)
        REFERENCES instructors (instructor_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE TABLE enrollments (
    student_id  INTEGER NOT NULL,
    course_id   INTEGER NOT NULL,
    grade       CHAR(2) CHECK (grade IN ('A','A-','B+','B','B-','C+','C','D','F') OR grade IS NULL),
    PRIMARY KEY (student_id, course_id),          -- prevents duplicate enrollment
    FOREIGN KEY (student_id)
        REFERENCES students (student_id)
        ON DELETE CASCADE,
    FOREIGN KEY (course_id)
        REFERENCES courses (course_id)
        ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- STEP 3: INSERT SAMPLE DATA
-- ------------------------------------------------------------

INSERT INTO instructors (instructor_id, name, department) VALUES
    (1, 'Dr. Amina Diabaté',  'Computer Science'),
    (2, 'Prof. Kwame Mensah', 'Mathematics'),
    (3, 'Dr. Sarah Johnson',  'Computer Science');

INSERT INTO students (student_id, name, email, age) VALUES
    (101, 'Fatou Koné',    'fatou.kone@univ.edu',    20),
    (102, 'Jean N''Guessan','jean.nguessan@univ.edu', 22),
    (103, 'Aya Traoré',    'aya.traore@univ.edu',    19),
    (104, 'Marc Kouassi',  'marc.kouassi@univ.edu',  21);  -- not enrolled anywhere (for Query 3)

INSERT INTO courses (course_id, title, credits, instructor_id) VALUES
    (201, 'Database Systems',       4, 1),
    (202, 'Linear Algebra',         3, 2),
    (203, 'Operating Systems',      4, 3);

INSERT INTO enrollments (student_id, course_id, grade) VALUES
    (101, 201, 'A'),
    (102, 201, 'B+'),
    (103, 202, 'A-'),
    (101, 203, NULL);   -- in progress, no grade yet

-- ------------------------------------------------------------
-- STEP 4: QUERY EXECUTION
-- ------------------------------------------------------------

-- Q1: All students enrolled in "Database Systems"
SELECT s.student_id, s.name, s.email, e.grade
FROM students s
JOIN enrollments e ON e.student_id = s.student_id
JOIN courses c     ON c.course_id  = e.course_id
WHERE c.title = 'Database Systems';

-- Q2: All courses with the names of their instructors
SELECT c.course_id, c.title, c.credits, i.name AS instructor_name, i.department
FROM courses c
JOIN instructors i ON i.instructor_id = c.instructor_id
ORDER BY c.course_id;

-- Q3: Students not enrolled in any course
SELECT s.student_id, s.name, s.email
FROM students s
LEFT JOIN enrollments e ON e.student_id = s.student_id
WHERE e.student_id IS NULL;

-- Q4: Update a student's email address
UPDATE students
SET email = 'fatou.k.new@univ.edu'
WHERE student_id = 101;

-- Verify the update
SELECT student_id, name, email FROM students WHERE student_id = 101;

-- Q5: Delete a course by its ID
-- (ON DELETE CASCADE automatically removes its enrollment rows)
DELETE FROM courses WHERE course_id = 203;

-- Verify the delete: course 203 gone, and its enrollments gone too
SELECT * FROM courses;
SELECT * FROM enrollments;
