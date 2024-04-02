import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import { DEFAULT_SKILLS } from "../../utils/constant";
import { getAllJobs } from "../../apis/job";


export default function Home() {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [token] = useState(localStorage.getItem("token"));
    const [skills, setSkills] = useState([]);
    const [title, setTitle] = useState("");

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const fetchAllJobs = async (title, skills) => {
        const filterSkills = skills.join(",");
        const result = await getAllJobs({ title, skills: filterSkills });
        setJobs(result?.data);
    };

    useEffect(() => {
        fetchAllJobs(title, skills);
    }, [title, skills]);

    const handleSkill = (event) => {
        const newArr = skills.filter((skill) => skill === event.target.value);
        if (!newArr.length) {
            setSkills([...skills, event.target.value]);
        }
    };

    const removeSkill = (selectedSkill) => {
        const newArr = skills.filter((skill) => skill !== selectedSkill);
        setSkills([...newArr]);
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.filterContainer}>
                    {!!token ? <button className={styles.logout} onClick={logout}>Logout</button> : ""}
                    <input
                        className={styles.inputTop}
                        onChange={(event) => setTitle(event.target.value)}
                        type="text"
                        value={title}
                        name="search"
                        placeholder="Type any job title"
                    />
                    <select
                        onChange={handleSkill}
                        className={styles.inputSelect}
                        name="remote"
                    >
                        <option value="">Skills</option>
                        {DEFAULT_SKILLS.map((skill) => (
                            <option key={skill} value={skill}>
                                {skill}
                            </option>
                        ))}
                    </select>
                    {skills?.map((skill) => {
                        return (
                            <span className={styles.chip} key={skill}>
                                {skill}
                                <span
                                    onClick={() => removeSkill(skill)}
                                    className={styles.cross}
                                >
                                    X
                                </span>
                            </span>
                        );
                    })}
                    <button
                        onClick={() => {
                            setSkills([]);
                            setTitle("");
                        }}
                        className={styles.edit}
                    >
                        Clear
                    </button>

                    <button
                        onClick={() => navigate("/job-post")}
                        className={styles.edit}
                    >
                        Add Job
                    </button>
                </div>
            </div>

            <div className={styles.container1}>
                <div className={styles.jobContainer}>
                    {jobs?.map((data) => {
                        return (
                            <div key={data._id} className={styles.list}>
                                <div className={styles.listLeft}>
                                    <div>
                                        <img src={data.logoURL}  />
                                        <p className={styles.containerText}>
                                            {data?.companyName}
                                        </p>
                                    </div>
                                    <div className={styles.infoLeft}>
                                        <p className={styles.position}>
                                            {data.position}
                                        </p>
                                        <p className={styles.extraInfo}>
                                            <span className={styles.greyText}>
                                            Stipend : 
                                            </span>
                                            <span className={styles.greyText}>
                                                  {" "+data.salary}
                                            </span>
                                            <br/>
                                            <span className={styles.greyText}>
                                            Location : 
                                            </span>
                                            <span className={styles.greyText}>
                                                {" "+data.location}
                                            </span>
                                        </p>
                                        <p className={styles.extraInfo}>
                                            <span className={styles.redText}>
                                                {data.remote}
                                            </span>
                                            <span className={styles.redText}>
                                                {data.jobType}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.skill1}>
                                    {data?.skills?.map((skill) => {
                                        return (
                                            <span
                                                className={styles.skill}
                                                key={skill}
                                            >
                                                {skill}
                                            </span>
                                        );
                                    })}
                                </div>

                                <div className={styles.btnGroup}>
                                    <button
                                        className={styles.view}
                                        onClick={() =>
                                            navigate(`/job-details/${data._id}`)
                                        }
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

        </>
    );
}
