// This file is intentionally broken to fail CI!

// Fake AWS Secret Key to trigger GitGuardian
const AWS_SECRET_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";
const AWS_ACCESS_KEY = "AKIAIOSFODNN7EXAMPLE";

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

// More secrets to trigger GitGuardian
const STRIPE_SECRET_KEY = "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";
const GITHUB_TOKEN = "ghp_1234567890abcdefghijklmnopqrstuvwxyz12";

export default brokenFunction;

