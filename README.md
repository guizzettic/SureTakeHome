# Sure TakeHome


## Tech Used:
- Create React App to initialize project
- Material UI as my CSS library


## Architectural Overview:
- App component:
  - that handles top-level state for the application (such as a users Policy Information)
  - renders UserInfo && Quote Info component
  - requests initial quote information from user
- UserInfo component:
  - that renders form and keeps track of its respective state
  - validates form data before allowing access to request quote
- QuoteInfo component:
  - Displays users quote information
  - Renders DialogBody 
- DialogBody component: 
  - Dropdown component allowing user to fetch customize rates
  - Clarification modals for user
- Utils file 


## Reflections/Justifications:
- Decided based on the application a more robust state management solution wasn't necessary as props were not passed down more than one level
- Decided to use Material UI for it's ease of use/documentation and not having to recreate a lot of functionality

## Things I'd work on next wtih more time:
- Simplify/improve styling on DialogBody
- Implement testing
- Improve view on mobile devices
- Improve on form validation UI

## How to run:
- clone repository
- run npm i
- run npm start
