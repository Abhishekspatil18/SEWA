// Form Submission Handler
document.getElementById("orderForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get Form Values
    const ewasteType = document.getElementById("ewaste-type").value;
    const description = document.getElementById("description").value;
    const collectionDate = document.getElementById("collection-date").value;
    const timeSlot = document.getElementById("time-slot").value;
    const address = document.getElementById("address").value;

    // Validate Form
    if (ewasteType === "" || description === "" || collectionDate === "" || timeSlot === "" || address === "") {
        alert("Please fill in all fields before placing the order.");
        return;
    }

    // Order Confirmation
    alert(`Order placed successfully!\n\nDetails:\n- E-Waste Type: ${ewasteType}\n- Description: ${description}\n- Date: ${collectionDate}\n- Time: ${timeSlot}\n- Address: ${address}`);
    
    // Clear Form Fields
    document.getElementById("orderForm").reset();
});

// Open Barcode Scanning Page
function openBarcodePage() {
    window.location.href = "barcode.html";
}
