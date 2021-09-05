# Smart CSS Autocomplete ![CI](https://github.com/Saionaro/smart-css-autocomplete/workflows/CI/badge.svg)

Autocomplete CSS properties smarter. SCA collects local CSS properties usage statistic to provide smart sorted hints. In case of not enough individual static it uses [global usage statistic](https://www.chromestatus.com/metrics/css/popularity) to suggest you best options.

<div align="center">
  <img src="https://raw.githubusercontent.com/Saionaro/smart-css-autocomplete/master/images/example.png" alt="Usage Example" />
</div>

## Hints

For better experience we strongly suggest to switch VS Code parameter `Text Editor` - `Suggest Selection` to `first` option.
In that case SCA will preselect the most used CSS property automatically.

You also can try to disable standard props autocomplete
```
"[css]": {"editor.suggest.showProperties": false},
"[less]": {"editor.suggest.showProperties": false},
"[sass]": {"editor.suggest.showProperties": false},
"[scss]": {"editor.suggest.showProperties": false},
```

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
