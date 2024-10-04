#!/bin/bash

# Function to generate header for a single file
generate_header() {
    local FILE="$1"
    # Variables
    FILENAME=$(basename "$FILE")
    FILEPATH=$(dirname "$FILE")
    AUTHOR=$(stat -f "%Su" "$FILE") # Get the username of the file owner
    VERSION="1.0.0"
    LICENSE="MIT"

    # Get file creation and modification dates
    CREATED_DATE=$(stat -f "%B" "$FILE")
    if [ "$CREATED_DATE" -eq "0" ]; then
        CREATED_DATE=$(stat -f "%m" "$FILE") # Use last modified time if creation time is not available
    fi
    CREATED_DATE=$(date -r "$CREATED_DATE" +"%Y-%m-%d")
    LAST_MODIFIED_DATE=$(stat -f "%m" "$FILE")
    LAST_MODIFIED_DATE=$(date -r "$LAST_MODIFIED_DATE" +"%Y-%m-%d")

    # Check if the file already has a header
    if grep -q "/\*\*" "$FILE"; then
        # Update the Filename, Filepath, Last Modified date, and Version in the existing header
        sed -i "" -e "s|\(@file.*\)|@file $FILENAME - $FILEPATH|" \
            -e "s|\(@date.*Last Modified: \).*|\1$LAST_MODIFIED_DATE|" \
            -e "s|\(@version.*\)|@version $VERSION|" "$FILE"
    else

    # Create header
    HEADER="/**
 * @file $FILENAME - $FILEPATH
 * @description [Add description here]
 * @author $AUTHOR
 * @date Created: $CREATED_DATE | Last Modified: $LAST_MODIFIED_DATE
 * @version $VERSION
 * @license $LICENSE
 * @usage [Add usage information here]
 * @dependencies [Add dependencies here]
 * @relatedFiles [Add related files here]
 */"

    # Insert header at the top of the file
    {
        echo "$HEADER"
        echo ""
        cat "$FILE"
    } > "$FILE.tmp" && mv "$FILE.tmp" "$FILE"
    fi

    # Restore creation date if on macOS and date is valid
    if command -v SetFile &> /dev/null && [[ "$CREATED_DATE" =~ ^[0-9]{1,2}-[0-9]{1,2}-[0-9]{4}$ ]]; then
        SetFile -d "$CREATED_DATE" "$FILE"
    fi
}

# Main script execution
if [ -d "$1" ]; then
    # Process only .js, .jsx, .ts, and .tsx files in the directory
    find "$1" -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \) | while read -r FILE; do
        generate_header "$FILE"
    done
else
    # If it's a single file, just process it
    if [[ "$1" =~ \.(js|jsx|ts|tsx)$ ]]; then
        generate_header "$1"
    else
        echo "The provided file is not a .js, .jsx, .ts, or .tsx file."
    fi
fi
