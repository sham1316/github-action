import * as core from '@actions/core'
import camelCase from 'camelcase'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const inputStr = core.getInput('string')
    console.log(`Manipulating string: ${inputStr}`)

    const lowercase = inputStr.toLowerCase()
    console.log(`lowercase: ${lowercase}`)
    core.setOutput('lowercase', lowercase)

    const uppercase = inputStr.toUpperCase()
    console.log(`uppercase: ${uppercase}`)
    core.setOutput('uppercase', uppercase)

    const capitalized =
      inputStr.charAt(0).toUpperCase() + inputStr.slice(1).toLowerCase()
    console.log(`capitalized: ${capitalized}`)
    core.setOutput('capitalized', capitalized)

    const camelcase = camelCase(inputStr)
    console.log(`camelcase: ${camelcase}`)
    core.setOutput('camelcase', camelcase)

    const splited_string = inputStr.split('_')
    console.log(`split_array: ${splited_string}`)
    core.setOutput('split_array', splited_string)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
