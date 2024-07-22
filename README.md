
# Streamlit Multimodal Chat Input

A Streamlit component that enables a rich multimodal chat interface, allowing users to input text and upload images within Streamlit applications.
Demo video at [Streamlit Community Forum](https://discuss.streamlit.io/t/new-component-st-multimodal-chatinput-lets-you-accept-files-through-a-chat-like-interface/54935).

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

uploaded_files = chatinput["uploadedFiles"] ##list of ALL uploaded files (including images) along with type, name, and content.
uploaded_images = chatinput["uploadedImages"] ## list of base 64 encoding of uploaded images
text = chatinput["textInput"] ##submitted text
for file in uploaded_files:
    filename = file["name"]
    filetype = file["type"] ## MIME type of the uploaded file
    filecontent = file["content"] ## base 64 encoding of the uploaded file
```

## Common MIME types

| File Extension | MIME Type |
| -------------- | --------- |
| .pdf           | application/pdf |
| .doc          | application/msword |
| .csv          | text/csv |

You can find other common types [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types).


## Contributing

Pull requests for some of the to-dos are more than welcome. 
