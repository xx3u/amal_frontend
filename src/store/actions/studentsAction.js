import { FETCH_STUDENTS_FAILURE, FETCH_STUDENTS_SUCCESS } from "../actionTypes"
import axios from '../../axiosApi'

export const fetchStudentsSuccess = students => (
     {type: FETCH_STUDENTS_SUCCESS, students}
)

export const fetchStudentsFailure = error => (
     {type: FETCH_STUDENTS_FAILURE, error}
);

export const fetchStudents = () => (
     async dispatch => {
        try {
            const response = await axios.get('/')
            dispatch(fetchStudentsSuccess(response.data))
        } catch(error) {
            if (error.response && error.response.data) {
                dispatch(fetchStudentsFailure(error.response.data));
            } else {
                dispatch(fetchStudentsFailure(error));
            }
        }
    }
)