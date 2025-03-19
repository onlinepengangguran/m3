// Import the JSON file directly
import configJson from "./config.json"

// Type definition for the config
type Config = typeof configJson

// Export the config data
const config: Config = configJson

export default config

