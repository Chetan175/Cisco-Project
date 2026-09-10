/**
 * Evaluates the eligibility of a normalized student profile against an array of roles.
 * 
 * Expected role object structure:
 * {
 *   id: "CF01",
 *   name: "Data Operations Intern",
 *   allowedBranches: ["CSE", "IT"],
 *   minCgpa: 7.5,
 *   allowedGradYears: [2027],
 *   maxBacklogs: 1,
 *   requiredSkills: ["Python", "SQL"]
 * }
 */
export function evaluateEligibility(normalizedProfile, roles) {
    const results = [];
    
    // Convert student values to lowercase for case-insensitive matching
    const studentBranchLower = normalizedProfile.branch.toLowerCase();
    const studentSkillsLower = normalizedProfile.skills.map(s => s.toLowerCase());

    for (const role of roles) {
        const failures = [];

        // 1. BRANCH_NOT_ALLOWED
        const allowedBranchesLower = role.allowedBranches.map(b => b.trim().toLowerCase());
        if (!allowedBranchesLower.includes(studentBranchLower)) {
            failures.push('BRANCH_NOT_ALLOWED');
        }

        // 2. CGPA_BELOW_MINIMUM
        if (normalizedProfile.cgpa < role.minCgpa) {
            failures.push('CGPA_BELOW_MINIMUM');
        }

        // 3. GRADUATION_YEAR_NOT_ALLOWED
        if (!role.allowedGradYears.includes(normalizedProfile.graduationYear)) {
            failures.push('GRADUATION_YEAR_NOT_ALLOWED');
        }

        // 4. TOO_MANY_ACTIVE_BACKLOGS
        if (normalizedProfile.activeBacklogs > role.maxBacklogs) {
            failures.push('TOO_MANY_ACTIVE_BACKLOGS');
        }

        // 5. MISSING_SKILL: <skill>
        const missingSkills = [];
        for (const reqSkill of role.requiredSkills) {
            if (!studentSkillsLower.includes(reqSkill.trim().toLowerCase())) {
                missingSkills.push(reqSkill.trim());
            }
        }
        
        // Sort missing skills alphabetically case-insensitively
        missingSkills.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
        
        for (const missing of missingSkills) {
            // Preserving the casing from the role definition (e.g., "Docker")
            failures.push(`MISSING_SKILL: ${missing}`);
        }

        results.push({
            role: role,
            status: failures.length === 0 ? 'ELIGIBLE' : 'INELIGIBLE',
            failures: failures
        });
    }

    return results;
}
