//Students Sample Data for Context
export const students = [
    {
        id: "STU01",
        name: "Student 1",
        branch: "CSE",
        cgpa: 8.1,
        graduationYear: 2027,
        activeBacklogs: 1,
        skills: ["Git", "Python", "SQL"]
    }, {
        id: "STU02",
        name: "Student 2",
        branch: "ECE",
        cgpa: 7.5,
        graduationYear: 2027,
        activeBacklogs: 0,
        skills: ["Git"]
    }
];

export const roles = [
    {
        id: "CF01",
        name: "Data Operations Intern",
        allowedBranches: ["CSE", "IT"],
        minCgpa: 7.5,
        allowedGradYears: [2027],
        maxBacklogs: 1,
        requiredSkills: ["Python", "SQL"]
    },
    {
        id: "CF02",
        name: "QA Automation Intern",
        allowedBranches: ["CSE", "ECE", "IT"],
        minCgpa: 7.0,
        allowedGradYears: [2027, 2028],
        maxBacklogs: 1,
        requiredSkills: ["Git"]
    },
    {
        id: "CF03",
        name: "Embedded Systems Intern",
        allowedBranches: ["ECE", "EEE"],
        minCgpa: 7.5,
        allowedGradYears: [2027],
        maxBacklogs: 1,
        requiredSkills: ["Git"]
    },
    {
        id: "CF04",
        name: "Machine Learning Intern",
        allowedBranches: ["CSE", "IT"],
        minCgpa: 8.5,
        allowedGradYears: [2027],
        maxBacklogs: 1,
        requiredSkills: ["Python"]
    },
    {
        id: "CF05",
        name: "Platform Engineering Intern",
        allowedBranches: ["CSE", "ECE"],
        minCgpa: 7.0,
        allowedGradYears: [2026],
        maxBacklogs: 0,
        requiredSkills: ["Docker", "Git"]
    }
];
