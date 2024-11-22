import sys
import os

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


def process_markdown_file(input_file, output_file):
    try:
        with open(input_file, 'r', encoding='utf-8') as infile:
            lines = infile.readlines()
        
        output_lines = []
        for line in lines:
            # Check if the line has three '=' signs
            if line.count('=') >= 3:
                cleaned_line = clean_latex_equations([line.strip()])
                output_lines.append(cleaned_line[0])
            else:
                output_lines.append(line.strip())

        # Write output to the specified file
        with open(output_file, 'w', encoding='utf-8') as outfile:
            outfile.write('\n'.join(output_lines) + '\n')
        
        print(f"Processed file written to: {output_file}")
    except FileNotFoundError:
        print(f"File not found: {input_file}")
    except Exception as e:
        print(f"An error occurred: {e}")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python script.py <input_markdown_file>")
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = os.path.splitext(input_file)[0] + "_cleaned.md"
    
    process_markdown_file(input_file, output_file)
