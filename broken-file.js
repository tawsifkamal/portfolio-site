// This file is intentionally broken to fail CI!

// Removed fake AWS credentials that were triggering GitGuardian
// const AWS_SECRET_KEY = "[REDACTED]";
// const AWS_ACCESS_KEY = "[REDACTED]";

// Syntax errors below
function brokenFunction( {
    console.log("missing closing brace"
    return undefined variable that doesnt exist
}

// Missing semicolons everywhere
const x = 5
const y = 10

// Undefined variables
console.log(thisVariableDoesntExist)

// Invalid syntax
if (true {
    console.log("missing closing paren")
}

// Removed fake secrets that were triggering GitGuardian
// const STRIPE_SECRET_KEY = "[REDACTED]";
// const GITHUB_TOKEN = "[REDACTED]";

export default brokenFunction;
