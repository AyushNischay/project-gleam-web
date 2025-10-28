-- ============================================
-- SAMPLE DATA FOR STUDENT ANALYZER
-- Run this AFTER your Spring Boot app has created the tables
-- ============================================

-- Clear existing data (optional - only if you want fresh start)
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE material_topics;
TRUNCATE TABLE bookmarks;
TRUNCATE TABLE attendance;
TRUNCATE TABLE marks;
TRUNCATE TABLE study_materials;
TRUNCATE TABLE subjects;
TRUNCATE TABLE students;
TRUNCATE TABLE users;

SET FOREIGN_KEY_CHECKS = 1;

-- Reset auto-increment (optional)
ALTER TABLE users AUTO_INCREMENT = 1;
ALTER TABLE students AUTO_INCREMENT = 1;
ALTER TABLE subjects AUTO_INCREMENT = 1;
ALTER TABLE study_materials AUTO_INCREMENT = 1;

-- ============================================
-- 1. INSERT USERS
-- ============================================
-- Password for all users: 'password123' (bcrypt encoded)
-- You can generate bcrypt hash at: https://bcrypt-generator.com/

INSERT INTO users (email, password, role, created_at, updated_at) VALUES
('admin@school.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ADMIN', NOW(), NOW()),
('teacher1@school.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'TEACHER', NOW(), NOW()),
('teacher2@school.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'TEACHER', NOW(), NOW()),
('rahul.sharma@school.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'STUDENT', NOW(), NOW()),
('priya.patel@school.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'STUDENT', NOW(), NOW()),
('amit.kumar@school.com', 'ok', 'STUDENT', NOW(), NOW());

-- ============================================
-- 2. INSERT SUBJECTS
-- ============================================
INSERT INTO subjects (subject_code, subject_name, description, class_name) VALUES
('MATH12A', 'Mathematics', 'Advanced Mathematics for Class 12-A', '12-A'),
('PHY12A', 'Physics', 'Physics for Class 12-A', '12-A'),
('CHEM12A', 'Chemistry', 'Chemistry for Class 12-A', '12-A'),
('ENG12A', 'English', 'English Language and Literature', '12-A'),
('CS12A', 'Computer Science', 'Computer Science and Programming', '12-A'),

('MATH12B', 'Mathematics', 'Advanced Mathematics for Class 12-B', '12-B'),
('PHY12B', 'Physics', 'Physics for Class 12-B', '12-B'),
('CHEM12B', 'Chemistry', 'Chemistry for Class 12-B', '12-B'),

('MATH11A', 'Mathematics', 'Mathematics for Class 11-A', '11-A'),
('PHY11A', 'Physics', 'Physics for Class 11-A', '11-A');

-- ============================================
-- 3. INSERT STUDENTS
-- ============================================
INSERT INTO students (user_id, student_id, name, roll_no, class_name, section, date_of_birth, phone, address, parent_name, parent_contact, blood_group, admission_date, status, created_at) VALUES
(4, 'STU001', 'Rahul Sharma', '001', '12-A', 'Science', '2005-03-15', '+91 98765 43210', '123 Main Street, Mumbai, Maharashtra', 'Mr. Rajesh Sharma', '+91 98765 43211', 'O+', '2019-04-01', 'ACTIVE', NOW()),
(5, 'STU002', 'Priya Patel', '002', '12-A', 'Science', '2005-05-20', '+91 98765 43212', '456 Park Avenue, Mumbai, Maharashtra', 'Mr. Amit Patel', '+91 98765 43213', 'A+', '2019-04-01', 'ACTIVE', NOW()),
(6, 'STU003', 'Amit Kumar', '003', '12-A', 'Science', '2005-07-10', '+91 98765 43214', '789 Lake Road, Mumbai, Maharashtra', 'Mrs. Sunita Kumar', '+91 98765 43215', 'B+', '2019-04-01', 'ACTIVE', NOW());

-- ============================================
-- 4. INSERT MARKS (This creates weak subjects for recommendations)
-- ============================================

-- Rahul Sharma's Marks (Student ID: 1)
-- Mathematics - WEAK (Average: 68%)
INSERT INTO marks (student_id, subject_id, exam_type, marks_obtained, total_marks, exam_date, teacher_id, created_at) VALUES
(1, 1, 'UNIT_TEST', 65, 100, '2024-01-15', 2, NOW()),
(1, 1, 'MIDTERM', 70, 100, '2024-02-20', 2, NOW()),
(1, 1, 'QUIZ', 68, 100, '2024-03-10', 2, NOW());

-- Physics - WEAK (Average: 72%)
INSERT INTO marks (student_id, subject_id, exam_type, marks_obtained, total_marks, exam_date, teacher_id, created_at) VALUES
(1, 2, 'UNIT_TEST', 70, 100, '2024-01-18', 2, NOW()),
(1, 2, 'MIDTERM', 75, 100, '2024-02-22', 2, NOW()),
(1, 2, 'QUIZ', 71, 100, '2024-03-12', 2, NOW());

-- Chemistry - GOOD (Average: 85%)
INSERT INTO marks (student_id, subject_id, exam_type, marks_obtained, total_marks, exam_date, teacher_id, created_at) VALUES
(1, 3, 'UNIT_TEST', 82, 100, '2024-01-20', 2, NOW()),
(1, 3, 'MIDTERM', 88, 100, '2024-02-25', 2, NOW()),
(1, 3, 'QUIZ', 85, 100, '2024-03-15', 2, NOW());

-- English - WEAK (Average: 73%)
INSERT INTO marks (student_id, subject_id, exam_type, marks_obtained, total_marks, exam_date, teacher_id, created_at) VALUES
(1, 4, 'UNIT_TEST', 70, 100, '2024-01-22', 2, NOW()),
(1, 4, 'MIDTERM', 76, 100, '2024-02-27', 2, NOW()),
(1, 4, 'QUIZ', 73, 100, '2024-03-18', 2, NOW());

-- Computer Science - EXCELLENT (Average: 92%)
INSERT INTO marks (student_id, subject_id, exam_type, marks_obtained, total_marks, exam_date, teacher_id, created_at) VALUES
(1, 5, 'UNIT_TEST', 90, 100, '2024-01-25', 2, NOW()),
(1, 5, 'MIDTERM', 95, 100, '2024-03-01', 2, NOW()),
(1, 5, 'QUIZ', 91, 100, '2024-03-20', 2, NOW());

-- Priya Patel's Marks (Student ID: 2) - Overall Good Student
INSERT INTO marks (student_id, subject_id, exam_type, marks_obtained, total_marks, exam_date, teacher_id, created_at) VALUES
(2, 1, 'MIDTERM', 95, 100, '2024-02-20', 2, NOW()),
(2, 2, 'MIDTERM', 93, 100, '2024-02-22', 2, NOW()),
(2, 3, 'MIDTERM', 94, 100, '2024-02-25', 2, NOW()),
(2, 4, 'MIDTERM', 90, 100, '2024-02-27', 2, NOW()),
(2, 5, 'MIDTERM', 96, 100, '2024-03-01', 2, NOW());

-- Amit Kumar's Marks (Student ID: 3)
-- English - WEAK (Average: 65%)
INSERT INTO marks (student_id, subject_id, exam_type, marks_obtained, total_marks, exam_date, teacher_id, created_at) VALUES
(3, 4, 'UNIT_TEST', 62, 100, '2024-01-22', 2, NOW()),
(3, 4, 'MIDTERM', 68, 100, '2024-02-27', 2, NOW()),
(3, 4, 'QUIZ', 65, 100, '2024-03-18', 2, NOW());

-- Mathematics - WEAK (Average: 70%)
INSERT INTO marks (student_id, subject_id, exam_type, marks_obtained, total_marks, exam_date, teacher_id, created_at) VALUES
(3, 1, 'MIDTERM', 70, 100, '2024-02-20', 2, NOW()),
(3, 1, 'QUIZ', 70, 100, '2024-03-10', 2, NOW());

-- ============================================
-- 5. INSERT STUDY MATERIALS
-- ============================================

-- Mathematics Materials
INSERT INTO study_materials (title, description, type, url, subject_id, difficulty, thumbnail_url, duration, pages, rating, views, uploaded_by, created_at) VALUES
('Complete Calculus Masterclass', 'Learn calculus from basics to advanced concepts with practical examples and problem-solving techniques.', 'VIDEO', 'https://www.youtube.com/watch?v=WUvTyaaNkzM', 1, 'INTERMEDIATE', 'https://i.ytimg.com/vi/WUvTyaaNkzM/hqdefault.jpg', '2h 30m', NULL, 4.8, 125000, 1, NOW()),

('Trigonometry Problem Solving Guide', 'Comprehensive PDF guide with 200+ solved problems and practice questions.', 'PDF', 'https://www.mathsisfun.com/algebra/trigonometry.html', 1, 'BEGINNER', NULL, NULL, 150, 4.5, 89000, 1, NOW()),

('Algebra Practice Problems', '500+ practice problems with detailed solutions for mastering algebra.', 'PRACTICE', 'https://www.khanacademy.org/math/algebra', 1, 'INTERMEDIATE', NULL, NULL, NULL, 4.4, 54000, 1, NOW()),

('Advanced Integration Techniques', 'Master integration with various methods and complex problems.', 'VIDEO', 'https://www.youtube.com/watch?v=rifT3z0vCfs', 1, 'ADVANCED', 'https://i.ytimg.com/vi/rifT3z0vCfs/hqdefault.jpg', '3h 15m', NULL, 4.7, 98000, 1, NOW());

-- Physics Materials
INSERT INTO study_materials (title, description, type, url, subject_id, difficulty, thumbnail_url, duration, pages, rating, views, uploaded_by, created_at) VALUES
('Electromagnetism Explained Simply', 'Interactive video lectures explaining electromagnetic concepts with animations.', 'VIDEO', 'https://www.youtube.com/watch?v=1TKSfAkWWN0', 2, 'INTERMEDIATE', 'https://i.ytimg.com/vi/1TKSfAkWWN0/hqdefault.jpg', '1h 45m', NULL, 4.7, 95000, 1, NOW()),

('Optics and Light - Complete Guide', 'Understand reflection, refraction, and optical instruments.', 'PDF', 'https://www.physicsclassroom.com/class/refrn', 2, 'BEGINNER', NULL, NULL, 120, 4.6, 76000, 1, NOW()),

('Mechanics Problem Solving', 'Practice problems on Newton laws, motion, and energy.', 'PRACTICE', 'https://www.khanacademy.org/science/physics', 2, 'INTERMEDIATE', NULL, NULL, NULL, 4.5, 65000, 1, NOW());

-- Chemistry Materials
INSERT INTO study_materials (title, description, type, url, subject_id, difficulty, thumbnail_url, duration, pages, rating, views, uploaded_by, created_at) VALUES
('Organic Chemistry Basics', 'Introduction to organic chemistry with reaction mechanisms.', 'VIDEO', 'https://www.youtube.com/watch?v=yGg2nHEOr7k', 3, 'BEGINNER', 'https://i.ytimg.com/vi/yGg2nHEOr7k/hqdefault.jpg', '2h 00m', NULL, 4.8, 110000, 1, NOW()),

('Chemical Bonding Complete Notes', 'Detailed notes on ionic, covalent, and metallic bonding.', 'PDF', 'https://www.chemguide.co.uk/atoms/bonding/bonding.html', 3, 'INTERMEDIATE', NULL, NULL, 80, 4.6, 72000, 1, NOW());

-- English Materials
INSERT INTO study_materials (title, description, type, url, subject_id, difficulty, thumbnail_url, duration, pages, rating, views, uploaded_by, created_at) VALUES
('Essay Writing Masterclass', 'Learn to write compelling essays with proper structure, arguments, and examples.', 'ARTICLE', 'https://owl.purdue.edu/owl/general_writing/academic_writing/essay_writing/index.html', 4, 'BEGINNER', NULL, NULL, NULL, 4.6, 67000, 1, NOW()),

('Grammar Rules and Usage', 'Complete guide to English grammar with examples and exercises.', 'PDF', 'https://www.englishgrammar.org/', 4, 'BEGINNER', NULL, NULL, 200, 4.5, 85000, 1, NOW()),

('Literature Analysis Techniques', 'How to analyze poems, novels, and plays effectively.', 'VIDEO', 'https://www.youtube.com/watch?v=MSYw502dJNY', 4, 'INTERMEDIATE', 'https://i.ytimg.com/vi/MSYw502dJNY/hqdefault.jpg', '1h 30m', NULL, 4.7, 58000, 1, NOW()),

('Creative Writing Workshop', 'Improve your creative writing skills with practical exercises.', 'ARTICLE', 'https://www.masterclass.com/articles/creative-writing-101', 4, 'INTERMEDIATE', NULL, NULL, NULL, 4.6, 43000, 1, NOW());

-- Computer Science Materials
INSERT INTO study_materials (title, description, type, url, subject_id, difficulty, thumbnail_url, duration, pages, rating, views, uploaded_by, created_at) VALUES
('Python Programming Full Course', 'Complete Python tutorial from beginner to advanced.', 'VIDEO', 'https://www.youtube.com/watch?v=_uQrJ0TkZlc', 5, 'BEGINNER', 'https://i.ytimg.com/vi/_uQrJ0TkZlc/hqdefault.jpg', '6h 30m', NULL, 4.9, 2500000, 1, NOW()),

('Data Structures and Algorithms', 'Essential DSA concepts with coding problems.', 'PRACTICE', 'https://www.programiz.com/dsa', 5, 'INTERMEDIATE', NULL, NULL, NULL, 4.8, 180000, 1, NOW()),

('Object-Oriented Programming Guide', 'Master OOP concepts with Java examples.', 'PDF', 'https://docs.oracle.com/javase/tutorial/java/concepts/', 5, 'INTERMEDIATE', NULL, NULL, 150, 4.7, 125000, 1, NOW());

-- ============================================
-- 6. INSERT MATERIAL TOPICS
-- ============================================

-- Mathematics topics
INSERT INTO material_topics (material_id, topic) VALUES
(1, 'Differentiation'),
(1, 'Integration'),
(1, 'Limits'),
(2, 'Sin, Cos, Tan'),
(2, 'Identities'),
(2, 'Equations'),
(3, 'Equations'),
(3, 'Polynomials'),
(3, 'Factoring'),
(4, 'Integration by Parts'),
(4, 'Substitution Method'),
(4, 'Partial Fractions');

-- Physics topics
INSERT INTO material_topics (material_id, topic) VALUES
(5, 'Electric Fields'),
(5, 'Magnetic Fields'),
(5, 'Induction'),
(6, 'Reflection'),
(6, 'Refraction'),
(6, 'Lenses'),
(7, 'Newton Laws'),
(7, 'Motion'),
(7, 'Energy');

-- Chemistry topics
INSERT INTO material_topics (material_id, topic) VALUES
(8, 'Hydrocarbons'),
(8, 'Functional Groups'),
(8, 'Reactions'),
(9, 'Ionic Bonding'),
(9, 'Covalent Bonding'),
(9, 'Metallic Bonding');

-- English topics
INSERT INTO material_topics (material_id, topic) VALUES
(10, 'Structure'),
(10, 'Arguments'),
(10, 'Examples'),
(11, 'Parts of Speech'),
(11, 'Tenses'),
(11, 'Sentence Structure'),
(12, 'Poetry Analysis'),
(12, 'Theme Identification'),
(12, 'Character Study'),
(13, 'Narrative Writing'),
(13, 'Descriptive Writing'),
(13, 'Dialogue');

-- Computer Science topics
INSERT INTO material_topics (material_id, topic) VALUES
(14, 'Variables'),
(14, 'Functions'),
(14, 'Loops'),
(15, 'Arrays'),
(15, 'Linked Lists'),
(15, 'Trees'),
(16, 'Classes'),
(16, 'Inheritance'),
(16, 'Polymorphism');

-- ============================================
-- 7. INSERT BOOKMARKS (Sample)
-- ============================================

-- Rahul bookmarks some materials
INSERT INTO bookmarks (student_id, material_id, created_at) VALUES
(1, 2, NOW()),  -- Trigonometry PDF
(1, 3, NOW());  -- Algebra Practice

-- ============================================
-- 8. INSERT ATTENDANCE (Sample)
-- ============================================

-- Last 10 days attendance for Rahul
INSERT INTO attendance (student_id, date, status, marked_by, class_name, created_at) VALUES
(1, DATE_SUB(CURDATE(), INTERVAL 9 DAY), 'PRESENT', 2, '12-A', NOW()),
(1, DATE_SUB(CURDATE(), INTERVAL 8 DAY), 'PRESENT', 2, '12-A', NOW()),
(1, DATE_SUB(CURDATE(), INTERVAL 7 DAY), 'ABSENT', 2, '12-A', NOW()),
(1, DATE_SUB(CURDATE(), INTERVAL 6 DAY), 'PRESENT', 2, '12-A', NOW()),
(1, DATE_SUB(CURDATE(), INTERVAL 5 DAY), 'PRESENT', 2, '12-A', NOW()),
(1, DATE_SUB(CURDATE(), INTERVAL 4 DAY), 'LATE', 2, '12-A', NOW()),
(1, DATE_SUB(CURDATE(), INTERVAL 3 DAY), 'PRESENT', 2, '12-A', NOW()),
(1, DATE_SUB(CURDATE(), INTERVAL 2 DAY), 'PRESENT', 2, '12-A', NOW()),
(1, DATE_SUB(CURDATE(), INTERVAL 1 DAY), 'PRESENT', 2, '12-A', NOW()),
(1, CURDATE(), 'PRESENT', 2, '12-A', NOW());

-- Priya's attendance (perfect attendance)
INSERT INTO attendance (student_id, date, status, marked_by, class_name, created_at) VALUES
(2, DATE_SUB(CURDATE(), INTERVAL 9 DAY), 'PRESENT', 2, '12-A', NOW()),
(2, DATE_SUB(CURDATE(), INTERVAL 8 DAY), 'PRESENT', 2, '12-A', NOW()),
(2, DATE_SUB(CURDATE(), INTERVAL 7 DAY), 'PRESENT', 2, '12-A', NOW()),
(2, DATE_SUB(CURDATE(), INTERVAL 6 DAY), 'PRESENT', 2, '12-A', NOW()),
(2, DATE_SUB(CURDATE(), INTERVAL 5 DAY), 'PRESENT', 2, '12-A', NOW());

-- ============================================
-- VERIFICATION QUERIES (Run these to check data)
-- ============================================

-- Check all data counts
SELECT 'Users' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 'Students', COUNT(*) FROM students
UNION ALL
SELECT 'Subjects', COUNT(*) FROM subjects
UNION ALL
SELECT 'Marks', COUNT(*) FROM marks
UNION ALL
SELECT 'Study Materials', COUNT(*) FROM study_materials
UNION ALL
SELECT 'Material Topics', COUNT(*) FROM material_topics
UNION ALL
SELECT 'Bookmarks', COUNT(*) FROM bookmarks
UNION ALL
SELECT 'Attendance', COUNT(*) FROM attendance;