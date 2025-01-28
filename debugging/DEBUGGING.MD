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

## Scenario 2:

-   **Breakpoint Location:** 
-   **Objective:** 

### Debugger Observations

-   **Variable States:**
<pre>
> 
</pre>
-   **Call Stack:** 
-   **Behavior:** 

### Analysis

-   What did you learn from this scenario?
  > 
-   Did you observe any unexpected behavior? If so, what might be the cause?
  > 
-   Are there areas for improvement or refactoring in this part of the code?:
  >
-   How does this enhance your understanding of the overall project?:
  >

## Scenario 3:

-   **Breakpoint Location:** 
-   **Objective:** 

### Debugger Observations

-   **Variable States:**
<pre>
> 
</pre>
-   **Call Stack:** 
-   **Behavior:** 

### Analysis

-   What did you learn from this scenario?
  > 
-   Did you observe any unexpected behavior? If so, what might be the cause?
  > 
-   Are there areas for improvement or refactoring in this part of the code?:
  >
-   How does this enhance your understanding of the overall project?:
  >