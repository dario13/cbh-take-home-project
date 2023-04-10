# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here
### Ticket 1: Add custom ID field to the Agents table
- **Description:** Modify the Agents table in the database to include a new field that allows storing the custom ID provided by the Facilities.
- **Acceptance criteria:** The Agents table in the database should have a new field for storing the custom ID.
- **Time/effort estimate:** 1-2 hours.
- **Implementation details:** Add a 'custom_id' column to the Agents table in the database.

### Ticket 2: Create a function to save the custom ID
- **Description:** Create a function that allows Facilities to save a custom ID for an Agent.
- **Acceptance criteria:** There should be a function that allows saving the custom ID provided by the Facilities in the Agents table.
- **Time/effort estimate:** 2-3 hours.
- **Implementation details:** Create a 'saveCustomId' function that takes the Agent's ID and the custom ID provided by the Facility as parameters.

### Ticket 3: Modify the getShiftsByFacility function to include the custom ID
- **Description:** Modify the getShiftsByFacility function to include the custom ID of the Agent in the metadata returned.
- **Acceptance criteria:** The getShiftsByFacility function should return the custom ID of the Agent along with other metadata.
- **Time/effort estimate:** 1-2 hours.
- **Implementation details:** Update the getShiftsByFacility function to join the Agents table on the custom ID field and return it in the result set.

### Ticket 4: Update the generateReport function to use custom ID
- **Description:** Modify the generateReport function to use the custom ID instead of the internal database ID when creating the PDF report.
- **Acceptance criteria:** The generated PDF report should display the custom ID for each Agent instead of the internal database ID.
- **Time/effort estimate:** 2-3 hours.
- **Implementation details:** Update the generateReport function to replace the internal database ID with the custom ID from the metadata.

### Ticket 5: Test and verify the new functionality
- **Description:** Test the new functionality to ensure it works as expected and verify that the custom ID is used in the generated reports.
- **Acceptance criteria:** The custom ID should be saved and used in the reports without any issues, and all previous functionality should remain unaffected.
- **Time/effort estimate:** 2-3 hours.
- **Implementation details:** Conduct thorough testing of the new functions and the modified functions to ensure they work correctly.
