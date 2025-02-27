import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiCalendar, FiClock, FiDollarSign, FiMapPin } from "react-icons/fi";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";

const Card = ({ data }) => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0(); // Get user info
  const [isApplied, setIsApplied] = useState(false);

  const {
    _id,
    companyName,
    companyLogo,
    minPrice,
    maxPrice,
    jobLocation,
    postingDate,
    employmentType,
    description,
    jobTitle,
  } = data;

  console.log("Card Data:", data); // Debugging

  // Function to get applied jobs for the current user from localStorage
  const getAppliedJobsForUser = (userId) => {
    const allAppliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || {};
    return allAppliedJobs[userId] || [];
  };

  // Load applied state from localStorage for the specific user
  useEffect(() => {
    if (user) {
      const appliedJobs = getAppliedJobsForUser(user.sub); // Unique user ID
      setIsApplied(appliedJobs.includes(_id));
    }
  }, [_id, user]);

  const handleApply = () => {
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }

    if (!isApplied && user) {
      Swal.fire({
        icon: "success",
        title: "Application Submitted",
        text: `You have successfully applied for the position of ${jobTitle} at ${companyName}.`,
      });

      // Fetch applied jobs from localStorage
      const allAppliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || {};
      const userAppliedJobs = allAppliedJobs[user.sub] || [];

      userAppliedJobs.push(_id);
      allAppliedJobs[user.sub] = userAppliedJobs;

      localStorage.setItem("appliedJobs", JSON.stringify(allAppliedJobs));

      setIsApplied(true);
    }
  };

  return (
    <div>
      <section className="card">
        <Link to={`/`} className="flex gap-4 flex-col sm:flex-row items-start">
          <img src={companyLogo} alt={companyName} />
          <div>
            <h4 className="text-primary mb-1">{companyName}</h4>
            <h3 className="text-lg font-semibold mb-2">{jobTitle}</h3>
            <div className="text-primary/70 text-base flex flex-wrap gap-2 mb-2">
              <span className="flex items-center gap-2">
                <FiMapPin /> {jobLocation}
              </span>
              <span className="flex items-center gap-2">
                <FiClock /> {employmentType}
              </span>
              <span className="flex items-center gap-2">
                <FiDollarSign /> {minPrice}-{maxPrice}k
              </span>
              <span className="flex items-center gap-2">
                <FiCalendar /> {postingDate}
              </span>
            </div>
            <p className="text-base text-primary/70">{description}</p>
          </div>
        </Link>
        <div className="mt-4">
          <button
            className={`py-2 px-4 rounded font-semibold transition ${
              isApplied
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-blue text-white hover:bg-blue-600"
            }`}
            onClick={handleApply}
            disabled={isApplied}
          >
            {isApplied ? "Applied" : "Apply"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Card;
