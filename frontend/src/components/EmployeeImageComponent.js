import React from 'react';

const EmployeeImage = ({image, name}) => {
    const initials = name.split(" ").map((n) => n[0]).join("")

    return(
        image !== '' ?
            <div className="avatar">
                <img src={image} alt="user" title={name} className="avatar-img rounded-circle"/>
            </div>
        : 
        <div className="avatar">
            <span className="avatar-text avatar-text-primary rounded-circle">
                <span className="initial-wrap">
                    <span>{initials}</span>
                </span>
            </span>
        </div>
    )
}

export default EmployeeImage