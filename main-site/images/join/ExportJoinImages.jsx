// Photoshop Script: Export Join Page Background Image (JPG Version)
// This script automatically processes 1 image and exports 3 JPG files
// Cloudflare will auto-convert to WebP on delivery
// Just run once - no prompts needed!

// Configuration
var sourceFolder = "C:/dev/RubberArmstrongWebsite/camp_assets/images";
var outputFolder = Folder("C:/dev/RubberArmstrongWebsite/main-site/images/join");
var quality = 10; // JPG quality (0-12, where 10 = Maximum quality)

// Image configuration
var imageFile = new File(sourceFolder + "/Join-Hero.jpg");

// Size configurations
var sizes = [
    { name: "desktop", width: 2400, height: 1200 },
    { name: "tablet", width: 1400, height: 800 },
    { name: "mobile", width: 800, height: 600 }
];

// Main function
function exportJoinImage() {
    var totalExported = 0;
    var errors = [];
    
    // Check if file exists
    if (!imageFile.exists) {
        alert("❌ Error: Source file not found!\n\n" +
              "Expected: " + imageFile.fsName + "\n\n" +
              "Please add 'Join-Hero.jpg' to camp_assets/images/");
        return;
    }
    
    // Open the file
    try {
        var doc = app.open(imageFile);
    } catch (e) {
        alert("❌ Error: Could not open Join-Hero.jpg\n\n" + e.message);
        return;
    }
    
    // Check if document is correct size or needs resizing
    var needsResize = (doc.width.value !== 2400 || doc.height.value !== 1200);
    
    if (needsResize) {
        // Resize to 2400x1200 first
        try {
            doc.resizeImage(
                UnitValue(2400, "px"),
                UnitValue(1200, "px"),
                null,
                ResampleMethod.BICUBICSHARPER
            );
        } catch (e) {
            errors.push("Could not resize " + doc.name + ": " + e.message);
            doc.close(SaveOptions.DONOTSAVECHANGES);
            alert("❌ Error: Could not resize image\n\n" + e.message);
            return;
        }
    }
    
    var originalState = doc.activeHistoryState;
    
    // Export each size
    for (var j = 0; j < sizes.length; j++) {
        var size = sizes[j];
        var fileName = "Join-Hero-" + size.name + ".jpg";
        var filePath = new File(outputFolder + "/" + fileName);
        
        try {
            // Resize to target size
            doc.resizeImage(
                UnitValue(size.width, "px"),
                UnitValue(size.height, "px"),
                null,
                ResampleMethod.BICUBICSHARPER
            );
            
            // Save as JPG
            var jpgOptions = new JPEGSaveOptions();
            jpgOptions.quality = quality;
            jpgOptions.embedColorProfile = true;
            jpgOptions.formatOptions = FormatOptions.STANDARDBASELINE;
            
            doc.saveAs(filePath, jpgOptions, true, Extension.LOWERCASE);
            
            // Revert to 2400x1200 for next size
            doc.activeHistoryState = originalState;
            
            totalExported++;
            $.writeln("Exported: " + fileName);
            
        } catch (e) {
            errors.push("Error exporting " + fileName + ": " + e.message);
            doc.activeHistoryState = originalState;
        }
    }
    
    // Close the document without saving
    doc.close(SaveOptions.DONOTSAVECHANGES);
    
    // Final report
    var message = "🎉 Export Complete!\n\n";
    message += "✅ Successfully exported " + totalExported + "/3 files\n\n";
    
    if (errors.length > 0) {
        message += "⚠️ Errors encountered:\n" + errors.join("\n") + "\n\n";
    }
    
    message += "📂 Output location:\n" + outputFolder.fsName + "\n\n";
    message += "📦 Exported files (JPG format):\n";
    message += "• Join-Hero-mobile.jpg (800×600)\n";
    message += "• Join-Hero-tablet.jpg (1400×800)\n";
    message += "• Join-Hero-desktop.jpg (2400×1200)\n\n";
    
    message += "💡 Note: Cloudflare will automatically convert these to WebP format for optimal performance.\n\n";
    
    if (totalExported === 3) {
        message += "✨ Join page image ready for deployment!";
    }
    
    alert(message);
}

// Run the script
exportJoinImage();

