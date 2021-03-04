import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/employee/"

class EmployeeService {

    createEmployee(employee){
        return axios.post(EMPLOYEE_API_BASE_URL + 'add', employee)
    }

    updateEmployee(employee){
        return axios.put(EMPLOYEE_API_BASE_URL + 'update', employee)
    }

    getEmployeeById(employeeId) {
        return axios.get(EMPLOYEE_API_BASE_URL + 'find/' + employeeId)
    }

    deleteEmployee(employeeId) {
        return axios.delete(EMPLOYEE_API_BASE_URL + 'delete/' + employeeId)
    }

}

export default new EmployeeService()