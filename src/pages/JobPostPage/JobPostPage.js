import React from "react";
import JobPost from "../../components/JobPost/JobPost";
import JobImage from "../../assets/images/job.png";

export default function JobPostPage() {
    return (
        <div style={{ display: "flex", maxHeight: "100vh", maxWidth: "100vw" }}>
            <JobPost />
            <div style={{ display: "flex", flexDirection: "column" }}>
                <img
                    style={{
                        position: "absolute",
                        maxHeight: "100vh",
                        width: "50vw",
                        zIndex: 0,
                    }}
                    src={JobImage}
                />
            </div>
        </div>
    );
}
