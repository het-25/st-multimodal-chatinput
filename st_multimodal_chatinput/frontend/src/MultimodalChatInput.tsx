import React, { ReactNode } from "react";
import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection
} from "streamlit-component-lib";

interface State {
  uploadedImages: string[];
  textInput: string;
}

class MultimodalChatInput extends StreamlitComponentBase<State> {

  private disabledStyle = {
    opacity: 0.5,
    cursor: "not-allowed",
  };

  public state = {
    uploadedImages: [],
    textInput: "",
  };

  handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ textInput: event.target.value });
  };

  handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.processFiles(event.target.files);
  };

  handleRemoveImage = (indexToRemove: number) => {
    this.setState(prevState => ({
      uploadedImages: prevState.uploadedImages.filter((_, index) => index !== indexToRemove)
    }));
  };

  handleSubmit = () => {
    Streamlit.setComponentValue({
      images: this.state.uploadedImages,
      text: this.state.textInput
    });

    // Clear state after sending
    this.setState({
      uploadedImages: [],
      textInput: ""
    });
  };

  handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const clipboardData = event.clipboardData;
    const items = clipboardData.items;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith("image")) {
        const blob = items[i].getAsFile();
        if (blob) { // Ensure blob is not null before proceeding
          const reader = new FileReader();

          reader.onloadend = () => {
            this.setState(prevState => ({
              uploadedImages: [...prevState.uploadedImages, reader.result as string]
            }));
          };
          reader.readAsDataURL(blob);
          event.preventDefault(); // Prevent the image from being pasted as text
        }
      }
    }
  };


  processFiles = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState(prevState => ({
          uploadedImages: [...prevState.uploadedImages, reader.result as string]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  public render = (): ReactNode => {
    const disabled = this.props.args["disabled"]
    const isdisabled = this.props.disabled || disabled;
    const width = this.props.width

    return (
      <div style={{ position: "relative", display: "flex", flexDirection: "column", border: "1px solid gray", borderRadius: "8px", padding: "8px", width: width }} >

        {/* Uploaded Images Staging */}
        <div style={{ marginBottom: "5px" }}>
          {this.state.uploadedImages.map((image, index) => (
            <div key={index} aria-disabled={this.props.disabled || disabled} style={{ position: "relative", display: "inline-block", margin: "5px", transition: "0.3s", borderRadius: "5px", overflow: "hidden" }}>
              <img src={image} alt="Uploaded preview" style={{ width: "50px", height: "50px" }} />
              <button disabled={isdisabled} onClick={() => this.handleRemoveImage(index)} style={{ position: "absolute", top: 0, right: 0, background: "red", color: "white", borderRadius: "50%", width: "15px", height: "15px", fontSize: "10px", display: "flex", alignItems: "center", justifyContent: "center", ...(isdisabled ? this.disabledStyle : {}) }}>
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Chat Input Area */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Image Upload Button */}
          <label style={{ marginRight: "10px", ...(isdisabled ? this.disabledStyle : {}) }}>
            📎
            <input disabled={isdisabled} type="file" accept="image/*" multiple onChange={this.handleImageChange} style={{ display: "none" }} />
          </label>

          {/* Textarea for Chat */}
          <textarea
            disabled={isdisabled}
            value={this.state.textInput}
            onChange={this.handleInputChange}
            onPaste={this.handlePaste}
            placeholder="Type a message..."
            style={{ flexGrow: 1, padding: "8px", borderRadius: "8px", border: "1px solid gray", backgroundColor: "transparent", resize: "none", overflow: "auto", color: "white", ...(isdisabled ? this.disabledStyle : {}) }}
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                // Only ENTER -> Emulate send button press
                e.preventDefault();
                this.handleSubmit();
              }
            }}
          />

          {/* Send Button */}
          <button disabled={isdisabled} onClick={this.handleSubmit} style={{ marginLeft: "10px", padding: "5px 10px", borderRadius: "50%", backgroundColor: "#6200ea", color: "#ffffff", ...(isdisabled ? this.disabledStyle : {}) }}>
            ➤
          </button>
        </div>
      </div>
    );
  };
}

export default withStreamlitConnection(MultimodalChatInput);