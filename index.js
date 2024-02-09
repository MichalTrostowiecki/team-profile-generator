const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.
const managerPrompt = [
    {
        type: "input",
        name: "name",
        message: "Enter Manager's name"
    },
    {
        type: "input",
        name: "employeeId",
        message: "Enter Employee ID"
    },
    {
        type: "input",
        name: "email",
        message: "Enter Manager's email adress"
    },
    {
        type: "input",
        name: "officeNumber",
        message: "Enter office number"
    }

]

const userChoicePrompt = [
    {
        type: "list",
        name: "userChoice",
        message: "What do you want to do now?",
        choices: ["Add an engineer", "Add an intern", "Finish building Team"]
    }
]

const engineerPrompt = [  
    {
        type: "input",
        name: "name",
        message: "Enter engineer's name"
    },
    {
        type: "input",
        name: "employeeId",
        message: "Enter Engineer's ID"
    },
    {
        type: "input",
        name: "email",
        message: "Enter Engineer's email adress"
    },
    {
        type: "input",
        name: "github",
        message: "Enter Github username"
    }
]

const internPrompt = [
    {
        type: "input",
        name: "name",
        message: "Enter Intern's name"
    },
    {
        type: "input",
        name: "employeeId",
        message: "Enter Intern's ID"
    },
    {
        type: "input",
        name: "email",
        message: "Enter Intern's email adress"
    },
    {
        type: "input",
        name: "school",
        message: "Enter school"
    }
]




async function init() {
    const team = []
    let assigningTeam = true;
    
    const managerDetails = await inquirer.prompt(managerPrompt);

    const manager = new Manager(
        managerDetails.name,
        managerDetails.employeeId,
        managerDetails.email,
        managerDetails.officeNumber
    );
    
    team.push(manager);

    while (assigningTeam) {
        const userSelection = await inquirer.prompt(userChoicePrompt);

        switch (userSelection.userChoice) {

            case "Add an engineer":
                const engineerAnswers = await inquirer.prompt(engineerPrompt);
                const engineer = new Engineer(
                    engineerAnswers.name,
                    engineerAnswers.employeeId,
                    engineerAnswers.email,
                    engineerAnswers.github
                )
                team.push(engineer);
                break;
            
            case "Add an intern":
                const internAnswers = await inquirer.prompt(internPrompt);
                const intern = new Intern(
                    internAnswers.name,
                    internAnswers.employeeId,
                    internAnswers.email,
                    internAnswers.school
                )
                team.push(intern);
                break;

            case "Finish building Team":
                assigningTeam = false;
                break;
       }
    }

    console.log(team)
    


}

init();


//Add an engineer", "Add an intern", "Finish building Team