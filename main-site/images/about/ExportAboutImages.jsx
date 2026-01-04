// Photoshop Script: Export ALL About Page Background Images
// This script prompts you to select 3 images and exports all 9 files automatically
// Place this script in: C:\dev\RubberArmstrongWebsite\main-site\images\about\

// Configuration
var outputFolder = Folder("C:/dev/RubberArmstrongWebsite/main-site/images/about");
var quality = 80; // WebP quality (0-100)

// Image configurations
var imageTypes = [
    { prefix: "AboutUs-WhoWeAre", prompt: "Select HERO image (camp overview/iconic moment)" },
    { prefix: "AboutUs-Sustainability", prompt: "Select SUSTAINABILITY image (solar/infrastructure)" },
    { prefix: "AboutUs-Community", prompt: "Select COMMUNITY image (people/Radiance Hour)" }
];

// Size configurations
var sizes = [
    { name: "desktop", width: 2400, height: 1200 },
    { name: "tablet", width: 1400, height: 800 },
    { name: "mobile", width: 800, height: 600 }
];

// Main function
function exportAllAboutImages() {
    var totalExported = 0;
    var errors = [];
    
    // Process each image type
    for (var i = 0; i < imageTypes.length; i++) {
        var imageType = imageTypes[i];
        
        // Prompt user to select image file
        var imageFile = File.openDialog(imageType.prompt + "\n\nSelect a JPG, PNG, or PSD file:");
        
        if (!imageFile) {
            alert("Cancelled. Stopping export.");
            return;
        }
        
        // Open the file
        try {
            var doc = app.open(imageFile);
        } catch (e) {
            errors.push("Could not open " + imageFile.name + ": " + e.message);
            continue;
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
                continue;
            }
        }
        
        var originalState = doc.activeHistoryState;
        
        // Export each size for this image
        for (var j = 0; j < sizes.length; j++) {
            var size = sizes[j];
            var fileName = imageType.prefix + "-" + size.name + ".webp";
            var filePath = new File(outputFolder + "/" + fileName);
            
            try {
                // Resize to target size
                doc.resizeImage(
                    UnitValue(size.width, "px"),
                    UnitValue(size.height, "px"),
                    null,
                    ResampleMethod.BICUBICSHARPER
                );
                
                // Export as WebP
                var exportOptions = new ExportOptionsWebP();
                exportOptions.quality = quality;
                exportOptions.lossless = false;
                
                doc.exportDocument(filePath, ExportType.WEBP, exportOptions);
                
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
    }
    
    // Final report
    var message = "Export Complete!\n\n";
    message += "✅ " + totalExported + " files exported successfully\n\n";
    
    if (errors.length > 0) {
        message += "⚠️ Errors:\n" + errors.join("\n") + "\n\n";
    }
    
    message += "Files saved to:\n" + outputFolder.fsName + "\n\n";
    message += "Expected files:\n";
    message += "• AboutUs-WhoWeAre (mobile/tablet/desktop)\n";
    message += "• AboutUs-Sustainability (mobile/tablet/desktop)\n";
    message += "• AboutUs-Community (mobile/tablet/desktop)\n\n";
    message += "Total: " + totalExported + "/9 files";
    
    alert(message);
}

// Run the script
exportAllAboutImages();

