import React, { ReactNode } from "react";
import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection
} from "streamlit-component-lib";

interface FileInfo {
  name: string;
  type: string;
  content: string;
}

interface State {
  uploadedFiles: FileInfo[];
  textInput: string;
}

class MultimodalChatInput extends StreamlitComponentBase<State> {

  private disabledStyle = {
    opacity: 0.5,
    cursor: "not-allowed",
  };

  public state: State = {
    uploadedFiles: [],
    textInput: "",
  };

  handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ textInput: event.target.value });
  };

  handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.processFiles(event.target.files);
  };

  handleRemoveFile = (indexToRemove: number) => {
    this.setState(prevState => ({
      uploadedFiles: prevState.uploadedFiles.filter((_, index) => index !== indexToRemove)
    }));
  };

  handleSubmit = () => {
    Streamlit.setComponentValue({
      uploadedFiles: this.state.uploadedFiles,
      textInput: this.state.textInput
    });

    // Clear state after sending
    this.setState({
      uploadedFiles: [],
      textInput: ""
    });
  };

  handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const clipboardData = event.clipboardData;
    const items = clipboardData.items;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith("image")) {
        const blob = items[i].getAsFile();
        if (blob) {
          this.processFile(blob);
          event.preventDefault(); // Prevent the image from being pasted as text
        }
      }
    }
  };

  processFiles = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach(this.processFile);
  };

  processFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const fileInfo: FileInfo = {
        name: file.name,
        type: file.type,
        content: reader.result as string
      };
      this.setState(prevState => ({
        uploadedFiles: [...prevState.uploadedFiles, fileInfo]
      }));
    };
    reader.readAsDataURL(file);
  };

  public render = (): ReactNode => {
    const disabled = this.props.args["disabled"]
    const placeholder = this.props.args["placeholder"]
    const isDisabled = this.props.disabled || disabled;
    const width = this.props.width

    return (
      <div style={{ position: "relative", display: "flex", flexDirection: "column", border: "1px solid gray", borderRadius: "8px", padding: "8px", width: width }} >

        {/* Uploaded Files Staging */}
        <div style={{ marginBottom: "5px" }}>
          {this.state.uploadedFiles.map((file, index) => (
            <div key={index} aria-disabled={isDisabled} style={{ position: "relative", display: "inline-block", margin: "5px", transition: "0.3s", borderRadius: "5px", overflow: "hidden" }}>
              <div style={{ width: "50px", height: "50px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f0f0f0", color: "#333" }}>
                {file.type.startsWith("image") ? (
                  <img src={file.content} alt="Uploaded preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  file.name.split('.').pop()?.toUpperCase()
                )}
              </div>
              <button disabled={isDisabled} onClick={() => this.handleRemoveFile(index)} style={{ position: "absolute", top: 0, right: 0, background: "red", color: "white", borderRadius: "50%", width: "15px", height: "15px", fontSize: "10px", display: "flex", alignItems: "center", justifyContent: "center", ...(isDisabled ? this.disabledStyle : {}) }}>
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Chat Input Area */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* File Upload Button */}
          <label style={{ marginRight: "10px", ...(isDisabled ? this.disabledStyle : {}) }}>
            📎
            <input disabled={isDisabled} type="file" accept="image/*,.pdf,.docx,.xlsx" multiple onChange={this.handleFileChange} style={{ display: "none" }} />
          </label>

          {/* Textarea for Chat */}
          <textarea
            disabled={isDisabled}
            value={this.state.textInput}
            onChange={this.handleInputChange}
            onPaste={this.handlePaste}
            placeholder={placeholder}
            style={{ flexGrow: 1, padding: "8px", borderRadius: "8px", border: "1px solid gray", backgroundColor: "transparent", resize: "none", overflow: "auto", color: "white", ...(isDisabled ? this.disabledStyle : {}) }}
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                this.handleSubmit();
              }
            }}
          />

          {/* Send Button */}
          <button disabled={isDisabled} onClick={this.handleSubmit} style={{ marginLeft: "10px", padding: "5px 10px", borderRadius: "50%", backgroundColor: "#6200ea", color: "#ffffff", ...(isDisabled ? this.disabledStyle : {}) }}>
            ➤
          </button>
        </div>
      </div>
    );
  };
}

export default withStreamlitConnection(MultimodalChatInput);
