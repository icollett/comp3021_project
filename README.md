## Assignment 5: Advanced documentation and enhanced security

### Project Overview:
This express API app is the back end interface for managing and interacting with a firbase database that tracks Employee and Branch objects in their own collections. Based on their user roles, users can retrieve and manage documents from these collections to view or change collection contents.

The API supports all basic CRUD operations for both collections through its endpoints. This is useful for updating collections as the details for Employees and Branches change over time.

The API also has a few endpoints for querying collections by specific values to support searches based on document attributes.

## Installation Steps:
This is a Node.js app using Express. Follow the instructions below to set up and run the app.
### Prerequisites:
- [Node.js](https://nodejs.org/) (version 14 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Getting Started:
1. Clone the repository:
   ```bash
   git clone https://github.com/icollett/comp-3018_a2
   cd comp-3018_a2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npm start
   ```

4. Access the app:  
   Open your browser and go to `http://localhost:3000`.

### Environment Setup
- Your firebase-adminsdk.json whould be located in the projects root directory.
- Your .env file should also be in the root directory. The following information should be kept there:
> - NODE_ENV,
> - PORT,
> - FIREBASE_PROJECT_ID,
> - FIREBASE_PRIVATE_KEY,
> - FIREBASE_CLIENT_EMAIL,
> - SWAGGER_SERVER_URL

### Usage:
To send requests to the running API programmatically, you can try something like this javascript example:
```js client
async function fetchEmployeeDetails() {
    const headers = new Headers()
    // Add a few headers
    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json')
    // Add a custom header
    headers.set('X-Custom-Header', 'CustomValue')

    const request = new Request('http://localhost:3000/api/v1/employees/', {
        method: 'GET',
        headers: headers
    })

    try {
      const response = await fetch(request);
      const data = await response.json();
      console.log(data);
    } catch (error) {
        if (error instanceof Error)
            console.error('Error fetching employee details:', error.message);
    }
}

fetchEmployeeDetails();
```
To which the API responds like:
<details>
  <summary>
    Response
  </summary>

  ```json
  {
  status: 'success',
  data: [
    {
      id: '6Uc3STsgBX5JVr831NhD',
      name: 'Michael Brown',
      position: 'Teller',
      department: 'Operations',
      email: 'michael.brown@pixell-river.com',
      phone: '204-555-0187',
      branchID: '3'
    },
    {
      id: '6hS3WfE1YzyG6F5N4Yap',
      name: 'Alice Johnson',
      position: 'Branch Manager',
      department: 'Management',
      email: 'alice.johnson@pixell-river.com',
      phone: '604-555-0148',
      branchID: '1'
    },
    {
      id: 'ERtNOzLjNQ94i0UiZkAF',
      name: 'Maria Garcia',
      position: 'Loan Officer',
      department: 'Loans',
      email: 'maria.garcia@pixell-river.com',
      phone: '204-555-0193',
      branchID: '3'
    }
  ],
  message: 'Employees Retrieved'
}

```
</details>

A POST request could resemble this:

```js client
async function createEmployee() {
    const headers = new Headers()
    // Add a few headers
    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json')
    // Add a custom header
    headers.set('X-Custom-Header', 'CustomValue')

    const request = new Request('http://localhost:3000/api/v1/employees/', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(
            {
                name: 'Gandalf',
                position: 'Trip Advisor',
                department: 'Quest Management',
                email: 'pipeSmoker@theonering.edu',
                phone: '222-222-2222',
                branchID: '9'
            }
        )
    })

    try {
      const response = await fetch(request);
      const data = await response.json();
      console.log(data);
    } catch (error) {
        if (error instanceof Error)
            console.error('Error fetching employee details:', error.message);
    }
}

createEmployee();
```

And the response looks like:
<details>
  <summary>
    Response
  </summary>

  ```json
  {
  status: 'success',
  data: {
    id: 'VLaUtvqMTs4FAHmDb2Jm',
    name: 'Gandalf',
    position: 'Trip Advisor',
    department: 'Quest Management',
    email: 'pipeSmoker@theonering.edu',
    phone: '222-222-2222',
    branchID: '9'
  },
  message: 'Employee created'
}

```
</details>

### Alternatives
You can also use tools like Postman to make requests to the API.

## API-docs:
### Public docs:
https://icollett.github.io/comp-3018_a5-docs/

### View docs locally:
- You can always use your browser to open the openAPI doc index.html file in the api-docs folder.

- When the server is running you can access the docs endpoint at 'http://localhost:3000/api-docs' to see the Swagger documentation.

## Security layers:

The app implements default security configurations for both the Helmet and Cors packages.
```js client
app.use(helmet())
app.use(cors())
```
### [Helmet](https://www.npmjs.com/package/helmet)
sets security headers for api responses to protect against some of the more well-known web vulnerabilities.

Some of the headers set by default include:
- **X-Frame-Options: SAMEORIGIN**, a legacy header meant to help protect against clickjacking attacks. This header is meant for protecting older browsers. There is a more modern Content Security Policy([CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP)) attribute '[frame-ancestors](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors)' used by browsers to protect against things like cross-site-scripting attacks.
- **X-XSS-Protection: 0**, the disabling of a buggy and exploitable legacy header for filtering cross-site-scripting. This legacy header was vulnerable to cross-site Leak([XS-Leaks](https://cybercx.com/blog/cross-site-leaks-attacks/)) attacks, allowing malicious actors to deduce information about the users identity.

### [CORS](https://www.npmjs.com/package/cors#cors)

dictates an access policy using HTTP headers. It indicates what domains and ports other than its own that a browser can load resources from. CORS allows browsers to enforce same-origin policy. The same-origin policy is a security measure that prevents malicious scripts from accessing resources that it should not have access to, like making additional requests to other servers the user never intended.

By the default use of `cors()` here: `Access-Control-Allow-Origin: *`, meaning that currently the app can be accessed by any origin. For more details on configuring specific origins, see the package documentation examples.