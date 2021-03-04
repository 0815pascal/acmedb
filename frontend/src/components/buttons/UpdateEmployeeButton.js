import React, {useRef} from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import {useHistory} from 'react-router-dom'

function UpdateEmployeeButton(props) {
    const target = useRef(null)

    const history = useHistory()

    const editEmployee = (id) => {
        history.push(`employee/update/${id}`)
    }

    return(
        <div className="btn-group me-2">
            <OverlayTrigger transition={false} key="delete-button" placement="top" overlay={
                <Tooltip id="delete-button">Update Employee Data</Tooltip>
            }>
                <Button ref={target} onClick={() => editEmployee(props.id)} className="btn bi-pen btn-secondary btn-sm" ></Button>
            </OverlayTrigger>
        </div>
    )
}

export default UpdateEmployeeButton