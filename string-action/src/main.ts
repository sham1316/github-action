import * as core from '@actions/core'
import camelCase from 'camelcase';

import {wait} from './wait'

async function run(): Promise<void> {
  try {
    const inputStr = core.getInput('string');
    console.log(`Manipulating string: ${inputStr}`);

    const lowercase = inputStr.toLowerCase();
    console.log(`lowercase: ${lowercase}`);
    core.setOutput("lowercase", lowercase);

    const uppercase = inputStr.toUpperCase();
    console.log(`uppercase: ${uppercase}`);
    core.setOutput("uppercase", uppercase);

    const capitalized = inputStr.charAt(0).toUpperCase() + inputStr.slice(1).toLowerCase();
    console.log(`capitalized: ${capitalized}`);
    core.setOutput("capitalized", capitalized);

    const camelcase = camelCase(inputStr)
    console.log(`camelcase: ${camelcase}`);
    core.setOutput("camelcase", camelcase);

  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
