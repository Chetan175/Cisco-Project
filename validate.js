export function validateProfile(profile) {
    const errors = [];
    const normalizedProfile = { ...profile };

    // 1. Normalize Branch: Trim whitespace
    normalizedProfile.branch = (profile.branch || '').trim();

    // 2. Normalize Skills: Split by commas, trim, ignore empty, remove duplicates case-insensitively
    const rawSkills = String(profile.skills || '');
    const skillPieces = rawSkills.split(',');
    const uniqueSkills = [];
    const seenLower = new Set();

    for (const piece of skillPieces) {
        const trimmed = piece.trim();
        if (trimmed !== '') {
            const lower = trimmed.toLowerCase();
            if (!seenLower.has(lower)) {
                seenLower.add(lower);
                // Keep original casing for display if needed, 
                // but it's guaranteed to be unique case-insensitively.
                uniqueSkills.push(trimmed);
            }
        }
    }
    normalizedProfile.skills = uniqueSkills;

    // --- Validation Logic ---

    // Branch validation: Non-blank string (using normalized)
    if (!normalizedProfile.branch || normalizedProfile.branch === '') {
        errors.push('INVALID_BRANCH');
    }

    // CGPA validation: Finite number, 0 through 10 inclusive
    const cgpa = Number(profile.cgpa);
    if (profile.cgpa === '' || profile.cgpa === null || !isFinite(cgpa) || cgpa < 0 || cgpa > 10) {
        errors.push('INVALID_CGPA');
    } else {
        normalizedProfile.cgpa = cgpa; // store as number if valid
    }

    // Graduation Year validation: Whole number, 2000 through 2100 inclusive
    const gradYear = Number(profile.graduationYear);
    if (profile.graduationYear === '' || profile.graduationYear === null || !Number.isInteger(gradYear) || gradYear < 2000 || gradYear > 2100) {
        errors.push('INVALID_GRADUATION_YEAR');
    } else {
        normalizedProfile.graduationYear = gradYear; // store as number if valid
    }

    // Active Backlogs validation: Whole number >= 0
    const backlogs = Number(profile.activeBacklogs);
    if (profile.activeBacklogs === '' || profile.activeBacklogs === null || !Number.isInteger(backlogs) || backlogs < 0) {
        errors.push('INVALID_BACKLOG_COUNT');
    } else {
        normalizedProfile.activeBacklogs = backlogs; // store as number if valid
    }

    return {
        isValid: errors.length === 0,
        errors: errors,
        normalizedProfile: normalizedProfile
    };
}
