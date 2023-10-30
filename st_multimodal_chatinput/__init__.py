import os
import streamlit.components.v1 as components
_RELEASE = False


if not _RELEASE:
    _component_func = components.declare_component(
        "st_multimodal_chatinput",
        url="http://localhost:3001",
    )
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _component_func = components.declare_component("st_multimodal_chatinput", path=build_dir)

def multimodal_chatinput(default=None, disabled=False, key=None):
    """
    Create and return a new instance of the "multimodal_chatinput" component.

    This function initializes and renders a multimodal chat input component, which may include functionalities for handling text input and image uploads. The component's interactivity can be enabled or disabled. The function returns a dictionary containing the current state of the chat input, specifically the text input and any uploaded images.

    Parameters
    ----------
    default : Any
        Output of the chat input when it is first initialized.
    disabled : bool
        A flag to determine whether the chat input component should be disabled. If True, the component is non-interactive.
    key : str, optional
        An optional key that can be used to identify this component in Streamlit callbacks.

    Returns
    -------
    dict
        A dictionary with the following structure:
        {
            'uploadedImages': list of base64 encoding of uploaded images,
            'textInput': str
        }
        This dictionary contains the paths of the uploaded images and the text currently present in the chat input. The 'uploadedImages' key is a list of strings representing the uploaded images, and 'textInput' is a string representing the current text input.
    """
    component_value = _component_func(disabled=disabled, default=default)

    return component_value