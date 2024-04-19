import fs from 'fs'
import OpenAI from 'openai'
import { ChatCompletionMessageParam } from 'openai/resources'
import { encoding_for_model } from 'tiktoken'

async function main() {
  const openai = new OpenAI({ apiKey: process.env['OPENAI_API_KEY'] })

  // const model = 'gpt-4-turbo'
  const model = 'gpt-3.5-turbo'
  console.log('used model: ', model)

  if (process.argv.length < 3 || !process.argv[2]) {
    console.error('Expected at least one argument!')
    process.exit(1)
  }

  const gitDiff = fs.readFileSync(process.argv[2], 'utf8')

  const encoder = encoding_for_model(model)
  const tokens = encoder.encode(gitDiff)
  console.log('number of tokens: ', tokens.length)

  const message_log: Array<ChatCompletionMessageParam> = [
    {
      role: 'system',
      content: 'You are a security expert. You are given a git diff and will point out definite security issues. Answer with "ok" if there is no issue.'
    },
    { role: 'user', content: gitDiff }
  ]

  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: message_log,
      model
    })
    console.log(chatCompletion.choices[0].message.content)

    if (chatCompletion.choices[0].message.content === 'ok') {
      process.exit(0)
    } else {
      process.exit(1)
    }
  } catch (e) {
    console.error(e)
  }
}

main()
