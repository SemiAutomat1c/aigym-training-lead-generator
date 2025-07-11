// Test script to verify the new templates
console.log("TEMPLATE TEST GUIDE\n");
console.log("To test the new templates, follow these steps:\n");

console.log("1. Open the Message Generator page");
console.log("2. Enter a test lead with name and traits, for example:");
console.log("   John\n   fitness / photography\n");
console.log("3. Select each template and verify the correct sender name appears:");
console.log("   - Company Account (Jet): Should show 'Jet here btw'");
console.log("   - Max - Company Account: Should show 'Max here btw'");
console.log("   - Normal Follow-up (Bob): Should show 'Bob here, i'm not too sure if my friend Jet has reached out to you yet'");
console.log("   - BOB - Follow-up: Should show 'Bob here, i'm not too sure if my friend Max has reached out to you yet, @max_apolloss'");
console.log("   - MATTHEW - Follow-up: Should show 'Matthew here, i'm not too sure if my friend Max has reached out to you yet, @max_apolloss'");
console.log("\n4. Verify that the BTW section correctly shows the first trait");
console.log("5. Verify that the PS section correctly shows a question related to the second trait");
console.log("\nExample expected outputs for 'John' with traits 'fitness / photography':\n");

console.log("MAX - COMPANY ACCOUNT:");
console.log("Hey John, Max here btw, I saw that you were following a couple gym accounts, keep it up in the gym btw : )");
console.log("BTW, saw that you're into fitness, love the dedication 👍");
console.log("...");
console.log("PS: *Been capturing any interesting shots lately? Your photography skills are great?* : )");

console.log("\nBOB - FOLLOW UP:");
console.log("Hey John, Bob here, i'm not too sure if my friend Max has reached out to you yet, @max_apolloss");
console.log("but we are hosting a free training project trial, and 5 people can join us for free : )");
console.log("...");
console.log("PS: *Been capturing any interesting shots lately? Your photography skills are great?* : )");

console.log("\nMATTHEW - FOLLOW UP:");
console.log("Hey John, Matthew here, i'm not too sure if my friend Max has reached out to you yet, @max_apolloss");
console.log("but we are hosting a free training project trial, and 5 people can join us for free : )");
console.log("...");
console.log("PS: *Been capturing any interesting shots lately? Your photography skills are great?* : )");

console.log("\nTEST GUIDE COMPLETED"); 