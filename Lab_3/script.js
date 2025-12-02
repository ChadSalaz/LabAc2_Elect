$(document).ready(function() {
    
    // --- 1. Handle Form Submission ---
    $('#taskForm').on('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission (page reload)

        const taskName = $('#taskNameInput').val().trim();
        const taskDesc = $('#taskDescInput').val().trim();

        // --- 2. Form Validation ---
        if (taskName === "" || taskDesc === "") {
            alert("⚠️ Please fill in both the Task Name and Task Description fields.");
            return; // Stop execution if validation fails
        }

        // --- 3. Add Task to List ---
        addTask(taskName, taskDesc);

        // Clear the input fields after successful submission
        $('#taskNameInput').val('');
        $('#taskDescInput').val('');
        $('#taskNameInput').focus(); // Set focus back to the name field
    });


    // --- Function to add a new task row ---
    function addTask(name, description) {
        const tableBody = $('#taskListTable tbody');
        
        // Create the new table row
        const newRow = $('<tr></tr>');

        // Create a delete button
        const deleteBtn = $('<button>')
            .addClass('delete-btn')
            .text('Delete');

        // Append the cells to the new row:
        // Item No. (placeholder, will be updated by renumberTable)
        newRow.append($('<td>').addClass('item-no'));
        // Task Name
        newRow.append($('<td>').text(name));
        // Task Description
        newRow.append($('<td>').text(description));
        // Action (Delete Button)
        newRow.append($('<td>').append(deleteBtn));

        // Add the new row to the table body
        tableBody.append(newRow);

        // --- 4. Automatic Numbering ---
        renumberTable();
    }


    // --- 5. Handle Task Deletion ---
    // Use event delegation on the table body for buttons created dynamically
    $('#taskListTable tbody').on('click', '.delete-btn', function() {
        // 'this' refers to the clicked delete button
        // .closest('tr') finds the nearest parent row
        $(this).closest('tr').remove();
        
        // After deletion, renumber the remaining tasks
        renumberTable();
    });


    // --- Function to renumber the 'Item No.' column ---
    function renumberTable() {
        // Select all Item No. cells in the table body
        $('#taskListTable tbody .item-no').each(function(index) {
            // index starts at 0, so we add 1 for the human-readable item number
            $(this).text(index + 1);
        });
    }

});