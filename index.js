const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


const managerPrompt = require("./src/questions/managerPrompt.js");

const userChoicePrompt = require("./src/questions/userChoicePrompt.js");

const engineerPrompt = require("./src/questions/engineerPrompt");

const internPrompt = require("./src/questions/internPrompt");

// TODO: Write Code to gather information about the development team members, and render the HTML file.
 




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

    const htmlTemplate = render(team);

    fs.writeFile(outputPath, htmlTemplate, (err) => {
        err ? console.error(err) : console.log("Sucess");
    })
}


init();
