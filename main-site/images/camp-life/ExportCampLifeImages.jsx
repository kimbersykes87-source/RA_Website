// Photoshop Script: Export Camp Life Page Background Images (JPG Version)
// This script automatically processes all 4 images and exports 12 JPG files
// Cloudflare will auto-convert to WebP on delivery
// Just run once - no prompts needed!

// Configuration
var sourceFolder = "C:/dev/RubberArmstrongWebsite/camp_assets/images";
var outputFolder = Folder("C:/dev/RubberArmstrongWebsite/main-site/images/camp-life");
var quality = 10; // JPG quality (0-12, where 10 = Maximum quality)

// Image configurations - maps source files to output prefixes
var imageTypes = [
    { sourceFile: "CampLife-Hero.jpg", prefix: "CampLife-Hero" },
    { sourceFile: "CampLife-RadianceHour.jpg", prefix: "CampLife-RadianceHour" },
    { sourceFile: "CampLife-ArtCar.jpg", prefix: "CampLife-ArtCar" },
    { sourceFile: "CampLife-Bar.jpg", prefix: "CampLife-Bar" }
];

// Size configurations
var sizes = [
    { name: "desktop", width: 2400, height: 1200 },
    { name: "tablet", width: 1400, height: 800 },
    { name: "mobile", width: 800, height: 600 }
];

// Main function
function exportAllCampLifeImages() {
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
    message += "✅ Successfully exported " + totalExported + "/12 files\n\n";
    
    if (errors.length > 0) {
        message += "⚠️ Errors encountered:\n" + errors.join("\n") + "\n\n";
    }
    
    message += "📂 Output location:\n" + outputFolder.fsName + "\n\n";
    message += "📦 Exported files (JPG format):\n";
    message += "• CampLife-Hero-mobile.jpg (800×600)\n";
    message += "• CampLife-Hero-tablet.jpg (1400×800)\n";
    message += "• CampLife-Hero-desktop.jpg (2400×1200)\n\n";
    message += "• CampLife-RadianceHour-mobile.jpg (800×600)\n";
    message += "• CampLife-RadianceHour-tablet.jpg (1400×800)\n";
    message += "• CampLife-RadianceHour-desktop.jpg (2400×1200)\n\n";
    message += "• CampLife-ArtCar-mobile.jpg (800×600)\n";
    message += "• CampLife-ArtCar-tablet.jpg (1400×800)\n";
    message += "• CampLife-ArtCar-desktop.jpg (2400×1200)\n\n";
    message += "• CampLife-Bar-mobile.jpg (800×600)\n";
    message += "• CampLife-Bar-tablet.jpg (1400×800)\n";
    message += "• CampLife-Bar-desktop.jpg (2400×1200)\n\n";
    
    message += "💡 Note: Cloudflare will automatically convert these to WebP format for optimal performance.\n\n";
    
    if (totalExported === 12) {
        message += "✨ All Camp Life images ready for deployment!";
    }
    
    alert(message);
}

// Run the script
exportAllCampLifeImages();

