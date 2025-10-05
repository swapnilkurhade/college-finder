import React, { useState, useRef } from 'react';
import { Upload, File, X } from 'lucide-react';
import './FileUpload.css';

const FileUpload = ({
  onFileSelect,
  onFileRemove,
  selectedFile,
  accept = "*/*",
  maxSize = 10,
  className = ""
}) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (file.size > maxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize}MB`);
      return;
    }
    onFileSelect(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const removeFile = () => {
    onFileRemove();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`file-upload-container ${className}`}>
      <label className="file-upload-label">
        Select File to Upload
      </label>
      
      <div
        className={`file-upload-area ${
          dragActive
            ? 'drag-active'
            : selectedFile
            ? 'file-selected'
            : ''
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          className="file-input"
          accept={accept}
        />
        
        {selectedFile ? (
          <div className="file-preview">
            <div className="file-icon">
              <File className="icon" />
            </div>
            <div className="file-info">
              <p className="file-name">{selectedFile.name}</p>
              <p className="file-size">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
              className="remove-file-button"
            >
              <X className="icon" />
              Remove File
            </button>
          </div>
        ) : (
          <div className="upload-placeholder">
            <div className="upload-icon">
              <Upload className="icon" />
            </div>
            <div className="upload-text">
              <p className="upload-title">
                Drop your file here, or click to browse
              </p>
              <p className="upload-subtitle">
                Supports all file types (max {maxSize}MB)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;