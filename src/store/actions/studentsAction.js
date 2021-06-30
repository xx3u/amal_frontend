import { FETCH_STUDENTS_SUCCESS } from "../actionTypes"
import axios from '../../axiosApi'

export const fetchStudentsSuccess = students => (
     {type: FETCH_STUDENTS_SUCCESS, students}
)

export const fetchStudents = () => (
     async dispatch => {
        try {
            const response = await axios.get('/')
            dispatch(fetchStudentsSuccess(response.data))
        } catch(e) {
            console.log(e)
        }
    }
)