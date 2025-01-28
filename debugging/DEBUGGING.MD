# Debugging Analysis

## Scenario 1: Verifying getDepartmentEmployees return correctness

-   **Breakpoint Location:** employeeServices.ts line 168
-   **Objective:** Observe the correct selection of employees by department.

### Debugger Observations

-   **Variable States:**
<pre>
> employees = [
  {
    id: "1",
    name: "Alice Johnson",
    position: "Branch Manager",
    department: "Management",
    email: "alice.johnson@pixell-river.com",
    phone: "604-555-0148",
    branchID: "1",
  },
  {
    id: "2",
    name: "Amandeep Singh",
    position: "Customer Service Representative",
    department: "Customer Service",
    email: "amandeep.singh@pixell-river.com",
    phone: "780-555-0172",
    branchID: "2",
  },
  {
    id: "3",
    name: "Maria Garcia",
    position: "Loan Officer",
    department: "Loans",
    email: "maria.garcia@pixell-river.com",
    phone: "204-555-0193",
    branchID: "3",
  },
  {
    id: "4",
    name: "James Wilson",
    position: "IT Support Specialist",
    department: "IT",
    email: "james.wilson@pixell-river.com",
    phone: "604-555-0134",
    branchID: "1",
  },
  {
    id: "5",
    name: "Chen Wei",
    position: "Senior Loan Officer",
    department: "Loans",
    email: "chen.wei@pixell-river.com",
    phone: "204-555-0218",
    branchID: "5",
  },
]
> department = "Loans"
> departmentEmployees = {
  staff: [
    {
      id: "3",
      name: "Maria Garcia",
      position: "Loan Officer",
      department: "Loans",
      email: "maria.garcia@pixell-river.com",
      phone: "204-555-0193",
      branchID: "3",
    },
    {
      id: "5",
      name: "Chen Wei",
      position: "Senior Loan Officer",
      department: "Loans",
      email: "chen.wei@pixell-river.com",
      phone: "204-555-0218",
      branchID: "5",
    },
  ],
}
</pre>
-   **Call Stack:** This function was called from a jest test run.
-   **Behavior:** Properly iterated over 'employees' and only added persons with department of 'Loans' to return value departmentEmployees 'staff' list.

### Analysis

-   What did you learn from this scenario?
  > That it probably was not necessary to define a new interface just to store a list of Employees in it.
-   Did you observe any unexpected behavior? If so, what might be the cause?
  > It worked as expected, nothing is special about iterating over the the list 'employees'.
-   Are there areas for improvement or refactoring in this part of the code?:
  > Just changing 'departmentEmployees' to be a Employee[] instead of a new interface type.
-   How does this enhance your understanding of the overall project?:
  > If there was a requirement for more department information, then creating a new interface for storing more then just employees would make sense. Otherwise its just not needed to go about creating new types for each service.

## Scenario 2: Verify updateBranch function

-   **Breakpoint Location:** branchService.ts line 84
-   **Objective:** Verufy that branch with the specified ID is having its information updated.

### Debugger Observations

-   **Variable States:**
<pre>
> branches(before) = [
  {
    id: "1",
    name: "Vancouver Branch",
    address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
    phone: "604-456-0022",
  },
]
> origionalBranch = {
  id: "1",
  name: "Vancouver Branch",
  address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
  phone: "604-456-0022",
}
> branch = {
  name: "Sydney Branch",
  phone: "604-456-0023",
}
</pre>
-   **Call Stack:** Called from a jest test case in branchService.test.ts.
-   **Behavior:** Correctly destructures and updates the branch object with ID: "1".

### Analysis

-   What did you learn from this scenario?
  > How to easily destructure and combine objects in a way that leaves some fields alone.
-   Did you observe any unexpected behavior? If so, what might be the cause?
  > Nothing unexpected happened, the search for the Branch object by ID worked. No errors happened during the destructuring process wither.
-   Are there areas for improvement or refactoring in this part of the code?:
  > Nothing comes to mind, it was fairly straightforward.
-   How does this enhance your understanding of the overall project?:
  > I can use destructuring to not only parse out the fields of objects but also overwrite object fields using optional input parameters pretty easily.

## Scenario 3: Verify createEmployee correctness

-   **Breakpoint Location:** employeeService.ts line 65
-   **Objective:** Check the recieved input values are destructured into an Employee object along with the updated ID counter and add the resulting Employee to the 'employees' list.

### Debugger Observations

-   **Variable States:**
<pre>
> idCounter = 1
> employee = {
  name: "Alice Johnson",
  position: "Branch Manager",
  department: "Management",
  email: "alice.johnson@pixell-river.com",
  phone: "604-555-0148",
  branchID: "1",
}
> newEmployee = {
  id: "1",
  name: "Alice Johnson",
  position: "Branch Manager",
  department: "Management",
  email: "alice.johnson@pixell-river.com",
  phone: "604-555-0148",
  branchID: "1",
}
> exports.employees[0] = {
  id: "1",
  name: "Alice Johnson",
  position: "Branch Manager",
  department: "Management",
  email: "alice.johnson@pixell-river.com",
  phone: "604-555-0148",
  branchID: "1",
}
</pre>
-   **Call Stack:** Called in the jest test of employeeService.test.ts.
-   **Behavior:** Destructures input 'employee' and merges it with 'idCounter' correctly create 'newEmployee'. Then adds the new object to the 'employees' list.

### Analysis

-   What did you learn from this scenario?
  > How to merge partial data collections with other stored variables to create new objects efficiently.
-   Did you observe any unexpected behavior? If so, what might be the cause?
  > No unexpected behaviour. Evenerything works as intended.
-   Are there areas for improvement or refactoring in this part of the code?:
  > Perhaps some defensive checks to validate all expected input fields are present and have a value that is not empty/incorrect.
-   How does this enhance your understanding of the overall project?:
  > Learned an clean way of dynamically creating objects using smaller objects. With this I can combine smaller sets of data into larger objects quickly.