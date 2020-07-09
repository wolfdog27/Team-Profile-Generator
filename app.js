const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];

console.log("Welcome to Team Profile Generator");


function createTeam() {
    inquirer.prompt({
        type: "list",
        choices: [
            "Add Engineer?",
            "Add Intern?",
            "Add Manager?",
            "Create Team Page?"],
        name: "choice",
        message: "Would you like to...?",

    }).then(function ({ choice }) {

        
        switch (choice) {
            case "Add Engineer?":
                // console.log("You added an Engineer")
                makeEngineer();
                break;

            case "Add Intern?":
                // console.log("You added an Intern")
                makeIntern();
                break;

            case "Add Manager?":
                // console.log("You added a Manager")
                makeManager();
                break;

            case "Create Team Page?":
                if (teamMembers.length >0) {
                console.log("Let's Go!")
                fs.writeFile(outputPath, render(teamMembers), function(err) {
                    if (err) {
                            return console.log(err);
                        }
                        console.log("Congratulations!  Team complete.");
                })

            } else {
                console.log("Oops!  We need to add some members!")
                createTeam ();
            }                  
            break;

            default:

                
                break;

        }
    })
}



function makeEngineer() {
    inquirer.prompt([
        {
            type: "input",
            message: "Engineer's Name?",
            name: "name"
        },
        {
            type: "input",
            message: "Engineer's Id?",
            name: "id"
        },
        {
            type: "input",
            message: "Engineer's E-mail?",
            name: "email"
        },
        {
            type: "input",
            message: "Engineer's GitHub Name?",
            name: "github"
        },
    ]).then(function(answers){
        const newEngineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        teamMembers.push(newEngineer);
     
        createTeam();

    })
}

function makeIntern() {
    inquirer.prompt([
        {
            type: "input",
            message: "Intern's Name?",
            name: "name"
        },
        {
            type: "input",
            message: "Intern's Id?",
            name: "id"
        },
        {
            type: "input",
            message: "Intern's E-mail?",
            name: "email"
        },
        {
            type: "input",
            message: "Intern's School?",
            name: "school"
        },
    ]).then(function(answers){
        const newIntern = new Intern(answers.name, answers.id, answers.email, answers.school);
        teamMembers.push(newIntern);
     
        createTeam();

    })
}

function makeManager() {
    inquirer.prompt([
        {
            type: "input",
            message: "Manager's Name?",
            name: "name"
        },
        {
            type: "input",
            message: "Manager's Id?",
            name: "id"
        },
        {
            type: "input",
            message: "Manager's E-mail?",
            name: "email"
        },
        {
            type: "input",
            message: "Manager's Office Number?",
            name: "officeNumber"
        },
    ]).then(function(answers){
        const newManager = new Engineer(answers.name, answers.id, answers.email, answers.officeNumber);
        teamMembers.push(newManager);
     
        createTeam();

    })
}

createTeam();




// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
