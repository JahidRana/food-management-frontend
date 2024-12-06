import { useContext } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const Profile = () => {
  const { user, updateMyProfile } = useContext(AuthContext);

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const newName = form.get("name");
    const newPhotoURL = form.get("image");

    const modal = document.getElementById("modal");
    modal.close();

    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update profile.",
    }).then((result) => {
      if (result.isConfirmed) {
        updateMyProfile({ displayName: newName, photoURL: newPhotoURL }).then(
          () => {
            Swal.fire({
              title: "Success!",
              text: "Profile update successfully",
              icon: "success",
              confirmButtonText: "Cool",
            }).then(() => {
              window.location.reload();
            });
          }
        );
      }
    });
  };

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Food Unity | Profile</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Navbar />
      <div className="md:flex justify-center gap-8 lg:gap-12 px-4 md:px-10 lg:px-20 py-20 lg:py-40">
        <img src={user.photoURL} className="w-44 md:w-60 rounded-2xl" />
        <div className="relative">
          <div className="space-y-2 lg:text-lg pt-10 md:pt-0 pb-20 md:pb-0">
            <p>
              <span className="text-blue1">User Name: </span>
              {user.displayName}
            </p>
            <p>
              <span className="text-blue1">User Email: </span>
              {user.email}
            </p>
            <p>
              <span className="text-blue1">Account Creation Time: </span>
              {user.metadata.creationTime}
            </p>
            <p>
              <span className="text-blue1">Last Sign In Time: </span>
              {user.metadata.lastSignInTime}
            </p>
          </div>
          <button
            onClick={() => document.getElementById("modal").showModal()}
            className="absolute bottom-0 btn normal-case text-lg font-medium border-2 border-blue1 hover:border-blue1 text-blue1 bg-transparent hover:bg-transparent px-10"
          >
            Update Profile
          </button>

          {/* update modal */}

          <dialog id="modal" className="modal modal-middle">
            <div className="modal-box">
              <div>
                {/* update form */}

                <form onSubmit={handleUpdateProfile} className="space-y-10">
                  {/* user name */}

                  <div className="border-b-2 border-dark2">
                    <p className="text-lg text-blue1">User Name</p>
                    <input
                      type="name"
                      name="name"
                      id="name"
                      defaultValue={user.displayName}
                      required
                      className="focus:outline-none bg-transparent w-full px-4 py-2"
                    />
                  </div>

                  {/* user photo url */}

                  <div className="border-b-2 border-dark2">
                    <p className="text-lg text-blue1">User Photo URL</p>
                    <input
                      type="text"
                      name="image"
                      id="image"
                      defaultValue={user.photoURL}
                      required
                      className="focus:outline-none bg-transparent w-full px-4 py-2"
                    />
                  </div>

                  {/* update button */}

                  <div className="absolute">
                    <input
                      type="submit"
                      value="Update"
                      className="btn normal-case text-lg font-medium border-2 border-blue1 hover:border-blue1 text-blue1 bg-transparent hover:bg-transparent px-10"
                    />
                  </div>
                </form>
              </div>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn normal-case text-lg font-medium border-2 border-blue1 hover:border-blue1 text-blue1 bg-transparent hover:bg-transparent px-10 mt-4">
                    Close
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
