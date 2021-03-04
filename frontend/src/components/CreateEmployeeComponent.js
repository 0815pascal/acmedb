import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom'
import EmployeeService from './services/EmployeeService';

const CreateEmployeeComponent = () => {
    const [newEmployee, setNewEmployee] = useState({
        name: '',
        email: '',
        phone: '',
        jobTitle: '',
        imageUrl: ''
    })

    const [imageClass, setImageClass] = useState('-img')
    const history = useHistory();

    useEffect(() => {
        if(newEmployee.imageUrl !== ''){
            setImageClass('employee-img')
        }
    }, [newEmployee.imageUrl])


    const cancel = () => {
        history.push('/');
    }

    const save = (e) => {
        e.preventDefault()
        
        EmployeeService.createEmployee(newEmployee).then(response => {
            history.push('/')
        })
    }


    return (
        <div>
            <div className="container mt-5" >
                <div className="row"  >
                    <div className="card col-md-6 offset-md-3" style={{maxWidth: '540px'}}>
                        <h3 className="text-center mt-3">Add Employee</h3>

                        <img src={newEmployee.imageUrl} className={`${imageClass} mx-auto d-block rounded-circle`} title={(newEmployee.name && newEmployee.imageUrl) ? newEmployee.name : ''} onError={(e)=>{e.target.src='/placeholder.png'}}  alt="New Employee" width="200" height="200"/>

                        <div className="card-body text-start">
                            <form>
                                <div className="form-group m-3">
                                    <label className="form-label">Full Name*</label>
                                    <input placeholder="Bill Gates" name="name" className="form-control" required
                                        value={newEmployee.name} onChange={e => setNewEmployee({...newEmployee, name: e.target.value})}
                                    />
                                </div>
                                <div className="form-group m-3">
                                    <label>Email*</label>
                                    <input placeholder="bill.gates@acme.com" name="email" className="form-control" required
                                        value={newEmployee.email} onChange={e => setNewEmployee({...newEmployee, email: e.target.value})}
                                    />
                                </div>
                                <div className="form-group m-3">
                                    <label>Job Title</label>
                                    <input placeholder="Intern" name="jobTitle" className="form-control" 
                                        value={newEmployee.jobTitle} onChange={e => setNewEmployee({...newEmployee, jobTitle: e.target.value})}
                                    />
                                </div>
                                <div className="form-group m-3">
                                    <label>Phone</label>
                                    <input placeholder="(206) 709-3400" name="phone" className="form-control" 
                                        value={newEmployee.phone} onChange={e => setNewEmployee({...newEmployee, phone: e.target.value})}
                                    />
                                </div>
                                <div className="form-group m-3">
                                    <label>Image-Url</label>
                                    <input placeholder="https://myhero.com/images/guest/g285052/hero107070/Young-Bill-Gates.jpg" name="imageUrl" className="form-control" 
                                        value={newEmployee.imageUrl} onChange={e => setNewEmployee({...newEmployee, imageUrl: e.target.value})}
                                    />
                                </div>
                                <div className="form-group m-3">
                                    <button type="submit" className="btn btn-primary me-1" onClick={save}>Save</button>
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

export default CreateEmployeeComponent