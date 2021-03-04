import React, {useEffect, useState} from 'react';
import { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import axios from 'axios'
import {useHistory} from 'react-router-dom';

import EmployeeImage from './EmployeeImageComponent'
import UpdateEmployeeButton from '../components/buttons/UpdateEmployeeButton'
import EmployeeService from './services/EmployeeService';


const ListEmployeeComponent = () => {
    
    const [employees, setEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false)
    const [employeeToDelete, setEmployeeToDelete] = useState({})
    const history = useHistory()

    console.log(employees)

    const fetchEmployees = () => {
        axios.get('http://localhost:8080/employee/all').then(response => {
            setEmployees(response.data)
        })
    }

    

    const deleteEmployee = (id) => {
        EmployeeService.deleteEmployee(id).then(res => {
            setEmployees(employees.filter(employee => employee.id !== id))
            history.push('/')
            setShowModal(false)
        })
    }

    useEffect(() => {
        fetchEmployees();
    }, []);

    const DeleteDialog = props => {
        const {chosenEmployee} = props

        const handleShow = () => {
            
            setEmployeeToDelete(chosenEmployee)
            setShowModal(true);
        }

        return(
            <>
            <OverlayTrigger transition={false} key="delete-button" placement="top" overlay={
                <Tooltip id="delete-button">Delete Employee</Tooltip>}>
                <Button variant="primary" onClick={() => handleShow()} className="btn bi-person-dash btn-warning btn-sm"></Button>
            </OverlayTrigger>

            <Modal show={showModal} size="sm">
                <Modal.Body>
                <h4>Delete Employee?</h4>
                <p>Please confirm that you want to delete <strong>{employeeToDelete.name}</strong> from database</p>
                
                <Button className="btn-secondary  me-2" onClick={props.onHide}>Cancel</Button>
                <Button className="btn-primary" onClick={() => deleteEmployee(employeeToDelete.id)}>Delete</Button>
                
                </Modal.Body>
            </Modal>
          </>
        )
    }

        return (
            <div className="container-sm mt-5">
                <h1 className = "text-center">Employee List</h1>
                <div className="table-responsive">
                    <table className = "table align-middle">
                        <thead>
                            <tr>
                                <td></td>
                                <td>Employee ID</td>
                                <td>Name</td>
                                <td>Job Title</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map(employee => 
                                    <tr key={employee.id}>
                                        <td className="col-sm"><EmployeeImage image={employee.imageUrl} name={employee.name} /></td>
                                        <td>{employee.id}</td>
                                        <td>{employee.name}</td>
                                        <td>{employee.jobTitle}</td>
                                        <td>
                                            <UpdateEmployeeButton id={employee.id}/>
                                            <DeleteDialog show={showModal} chosenEmployee={employee} onHide={() => setShowModal(false)}/>
                                        </td>
                                    </tr>   
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
}

export default ListEmployeeComponent