import React, { useState } from 'react';
import { FaEnvelopeOpenText, FaRocket } from "react-icons/fa6";
import Swal from 'sweetalert2';

const Newsletter = () => {
  const [resumeUploaded, setResumeUploaded] = useState(false); // Track if resume is uploaded
  const [resumeFile, setResumeFile] = useState(null); // Store the uploaded resume file
  const [email, setEmail] = useState(""); // Store the email input

  // Function to handle email subscription
  const handleEmailSubmit = (e) => {
    e.preventDefault(); // Prevent the form from submitting

    // Simulate the email submission process (or you can integrate with an API)
    if (email) {
      // Show a success alert using SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Subscribed Successfully!',
        text: 'You have successfully subscribed! We will send you job updates.',
      });

      // Clear the email input after successful subscription
      setEmail("");
    } else {
      // Show an error if the email is empty
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Please enter a valid email address.',
      });
    }
  };

  // Function to handle resume upload
  const handleResumeUpload = () => {
    if (resumeUploaded) {
      // Show alert if resume is already uploaded
      Swal.fire({
        icon: 'info',
        title: 'Already Applied',
        text: 'You have already uploaded your resume!',
      });
    } else {
      // Show a SweetAlert pop-up asking the user to upload their resume
      Swal.fire({
        title: 'Upload Your Resume',
        text: 'Please upload your resume to get noticed faster.',
        input: 'file',
        inputAttributes: {
          accept: '.pdf', // Only allow PDF files
        },
        showCancelButton: true,
        confirmButtonText: 'Upload',
        cancelButtonText: 'Cancel',
        preConfirm: (file) => {
          if (!file) {
            Swal.showValidationMessage('Please select a file');
            return false;
          }
          return file;
        }
      }).then((result) => {
        if (result.isConfirmed && result.value) {
          // Check if the file is a PDF
          const file = result.value;
          if (file.type !== 'application/pdf') {
            Swal.fire({
              icon: 'error',
              title: 'Invalid File',
              text: 'Please upload a valid PDF file.',
            });
            return;
          }

          // Show a PDF preview after the file is uploaded
          const reader = new FileReader();
          reader.onload = (e) => {
            setResumeFile(e.target.result); // Store the PDF data URL
            setResumeUploaded(true); // Mark resume as uploaded
            Swal.fire({
              icon: 'success',
              title: 'Resume Uploaded',
              text: 'Your resume has been uploaded successfully!',
              html: `<p>Click below to view your resume:</p>
                     <embed src="${e.target.result}" width="100%" height="400px" type="application/pdf" />`,
              showCloseButton: true,
            });
          };
          reader.readAsDataURL(file); // Convert file to data URL for PDF preview
        }
      });
    }
  };

  return (
    <div>
      {/* Email Subscription Section */}
      <div>
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <FaEnvelopeOpenText />
          Email me for jobs
        </h3>
        <p className="text-primary/75 text-base mb-4">
          Stay updated with the latest job opportunities! Enter your email below to receive notifications about new openings and career tips.
        </p>

        {/* Email input */}
        <form onSubmit={handleEmailSubmit} className="w-full space-y-4">
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Handle email input change
            placeholder="name@mail.com"
            className="w-full block py-2 pl-3 border focus:outline-none"
            required
          />

          <input
            type="submit"
            value="Subscribe"
            className="w-full block py-2 pl-3 border focus:outline-none bg-blue rounded-sm text-white cursor-pointer font-semibold"
          />
        </form>
      </div>
      <br />
      <br />

      {/* Resume Upload Section */}
      <div className="mt-30">
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <FaRocket />
          Get Notice Faster
        </h3>
        <p className="text-primary/75 text-base mb-4">
          To increase your chances of getting noticed, upload your CV and let recruiters find your skills and experience. Click the button below to upload your resume and take the first step towards your next opportunity.
        </p>

        <div className="w-full space-y-4">
          <input
            type="button"
            value={"Upload your resume"}
            onClick={handleResumeUpload}
            className="w-full block py-2 pl-3 border focus:outline-none bg-blue rounded-sm text-white cursor-pointer font-semibold"
          />
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
