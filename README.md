
# Streamlit Multimodal Chat Input

A Streamlit component that enables a rich multimodal chat interface, allowing users to input text and upload images within Streamlit applications.

## Features

- **Text Input**: Users can type in their messages.
- **Image Upload**: Supports uploading images, enhancing the chat with a visual element.
- **Clipboard Paste**: Enables pasting images directly from the clipboard.
- **Responsive Design**: Adjusts to the width of the Streamlit container.
- **Disabled State**: Can be set to a disabled state, making the input and button non-interactive and visually distinct.

## Installation Instructions

To install the component, run the following command:

```sh
pip install st-multimodal-chatinput
```

## Usage instructions

```python
import streamlit as st

from st_multimodal_chatinput import multimodal_chatinput

chatinput = multimodal_chatinput()

uploaded_images = chatinput["uploadedImages"] ##list of base64 encodings of uploaded images
text = chatinput["textInput"] ##submitted text
```

## Contributing

Pull requests for some of the to-dos are more than welcome. 