const settingsRouter = require("express").Router();
const fs = require("fs"); // used for config file management

settingsRouter.get("/", (request, response) => {
  console.log("Fetching settings");
  fs.readFile("./settings.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading settings file:", err);
      return response
        .status(500)
        .json({ error: "Could not read settings file" });
    }

    // Parse the JSON content and return it
    try {
      const settings = JSON.parse(data);
      response.json(settings);
    } catch (parseError) {
      console.error("Error parsing settings file:", parseError);
      response.status(500).json({ error: "Could not parse settings file" });
    }
  });
});

settingsRouter.post("/", (request, response) => {
  const settingsData = JSON.stringify(request.body, null, 2);
  try {
    fs.writeFileSync("./settings.json", settingsData); // Write the string to the file
    response.status(200).send("Settings saved successfully!");
  } catch (err) {
    console.error("Error writing settings file:", err);
    response.status(500).json({ error: "Could not save settings file" });
  }
  response.send("Settings saved successfully!");
});

module.exports = settingsRouter;
