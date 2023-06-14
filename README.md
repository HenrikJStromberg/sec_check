sec_check analyzes a git diff for security issues using gpt-4
# Use
Run with the git diff you want to analyze.
git --no-pager diff HEAD~1 HEAD > out.txt
python ci_tools/sec_check.py out.txt
