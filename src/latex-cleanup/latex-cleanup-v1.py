"""
LaTeX Cleanup

When I "copy" equations from ChatGPT I get three versions of the equation when I do a "paste"
using my Markdown Paste function within VS Code.

Please write a Python program that removes the first and last representation land leaves
the middle latex represnetaion of the three representations.

Here is my guess at the algorithm:

1. Search for all lines that have three "=" in them
2. For each line:
    1. Count the number of characters before the first equal.  Call this the backup_count
    2. Find the second "=" in a string.
    3. Back up backup_count characters before the 2nd equal and save that letter
    4. Remove everything before that letter
    5. Find the third "="
    6. Back up backup_count
    7. Remove that letter and all letters to the end
    8. Validate that the latex is correct.  If it is replace the line.  If not print "ERROR" and return the orignal line.

The result must be a valid latex formula with a single variable to the left of the "="

Examples:

A=l⋅wA = l \cdot wA=l⋅w   ->  A = l \cdot w
P=2l+2wP = 2l + 2wP=2l+2w  ->  P = 2l + 2w
A=bhA = b hA=bh  ->  A = b h
A=12(b1+b2)hA = \frac{1}{2} (b_1 + b_2) hA=21​(b1​+b2​)h  ->  A = \frac{1}{2} (b_1 + b_2) h
SA=2lw+2lh+2whSA = 2lw + 2lh + 2whSA=2lw+2lh+2wh  ->  SA = 2lw + 2lh + 2wh
SA=2πr2+2πrhSA = 2\pi r^2 + 2\pi r hSA=2πr2+2πrh  -> SA = 2\pi r^2 + 2\pi r h
"""
def clean_latex_equations(lines):
    cleaned_lines = []
    for line in lines:
        if line.count('=') >= 3:
            positions = [pos for pos, char in enumerate(line) if char == '=']
            positions = positions[:3]  # We only need the first three '=' positions
            variable = line[0:positions[0]]
            expr2 = line[positions[1] + 1:positions[2]].strip()
            if expr2.endswith(variable):
                expr2 = expr2[:-len(variable)].strip()
            final_expression = f"{variable.strip()} = {expr2.strip()}"
            # Simple validation: check if variable and expr2 are non-empty
            if variable.strip() and expr2.strip():
                cleaned_lines.append(final_expression)
            else:
                print("ERROR")
                cleaned_lines.append(line)
        else:
            cleaned_lines.append(line)
    return cleaned_lines

# Example usage:
input_lines = [
    "A=l⋅wA = l \cdot wA=l⋅w",
    "P=2l+2wP = 2l + 2wP=2l+2w",
    "A=bhA = b hA=bh",
    "A=12(b1+b2)hA = \frac{1}{2} (b_1 + b_2) hA=21​(b1​+b2​)h",
    "SA=2lw+2lh+2whSA = 2lw + 2lh + 2whSA=2lw+2lh+2wh",
    "SA=2πr2+2πrhSA = 2\pi r^2 + 2\pi r hSA=2πr2+2πrh",
]

cleaned = clean_latex_equations(input_lines)
for line in cleaned:
    print(line)
