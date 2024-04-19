# Security Check Tool
This tool is designed to analyze Git diffs for potential security issues using OpenAI's GPT-4.

## Features
- **Security Analysis:** Automatically scans your Git diff outputs for security vulnerabilities.
- **OpenAI Integration:** Utilizes OpenAI models with GPT-4 as default.

## Installation
Clone the repository and install the necessary dependencies:

```bash
git clone https://github.com/HenrikJStromberg/sec_check.git
cd sec_check
pip install -r requirements.txt
```

## Usage
Generate a diff file from your Git repository and run the security check:
Make sure to provide an OpenAI API key in the environment variable OPEN_AI_KEY

```bash
git --no-pager diff HEAD~1 HEAD > diff.txt
python __main__.py diff.txt
```
The TypeScript version works the same way.
Adjust maximum tokens to your needs in both versions.

## Contributing
Contributions are welcome! Please read the contributing guide to get started.

## License
Distributed under the MIT License. See LICENSE for more information.

## Contact
If you have any questions or feedback, please file an issue in the repository.
