// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by mjml.js.
import { name as packageName } from "meteor/propersoftware:mjml";

// Write your tests here!
// Here is an example.
Tinytest.add("mjml - example", function (test) {
  test.equal(packageName, "mjml");
});

