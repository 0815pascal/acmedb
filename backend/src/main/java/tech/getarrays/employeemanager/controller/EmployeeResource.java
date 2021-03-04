package tech.getarrays.employeemanager.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.getarrays.employeemanager.model.Employee;
import tech.getarrays.employeemanager.service.EmployeeService;

import java.util.List;

@RestController // Defines this as a RestController
@RequestMapping("/employee") // sets the base-URL for the whole class
public class EmployeeResource {
    private final EmployeeService employeeService;

    public EmployeeResource(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    // GET-Request to retrieve all the information from backend
    @GetMapping("/all") // The URL "/employee/all" is going to return a list of all employees
    // This method returns a list of all employees
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = employeeService.findAllEmployees(); // Calls the service that returns a list of all Employees
        // This returns a 200 (OK) to the user, so he knows everything went fine
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    // Pass in the ID as a path-parameter
    @GetMapping("/find/{id}")
    // Returns only a specific employee
    // @PathVariable allows to access the id-variable that has been passed in the URL
    public ResponseEntity<Employee> getEmployeeById(@PathVariable("id") Long id) {
        Employee employee = employeeService.findEmployeeById(id);
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }

    // We're using here a POST-request because we're making an actual change in the backend
    @PostMapping("/add")
    /* @RequestBody is what we get as a request body which will be in our case a
        JSON-object of type Employee */
    public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee) {
        Employee newEmployee = employeeService.addEmployee(employee);
        // HttpStatus.CREATED means we've created something on the server
        return new ResponseEntity<>(newEmployee, HttpStatus.CREATED);
    }

    // @PutMapping because we're updating existing data
    @PutMapping("/update")
    public ResponseEntity<Employee> updateEmployee(@RequestBody Employee employee) {
        Employee updateEmployee = employeeService.updateEmployee(employee);
        return new ResponseEntity<>(updateEmployee, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    // Because this method doesn't return anything we use a <?> in the ResponseEntity
    public ResponseEntity<?> deleteEmployee(@PathVariable("id") Long id) {
        employeeService.deleteEmployee(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
