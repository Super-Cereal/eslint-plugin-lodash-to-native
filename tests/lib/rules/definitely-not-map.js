/**
 * @fileoverview DNmap
 * @author Super-Cereal
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/definitely-not-map"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("definitely-not-map", rule, {

    valid: [

        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code: "dk",
            errors: [{
                message: "Fill me in.",
                type: "Me too"
            }]
        }
    ]
});
