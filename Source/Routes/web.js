import express from 'express'
import MentorController from '../Controller/mentorController.js'

const router = express.Router()

router.get('/', MentorController.mentorList)
router.post('/mentor-create', MentorController.mentorAdd)
router.get('/students', MentorController.studentList)
router.post('/student-create', MentorController.studentAdd)
router.put('/assign-student-to-mentor/:id', MentorController.selectStudent)
router.get('/mentor/:id', MentorController.selectMentorById)
router.get('/mentor/:mentorName/students', MentorController.mentorStudents)
router.get('/students/:name', MentorController.studentAll)


export default router