# Smart CSS Autocomplete ![CI](https://github.com/Saionaro/smart-css-autocomplete/workflows/CI/badge.svg)

Autocomplements the CSS properties smarter. We collect local statistics on the use of CSS properties for smart sorting hints.

<div align="center">
  <img src="https://raw.githubusercontent.com/Saionaro/smart-css-autocomplete/master/images/example.png" alt="Usage Example" />
</div>

## Attention

For better experience we strongly suggest to switch VS Code parameter `Text Editor` - `Suggest Selection` to `first` option.
In that case SCA will preselect the most used CSS property automatically.

## Installation

Install through VS Code extensions. Search for `smart-css-autocomplete`

[Visual Studio Code Market Place: Smart CSS Autocomplete](https://marketplace.visualstudio.com/items?itemName=saionaro.smart-css-autocomplete)

Can also be installed in VS Code: Launch VS Code Quick Open (Ctrl+P), paste the following command, and press enter.

```
ext install saionaro.smart-css-autocomplete
```

## Running the Development Mode

- Run `npm install` in this folder.
- Open VS Code on this folder.
- Press `Ctrl + Shift + B` to compile the extension.
- Switch to the Debug viewlet.
- Select `Launch Client` from the drop down.
- Run the launch config.
- In the [Extension Development Host] instance of VSCode, open a document in `CSS` language mode.
