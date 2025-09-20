// Minimal App component to test if the basic setup works

import React from 'react';

const AppMinimal = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'white', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#2563eb', fontSize: '2rem', marginBottom: '20px' }}>
        🎯 AI Classroom Tutor - Test Page
      </h1>
      
      <div style={{ 
        backgroundColor: '#f8fafc', 
        padding: '20px', 
        borderRadius: '8px',
        border: '1px solid #e2e8f0'
      }}>
        <h2 style={{ color: '#1e293b', marginBottom: '15px' }}>System Status</h2>
        <ul style={{ color: '#64748b', lineHeight: '1.6' }}>
          <li>✅ React is working</li>
          <li>✅ Basic styling is working</li>
          <li>✅ Component rendering is working</li>
        </ul>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3 style={{ color: '#1e293b', marginBottom: '10px' }}>Test Links:</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <a 
            href="/quiz?studentId=test" 
            style={{ 
              backgroundColor: '#2563eb', 
              color: 'white', 
              padding: '10px 15px', 
              borderRadius: '5px',
              textDecoration: 'none'
            }}
          >
            Test Quiz Page
          </a>
          <a 
            href="/teacher-dashboard" 
            style={{ 
              backgroundColor: '#059669', 
              color: 'white', 
              padding: '10px 15px', 
              borderRadius: '5px',
              textDecoration: 'none'
            }}
          >
            Teacher Dashboard
          </a>
          <a 
            href="/simple-test" 
            style={{ 
              backgroundColor: '#dc2626', 
              color: 'white', 
              padding: '10px 15px', 
              borderRadius: '5px',
              textDecoration: 'none'
            }}
          >
            Simple Test
          </a>
        </div>
      </div>

      <div style={{ 
        marginTop: '30px', 
        padding: '15px', 
        backgroundColor: '#fef3c7', 
        border: '1px solid #f59e0b',
        borderRadius: '5px'
      }}>
        <h4 style={{ color: '#92400e', marginBottom: '10px' }}>Debugging Info:</h4>
        <p style={{ color: '#92400e', margin: '5px 0' }}>
          <strong>Current URL:</strong> {window.location.href}
        </p>
        <p style={{ color: '#92400e', margin: '5px 0' }}>
          <strong>User Agent:</strong> {navigator.userAgent}
        </p>
        <p style={{ color: '#92400e', margin: '5px 0' }}>
          <strong>Timestamp:</strong> {new Date().toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default AppMinimal;
