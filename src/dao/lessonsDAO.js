import { db } from '../../config/db.js'

export const lessonsDAO = async filters => {

    const offset = (filters.page - 1) * filters.lessonsPerPage
    const limit = filters.lessonsPerPage

    let query = db('lessons')
        .select('lessons.id', 'lessons.date', 'lessons.title', 'lessons.status')
        .count('lesson_students.lesson_id as visitCount')
        .leftJoin('lesson_students', 'lessons.id', 'lesson_students.lesson_id')
        .groupBy('lessons.id')


    query = query.offset(offset).limit(limit)

    const lessons = await query

    const result = lessons.map(async lesson => {
        const students = await db('lesson_students')
            .select('students.id', 'students.name', 'lesson_students.visit')
            .join('students', 'lesson_students.student_id', 'students.id')
            .where('lesson_students.lesson_id', lesson.id)

        const teachers = await db('lesson_teachers')
            .select('teachers.id', 'teachers.name')
            .join('teachers', 'lesson_teachers.teacher_id', 'teachers.id')
            .where('lesson_teachers.lesson_id', lesson.id)

        return {
            id: lesson.id,
            date: lesson.date,
            title: lesson.title,
            status: lesson.status,
            visitCount: lesson.visitCount,
            students,
            teachers,
        }
    })
    
    return Promise.all(result)
}