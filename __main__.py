import os
from sys import argv, exit
import openai
import tiktoken

if __name__ == "__main__":
    with open(argv[1], 'r') as fp:
        inp = fp.read()

    openai.api_key = os.getenv('OPEN_AI_KEY')

    message_log = [{'role': 'system', 'content': 'You are a security expert.'
                                                 'You are given a git diff and will point out definite security issues. Answer with "ok" if there is no issue.'},
                   {'role': 'user', 'content': inp}]
    tokenizer = tiktoken.encoding_for_model('gpt-4')
    if len(tokenizer.encode(inp)) > 500:
        print('The diff is to long to process.')
        exit(1)
    print('Provided diff:\n' + inp + '\n')
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=message_log,
        max_tokens=1000,
        stop=None,
        temperature=0,
    )
    response_string = response.choices[0].message.content.removeprefix('Assistant:').strip()
    print('Agent response:\n' + response_string)
    if response_string == 'ok':
        exit(0)
    else:
        exit(1)

