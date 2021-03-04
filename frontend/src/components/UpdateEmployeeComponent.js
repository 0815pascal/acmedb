import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom'
import EmployeeService from './services/EmployeeService';
import { Alert, Container } from 'react-bootstrap';

const UpdateEmployeeComponent = () => {

    // Initialize Data for given employee
    let { id } = useParams();

    const initEmployee = {
        id: null,
        name: '',
        email: '',
        phone: '',
        jobTitle: '',
        imageUrl: ''
    }

    const [employee, setEmployee] = useState(initEmployee)

    
    
    useEffect(() => {
        const getEmployee = () => {
            EmployeeService.getEmployeeById(id).then((res) => {
                setEmployee(res.data)
            }) 
        } 
        getEmployee()
    },[id])


    

    const [imageClass, setImageClass] = useState('-img')
    const history = useHistory();
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if(employee.imageUrl !== ''){
            setImageClass('employee-img')
        }
    }, [employee.imageUrl])


    const cancel = () => {
        history.push('/');
    }

    const updateEmployee = (e) => {
        e.preventDefault()
        
        EmployeeService.updateEmployee(employee).then(response => {

            setShowAlert(true)
        })
    }

    const UpdateSuccess = () => {

      
        if (showAlert) {
          return (
              <Container className="container mt-3 " >
                <Alert variant="success" onClose={() => setShowAlert(false)} dismissible className="mb-0">
                <Alert.Heading>Success!</Alert.Heading>
                <p>Data has successfully been updated</p>
                </Alert>
            </Container>
          );
        }
        return null
    }


    return (
        <div>
            <div className="container mt-5">
                <div className="row"  >
                    <div className="card col-md-6 offset-md-3" style={{maxWidth: '540px'}}>
                        <h3 className="text-center mt-3">Update Employee</h3>

                        <img src={employee.imageUrl} className={`${imageClass} mx-auto d-block rounded-circle`} title={(employee.name && employee.imageUrl) ? employee.name : ''} onError={(e)=>{e.target.src='/placeholder.png'}}  alt="New Employee" width="200" height="200"/>
                        <UpdateSuccess className="mt-3"/>
                        <div className="card-body text-start">
                            <form>
                                <div className="form-group m-3">
                                    <label className="form-label">Full Name*</label>
                                    <input placeholder="Bill Gates" name="name" className="form-control" required
                                        value={employee.name} onChange={e => setEmployee({...employee, name: e.target.value})}
                                    />
                                </div>
                                <div className="form-group m-3">
                                    <label>Email*</label>
                                    <input placeholder="bill.gates@acme.com" name="email" className="form-control" required
                                        value={employee.email} onChange={e => setEmployee({...employee, email: e.target.value})}
                                    />
                                </div>
                                <div className="form-group m-3">
                                    <label>Job Title</label>
                                    <input placeholder="Intern" name="jobTitle" className="form-control" 
                                        value={employee.jobTitle} onChange={e => setEmployee({...employee, jobTitle: e.target.value})}
                                    />
                                </div>
                                <div className="form-group m-3">
                                    <label>Phone</label>
                                    <input placeholder="(206) 709-3400" name="phone" className="form-control" 
                                        value={employee.phone} onChange={e => setEmployee({...employee, phone: e.target.value})}
                                    />
                                </div>
                                <div className="form-group m-3">
                                    <label>Image-Url</label>
                                    <input placeholder="https://myhero.com/images/guest/g285052/hero107070/Young-Bill-Gates.jpg" name="imageUrl" className="form-control" 
                                        value={employee.imageUrl} onChange={e => setEmployee({...employee, imageUrl: e.target.value})}
                                    />
                                </div>
                                <div className="form-group m-3">
                                    <button type="submit" className="btn btn-primary me-1" onClick={updateEmployee}>Update</button>
                                    <button type="cancel" className="btn btn-secondary" onClick={cancel}>Cancel</button>
                                </div>
                                <small>* Required</small>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateEmployeeComponent