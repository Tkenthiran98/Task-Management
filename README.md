 Task Management Web Application
This project is a task management web application built with React.js for the frontend and Spring Boot for the backend. The frontend is integrated with a backend API for managing tasks. It allows users to create, edit, delete, and filter tasks based on their status and assigned team member.
Features:

•	Create new tasks with title, description, and status
•	Edit existing tasks
•	Delete tasks
•	Filter tasks by status or assigned team member

Technologies Used:
- React.js
- Axios for HTTP requests
- CSS for styling
- Spring Boot for the backend API 
- MySQL database 
- VS Code editor 
- Postman for API testing
- XAMPP Server 

Installation:
1.	Clone the repository to your local machine.
2.	Navigate to the project directory.
3.	Install dependencies by running npm install or yarn install.
   
How to Run:
1.	Start the development server by running npm start or yarn start.
2.	Open your web browser and go to http://localhost:3000 to view the application.

 task-management-frontend folder structure
 
├── node_modules          # Dependencies installed via npm/yarn
├── public                # Public assets and HTML template
└── src                   # Source code directory
    ├── components        # Directory for React components
    │   ├── JS            # JavaScript files for components
    │   │   ├── Dashboard.css        # CSS file for Dashboard component
    │   │   ├── Dashboard.js         # React component for dashboard
    │   │   ├── EditTaskPopup.css    # CSS file for EditTaskPopup component
    │   │   ├── EditTaskPopup.js     # React component for editing task popup
    │   │   ├── Task.js              # React component for individual task
    │   │   ├── TaskForm.css         # CSS file for TaskForm component
    │   │   ├── TaskForm.js          # React component for task form
    │   │   └── TaskList.js          # React component for task list
    │   └── services       # Directory for services/utilities
    │       └── TaskService.js       # Service file for managing tasks
    ├── App.css            # CSS file for the main App component
    └── App.js             # Main React component


Backend Folder Structure:
•	Controller/: Contains the controllers for handling HTTP requests.
•	TaskController.java: Controller for managing tasks.
•	dto/: Contains data transfer objects (DTOs) used for request and response mapping.
•	TaskDTO.java: DTO for task data.
•	Task.java: Entity class representing a task.
•	repositories/: Contains repositories for database operations.
•	TaskRepository.java: Repository interface for tasks.
•	services/: Contains service classes for business logic.
•	TaskService.java: Interface for task services.
•	TaskServiceImpl.java: Implementation of task services.
•	util/: Contains utility classes.
•	CorsConfig.java: Configuration for Cross-Origin Resource Sharing (CORS).
•	EndpointBundle.java: Bundle class for API endpoints.
•	ResponseWrapper.java: Wrapper class for API responses.
•	ValidationMessages.java: Constants for validation messages.
•	TaskManagementApplication.java: Main class for running the Spring Boot application.

GitHub Repository:
You can find the GitHub repository for this project https://github.com/Tkenthiran98/Task-Management.git Make sure to include the README file in the repository.
Instructions to Run Locally:
1.	Clone the GitHub repository to your local machine using the git clone command.
2.	Navigate to the project directory.
3.	Install dependencies using npm install or yarn install.
4.	Start the development server with npm start or yarn start.
5.	Open your web browser and go to http://localhost:3000 to view the application.
