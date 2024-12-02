# Software Requirements Specification (SRS)

*Project Name*: Team Management Web Application

# Overview

The purpose of this document is to provide a detailed description of the software requirements for the Team Management Web Application. This document outlines the functional and non-functional requirements, user interfaces, system interactions, and other necessary details needed for the successful development and deployment of the application.

# Software Requirements

The below section provides indepth details of each feature implemented in the application.

## 1. Functional Requirements

### Login/Register Service

| ID  | Requirement |
| :-------------: | :----------: |
| FR1 | Users shall be able to register an account using an email address and password. |
| FR2 | Users shall be able to log in using their credentials. |
| FR3 | The system must validate the credentials during login and provide appropriate error messages for invalid inputs. |
| FR4 | Passwords shall be encrypted, and authentication should be secure. |
| FR5 | Role-based access control (team member, leader) shall be implemented. |

### Team Creation Service

| ID  | Requirement |
| :-------------: | :----------: |
| FR6 | Users must be able to create a new team by providing a team name |
| FR7 | The system must prevent duplicate team names for a single user. |
| FR8 | Team card should display: Team information, including members and tasks, must be stored in the database. |
| FR9 | Team creators shall have admin privileges, allowing them to add or remove team members. |
| FR10 | Admins must be able to view all team details, including member lists and assigned tasks. |

### Join Team Service

| ID  | Requirement |
| :-------------: | :----------: |
| FR11 | User must be able to join team by choosing `TeamName` and entering `email`. |
| FR12 | The system must prevent users from joining the same team multiple times. |
| FR13 | dmins must be able to add member to the team. |
| FR14 | Team members shall be able to update task status ['to-do', 'inprogress', 'done']. |
| FR15 | Users must have the option to leave a team they have joined. |

### Add Task Service

| ID  | Requirement |
| :-------------: | :----------: |
| FR16 | Admins must be able to create tasks by providing a task name, description & assignee. |
| FR17 | Tasks must be assigned to specific team members by the admin. |
| FR18 | Team members must be able to view all tasks assigned to them. |
| FR19 | Each task must have an initial status set to "to-do". |
| FR20 | Tasks must be stored in the database along with their status, assignee, and associated team. |

### Team dasboard

| ID  | Requirement |
| :-------------: | :----------: |
| FR21 | A centralized dashboard should display all the team information. |
| FR22 | The team dasboard must include option to delete other team member for team admin. |
| FR23 | It must provide option to delete the team. |
| FR24 | The system must warn admin when opting for Team deletion, in case of team members existence. |
| FR25 | It must provide an option to Add task to the respective team |


## 2. Non-Functional Requirements

### Security

| ID  | Requirement |
| :-------------: | :----------: |
| NFR1 | All sensitive user data, including passwords, must be encrypted. |
| NFR2 | The system must support HTTPS to secure data transmission. |
| NFR3 | Users should be automatically logged out after 30 minutes of inactivity. |
| NFR4 | Failed login attempts must be restricted to three, followed by a temporary lockout. |
| NFR5 | The system must perform regular vulnerability scans. |

### Performance

| ID  | Requirement |
| :-------------: | :----------: |
| NFR6 | The system must handle up to 500 concurrent users without performance degradation. |
| NFR7 | Task creation and updates must reflect in less than 1 second on the dashboard. |
| NFR8 | Login and registration processes must complete within 2 seconds. |
| NFR9 | The system must scale to support 1000 teams without database performance issues. |
| NFR10 | Notifications must be delivered within 5 seconds of an event trigger. |

### Usability

| ID  | Requirement |
| :-------------: | :----------: |
| NFR11 | The user interface must be intuitive and easy to navigate for all user roles. |
| NFR12 | The system must provide tooltips and help text for all major features. |
| NFR13 | Error messages must clearly indicate the cause and provide guidance for resolution. |
| NFR14 | The application must support copy action for name and details. |
| NFR15 | The application should be responsive with varying screen sizes |

### Scalability

| ID  | Requirement |
| :-------------: | :----------: |
| NFR16 | The application must be able to scale up the tasks upon utilisation. |
| NFR17 | Database queries must be optimized to handle increasing data size. |
| NFR18 | The system must balance user load efficiently when multiple users perform same/similar action. |
| NFR19 | Cloud services must be used to dynamically allocate resources. |
| NFR20 | The system must support integration with third-party APIs without performance issues. |

### Reliability

| ID  | Requirement |
| :-------------: | :----------: |
| NFR21 | The system must have a minimum uptime of 99.9%. |
| NFR22 | All critical user actions must be logged for auditing purposes. |
| NFR23 | The user must be stored, so that user can pick from where he/she left |
| NFR24 | The application must automatically retry failed API calls. |
| NFR25 | Error details should be clearly provided to the user. |

# Change Management Plan
- NA

# Traceability Links

## Use Case Diagram Traceability

## Class Diagram Traceability

## Activity Diagram Traceability

# Software Artifacts