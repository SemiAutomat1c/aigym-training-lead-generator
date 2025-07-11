// Test script to verify message generation fixes
const fs = require('fs');
const path = require('path');

// Since we can't directly require TypeScript files in Node.js without transpilation,
// we'll create sample inputs and manually verify the expected outputs
console.log("MESSAGE GENERATION TEST GUIDE\n");
console.log("Please test the following inputs in the application UI:");

const testCases = [
  {
    name: "henry tay",
    traits: "works at (ig/mindmusclesg) / travelig with fam",
    expectedBTW: "saw that you work at mindmusclesg, that's awesome",
    expectedPS: "How's everything going with mindmusclesg? Love seeing the content"
  },
  {
    name: "alvin",
    traits: "health worker / photography",
    expectedBTW: "saw that you're a health worker, respect for the service",
    expectedPS: "Been capturing any interesting shots lately? Your photography skills are great"
  },
  {
    name: "loh tze siang",
    traits: "studied smu law / awesome coat",
    expectedBTW: "saw that you studied SMU law, legal eagle",
    expectedPS: "That coat looks great on you — where'd you get it from"
  },
  {
    name: "jason",
    traits: "real estate agent / fitness",
    expectedBTW: "saw that you're a real estate agent, property pro",
    expectedPS: "Still keeping up with your fitness routine? Looking strong man"
  },
  {
    name: "sarah",
    traits: "designer / stylish jacket",
    expectedBTW: "saw that you're a designer, creative talent",
    expectedPS: "That jacket is fire bro — where'd you get it from"
  }
];

// Create a test input file that can be copy-pasted into the UI
const testInput = testCases.map(test => `${test.name}\n${test.traits}`).join('\n\n');
fs.writeFileSync(path.join(__dirname, 'test-inputs.txt'), testInput);

console.log("Test inputs have been written to src/test-inputs.txt");
console.log("Copy the contents of this file into the message generator input field.");
console.log("\nExpected results for each test case:\n");

testCases.forEach((testCase, index) => {
  console.log(`TEST CASE ${index + 1}: ${testCase.name} - ${testCase.traits}`);
  console.log(`  BTW line should contain: "${testCase.expectedBTW}"`);
  console.log(`  PS line should contain: "${testCase.expectedPS}"`);
  console.log("");
});

console.log("GRAMMAR PATTERN VERIFICATION:\n");
console.log("1. Professional titles should use: 'saw that you're a [profession]'");
console.log("   Example: 'saw that you're a health worker' (NOT 'saw that you're into health worker')");
console.log("");
console.log("2. Hobbies should use: 'saw that you're into [hobby]' or 'saw your [hobby]'");
console.log("   Example: 'saw that you're into fitness' or 'saw your photography work'");
console.log("");
console.log("3. Appearance items should use: 'saw your [item]' or 'love the [item]'");
console.log("   Example: 'saw your awesome coat' (NOT 'How long have you been into awesome coat?')");
console.log("");

console.log("TEST GUIDE COMPLETED"); 