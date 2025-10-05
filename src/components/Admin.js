import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, File, X, CheckCircle, Settings, BarChart3, Users } from 'lucide-react';
import './Admin.css';
import axios from 'axios';

const Admin = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('idle'); // 'idle', 'uploading', 'success', 'error'
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setUploadStatus('idle');
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
    setSelectedFile(null);
    setUploadStatus('idle');
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!selectedFile) return;

  //   setUploadStatus('uploading');

  //   try {
  //     // Create FormData to send file
  //     const formData = new FormData();
  //     formData.append('file', selectedFile);

  //     // Simulate API call - replace with your actual endpoint
  //     await new Promise(resolve => setTimeout(resolve, 2000));

  //     // Here you would typically make an API call:
  //     // const response = await fetch('/api/upload', {
  //     //   method: 'POST',
  //     //   body: formData,
  //     // });

  //     setUploadStatus('success');
  //     setTimeout(() => {
  //       setSelectedFile(null);
  //       setUploadStatus('idle');
  //     }, 3000);

  //   } catch (error) {
  //     console.error('Upload failed:', error);
  //     setUploadStatus('error');
  //   }
  // };

  const handleSubmit = async (e) => {
    console.log('hello');
    e.preventDefault();
    if (!selectedFile) {
      // setMessage("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    // setLoading(true);
    // setMessage("");

    try {
      const url = "http://127.0.0.1:8000/process_pdf";

      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("📄 Processed PDF response:", response.data);

      // Example: if backend returns something like { rows_processed: 50 }
      // setMessage(`✅ Success! Rows processed: ${response.data.rows_processed}`);

      // Reset state after some delay
      setTimeout(() => {
        setSelectedFile(null);
      }, 3000);

    } catch (error) {
      console.error("❌ Upload failed:", error);
      // setMessage("Error uploading file.");
    } finally {
      // setLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="admin-header"
        >
          <div className="admin-icon">
            <Settings className="icon" />
          </div>
          <h1 className="admin-title">
            Admin <span className="gradient-text">Panel</span>
          </h1>
          <p className="admin-subtitle">
            Upload and manage files for your college recommendation system
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="admin-content"
        >
          <form onSubmit={handleSubmit} className="upload-form">
            {/* File Upload Area */}
            <div className="upload-section">
              <label className="upload-label">
                Select File to Upload
              </label>

              <div
                className={`upload-area ${dragActive
                    ? 'drag-active'
                    : selectedFile
                      ? 'file-selected'
                      : ''
                  }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="file-input"
                  accept="*/*"
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
                      onClick={removeFile}
                      className="remove-button"
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
                        Supports all file types (max 10MB)
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Upload Status */}
            {uploadStatus !== 'idle' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`status-message ${uploadStatus === 'success' ? 'success' :
                    uploadStatus === 'error' ? 'error' :
                      'uploading'
                  }`}
              >
                <div className="status-content">
                  {uploadStatus === 'success' && (
                    <>
                      <CheckCircle className="status-icon success" />
                      <p className="status-text">File uploaded successfully!</p>
                    </>
                  )}
                  {uploadStatus === 'error' && (
                    <>
                      <X className="status-icon error" />
                      <p className="status-text">Upload failed. Please try again.</p>
                    </>
                  )}
                  {uploadStatus === 'uploading' && (
                    <>
                      <div className="loading-spinner"></div>
                      <p className="status-text">Uploading file...</p>
                    </>
                  )}
                </div>
              </motion.div>
            )}

            {/* Submit Button */}
            <div className="submit-section">
              <button
                type="submit"
                disabled={!selectedFile || uploadStatus === 'uploading'}
                className={`submit-button ${!selectedFile || uploadStatus === 'uploading' ? 'disabled' : ''
                  }`}
              >
                {uploadStatus === 'uploading' ? 'Uploading...' : 'Upload File'}
              </button>
            </div>
          </form>

          {/* Additional Admin Features */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="admin-features"
          >
            <h2 className="features-title">Quick Actions</h2>
            <div className="features-grid">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="feature-card"
              >
                <div className="feature-icon">
                  <Settings className="icon" />
                </div>
                <h3 className="feature-title">Manage Colleges</h3>
                <p className="feature-description">Add, edit, or remove college data</p>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="feature-card"
              >
                <div className="feature-icon">
                  <BarChart3 className="icon" />
                </div>
                <h3 className="feature-title">View Analytics</h3>
                <p className="feature-description">Check recommendation performance</p>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="feature-card"
              >
                <div className="feature-icon">
                  <Users className="icon" />
                </div>
                <h3 className="feature-title">User Management</h3>
                <p className="feature-description">Manage user accounts and preferences</p>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;