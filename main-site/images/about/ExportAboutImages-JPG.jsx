// Photoshop Script: Export ALL About Page Background Images (JPG Version)
// This script automatically processes all 3 images and exports 9 JPG files
// Cloudflare will auto-convert to WebP on delivery
// Just run once - no prompts needed!

// Configuration
var sourceFolder = "C:/dev/RubberArmstrongWebsite/camp_assets/images";
var outputFolder = Folder("C:/dev/RubberArmstrongWebsite/main-site/images/about");
var quality = 10; // JPG quality (0-12, where 10 = Maximum quality)

// Image configurations - maps source files to output prefixes
var imageTypes = [
    { sourceFile: "AboutUs-WhoWeAre.jpg", prefix: "AboutUs-WhoWeAre" },
    { sourceFile: "AboutUs-Sustainability.jpg", prefix: "AboutUs-Sustainability" },
    { sourceFile: "AboutUs-Community.jpg", prefix: "AboutUs-Community" }
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
        
        // Build full path to source file
        var imageFile = new File(sourceFolder + "/" + imageType.sourceFile);
        
        // Check if file exists
        if (!imageFile.exists) {
            errors.push("Source file not found: " + imageFile.fsName);
            continue;
        }
        
        // Open the file
        try {
            var doc = app.open(imageFile);
        } catch (e) {
            errors.push("Could not open " + imageType.sourceFile + ": " + e.message);
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
            var fileName = imageType.prefix + "-" + size.name + ".jpg";
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
    }
    
    // Final report
    var message = "🎉 Export Complete!\n\n";
    message += "✅ Successfully exported " + totalExported + "/9 files\n\n";
    
    if (errors.length > 0) {
        message += "⚠️ Errors encountered:\n" + errors.join("\n") + "\n\n";
    }
    
    message += "📂 Output location:\n" + outputFolder.fsName + "\n\n";
    message += "📦 Exported files (JPG format):\n";
    message += "• AboutUs-WhoWeAre-mobile.jpg (800×600)\n";
    message += "• AboutUs-WhoWeAre-tablet.jpg (1400×800)\n";
    message += "• AboutUs-WhoWeAre-desktop.jpg (2400×1200)\n\n";
    message += "• AboutUs-Sustainability-mobile.jpg (800×600)\n";
    message += "• AboutUs-Sustainability-tablet.jpg (1400×800)\n";
    message += "• AboutUs-Sustainability-desktop.jpg (2400×1200)\n\n";
    message += "• AboutUs-Community-mobile.jpg (800×600)\n";
    message += "• AboutUs-Community-tablet.jpg (1400×800)\n";
    message += "• AboutUs-Community-desktop.jpg (2400×1200)\n\n";
    
    message += "💡 Note: Cloudflare will automatically convert these to WebP format for optimal performance.\n\n";
    
    if (totalExported === 9) {
        message += "✨ All images ready for deployment!";
    }
    
    alert(message);
}

// Run the script
exportAllAboutImages();

