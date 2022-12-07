import "./Profile.scss";

import { SET_NAME, SET_USER } from "../../redux/features/auth/authSlice";
import { useEffect, useState } from "react";

import { BarLoader } from "react-spinners";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";
import { getUser } from "../../services/authService";
import { useDispatch } from "react-redux";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";

const color = "#ff4500";
const Loader = <BarLoader color={color} speedMultiplier={2} />;


const Profile = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // console.log("Getting use");
    setIsLoading(true);
    async function getUserData() {
      const data = await getUser();
      // console.log(data);

      setProfile(data);
      setIsLoading(false);
      dispatch(SET_USER(data));
      dispatch(SET_NAME(data.name));
    }
    getUserData();
  }, [dispatch]);

  return (
    <div className="profile --my2">
      {isLoading && <Loader />}
      <>
        {!isLoading && profile === null ? (
          <p>Something went wrong, please reload the page...</p>
        ) : (
          <Card cardClass={"card --flex-dir-column"}>
            <span className="profile-photo">
              <img src={profile?.photo} alt="User's profile images" />
            </span>
            <span className="profile-data">
              <p>
                <b>Name : </b> {profile?.name}
              </p>
              <p>
                <b>Email : </b> {profile?.email}
              </p>
              <p>
                <b>Phone : </b> {profile?.phone}
              </p>
              <p>
                <b>Bio : </b> {profile?.bio}
              </p>
              <div>
                <Link to="/edit-profile">
                  <button className="--btn --btn-primary">Edit Profile</button>
                </Link>
              </div>
            </span>
          </Card>
        )}
      </>
    </div>
  );
};

export default Profile;
