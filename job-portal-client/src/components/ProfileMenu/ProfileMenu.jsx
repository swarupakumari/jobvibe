import React, { useEffect, useState } from 'react';
import { Avatar, Menu } from '@mantine/core';
import '@mantine/core/styles.css';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const ProfileMenu = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth0();
    const [profilePic, setProfilePic] = useState("");

    useEffect(() => {
        // Check if profile picture is cached in localStorage
        const cachedPic = localStorage.getItem("profilePic");
        if (cachedPic) {
            setProfilePic(cachedPic);
        } else if (user?.picture) {
            setProfilePic(user.picture);
            localStorage.setItem("profilePic", user.picture); // Cache it
        }
    }, [user]);

    return (
        <Menu>
            <Menu.Target>
                <Avatar src={profilePic} alt='user image' radius="xl" />
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item onClick={() => navigate("/my-job", { replace: true })}>
                    My Jobs
                </Menu.Item>
                <Menu.Item onClick={() => navigate("/post-job", { replace: true })}>
                    Post A Job
                </Menu.Item>
                <Menu.Item onClick={() => {
                    localStorage.clear(); // Clear cached data
                    logout({
                        returnTo: window.location.origin, // Redirects to homepage after logout
                    });
                }}>
                    Logout
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

export default ProfileMenu;
