# Debugging Analysis A3

## Scenario 1: Joi validation error construction.

-   **Breakpoint Location:** validate.ts line 37
-   **Objective:** Asses the proper construction of a ValidationError message.

### Debugger Observations

-   **Variable States:**
<pre>
> data = {
  name: "",
  position: "",
  department: "IT",
  email: "christopher.white.pixell-river.com",
  phone: "hdbanfksd",
  branchID: "1",
}

> error.details = [
  {
    message: "Name cannot be empty",
    path: [
      "name",
    ],
    type: "string.empty",
    context: {
      label: "name",
      value: "",
      key: "name",
    },
  },
  {
    message: "Position cannot be empty.",
    path: [
      "position",
    ],
    type: "string.empty",
    context: {
      label: "position",
      value: "",
      key: "position",
    },
  },
  {
    message: "Invalid email format.",
    path: [
      "email",
    ],
    type: "string.pattern.base",
    context: {
      name: undefined,
      regex: {
      },
      value: "christopher.white.pixell-river.com",
      label: "email",
      key: "email",
    },
  },
  {
    message: "Invalid phone number format.",
    path: [
      "phone",
    ],
    type: "string.pattern.base",
    context: {
      name: undefined,
      regex: {
      },
      value: "hdbanfksd",
      label: "phone",
      key: "phone",
    },
  },
]

> err = {
  type: "Validation Error",
  code: "422",
  statusCode: 422,
  message: "Validation error: Name cannot be empty, Position cannot be empty., Invalid email format., Invalid phone number format."
}
</pre>
-   **Call Stack:** Called via the router from validateRequest.
-   **Behavior:** Triggered schema messages based on field evaluations.

### Analysis

-   What did you learn from this scenario?
> That 'string.pattern.base' was the conditional that string().regex() uses to trigger a custom message, not 'object.regex'.
-   Did you observe any unexpected behavior? If so, what might be the cause?
> The unusual behaviour I noted when setting up and testing my schemas was that 'string.regex' and 'object.regex' did not seem to trigger custom messages for string().regex() evaluations.
-   Are there areas for improvement or refactoring in this part of the code?:
> I already did some refactoring with 'string.pattern.base', I don't know enough about Joi yet to know if more areas need improving.
-   How does this enhance your understanding of the overall project?:
> Learning and organizing the conditions for validation so they are evaluated from the top-down has taught me about how schema evaluations are carried out.

## Scenario 2: Firestore createDocument for createEmployee

-   **Breakpoint Location:** firestoreRepository.ts line 35
-   **Objective:** Check state of DocumentReference promise returned after db.collection.add().

### Debugger Observations

-   **Variable States:**
<pre>
> data = {
  name: "Walter White",
  position: "Chemistry Professor",
  department: "Chemical Engineering",
  email: "walter.white@pixell-river.com",
  phone: "204-222-2222",
  branchID: "6",
}

> docRef._path.segments = [
  "Employees",
  "gGXcN3ewNp2czLV72cOW",
]
</pre>
-   **Call Stack:** router > next > createEmployee > createDocument
-   **Behavior:** Generates a DocumentReference successfully that identifies both the collection it is in along with its reference ID.

### Analysis

-   What did you learn from this scenario?
> References are returned only after a document has been created and added successfully to the backend.
-   Did you observe any unexpected behavior? If so, what might be the cause?
> No unexpected behaviour here, all the data was validated beforehand.
-   Are there areas for improvement or refactoring in this part of the code?:
Not that I am aware of, this was a simple collection addition.
-   How does this enhance your understanding of the overall project?:
> It has showed my how to integrate with firebase for basic operations.

## Scenario 3: Error response identification check

-   **Breakpoint Location:** errorHandler.ts line 112
-   **Objective:** Verify error has been correctly identified by instanceOf evaluation.

### Debugger Observations

-   **Variable States:**
<pre>
> req.body = {
  name: "",
  position: "",
  department: "IT",
  email: "christopher.white.pixell-river.com",
  phone: "hdbanfksd",
  branchID: "1",
}

> err = {
  type: "Validation Error",
  code: "422",
  statusCode: 422,
  message: "Validation error: Name cannot be empty, Position cannot be empty., Invalid email format., Invalid phone number format."
}
</pre>
-   **Call Stack:** router > next > router(process_params) > layer.handle_error > errorHandler
-   **Behavior:** 

### Analysis

-   What did you learn from this scenario?
> errorHandler is only called when another function calls next(error).
-   Did you observe any unexpected behavior? If so, what might be the cause?
> I noticed my validateRequest was not trigging errorHandler, but i was still getting normal error responses, when I checked it was because next(error) was not called.
-   Are there areas for improvement or refactoring in this part of the code?:
> I fixed it and made sure to call next(error) in validateRequest.
-   How does this enhance your understanding of the overall project?:
> Middleware will not catch errors just because they are thrown, they still have to be passed the information and invoked.