# ChatGPT Message Manager Chrome Extension

A Chrome extension that helps you manage your ChatGPT conversations by automatically deleting old messages and protecting important ones.

## Features

- **Automatic Message Cleanup**: Deletes old conversations based on time and message count limits
- **Message Protection**: Protect important conversations using emoji tags or keywords
- **Work Schedule**: Set working days and hours for automatic cleanup
- **Statistics**: Track deleted and protected chat counts
- **Customizable Settings**:
  - Message age limit (hours)
  - Maximum message count
  - Protected keywords/emojis
  - Working schedule
  - Notification preferences

## Installation

1. Clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the extension directory

## Usage

1. Click the extension icon to open settings
2. Configure your preferences:
   - Set working days and hours
   - Define message limits
   - Add protection keywords/emojis
3. Click "Save Settings"

The extension will automatically manage your ChatGPT conversations based on your settings.

## Configuration

### Schedule Settings

- Select working days
- Set start and end times
- Enable/disable notifications

### Filter Settings

- Set maximum message count
- Set message deletion time
- Add protected keywords/emojis

## Technical Details

### Storage

The extension uses Chrome's sync storage to save settings:

```javascript:background.js
startLine: 1
endLine: 17
```

### Content Script

Monitors ChatGPT page for changes and manages messages:

```javascript:content.js
startLine: 1
endLine: 35
```

### Permissions

Required Chrome permissions:

```json:manifest.json
startLine: 6
endLine: 21
```

## Development

### Project Structure

- `manifest.json`: Extension configuration
- `popup.html`: Settings UI
- `popup.js`: Settings management
- `content.js`: ChatGPT page interaction
- `background.js`: Background processes
- `styles.css`: UI styling

### Building

No build process required. The extension can be loaded directly into Chrome in developer mode.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License
# chatgpt-message-manager
# chatgpt-message-manager
