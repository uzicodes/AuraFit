import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useRole from "../../hooks/useRole";

const AdmAddclassNamees = () => {
  const axiosSecure = useAxiosSecure();
  const [role] = useRole();
  // TODO: Add authentication later
  const user = null;
  // console.log(user);
  const handleAddClass = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.classname.value;
    const short_description = form.shortdescription.value;
    const description = form.description.value;
    const photo = form.image.files[0];
    const formData = new FormData();

    formData.append("image", photo);

    // upload pic to imgbb
    try {
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          process.env.NEXT_PUBLIC_IMGBB_API_KEY
        }`,
        formData
      );
      const picUrl = data.data.display_url;

      // created classInfo after image upload is complete
      const classInfo = {
        title,
        author_name: user.displayName,
        author_img: picUrl,
        short_description,
        description,
        role,
        upvotes: 0,
        downvotes: 0,
      };

      const response = await axiosSecure.post("/post", classInfo);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Class Added Sucessfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(response);
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(picLink);
  return (
    <>
      <h1 className="italic text-center text-3xl font-semibold mt-10">
        Add the Post here!
      </h1>
      <div className="max-w-4xl p-6  mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 ">
        <form onSubmit={handleAddClass}>
          <div className="grid grid-cols-1 gap-6 mt-4 ">
            {/*  */}
            <div className=" bg-white w-full  m-auto rounded-lg">
              <span className="">Author Image</span>
              <div className="file_upload px-5 py-3 relative border-4 border-dashed border-gray-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      hidden
                    />
                    <div className="bg-[#21BDCE] text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-[#14717C]">
                      Upload Image
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/*  */}
            <div>
              <label className="text-gray-700 dark:text-gray-200">
                Class Name
              </label>
              <input
                id="class name"
                name="classname"
                type="text"
                className="block focus:outline-[#21BDCE] w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
              />
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200">
                Short Description
              </label>
              <textarea
                id="password"
                name="shortdescription"
                type="password"
                className="block sm:h-52 md:h-20 w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200">
                Long Description
              </label>
              <textarea
                id="password"
                name="description"
                type="password"
                className="block sm:h-52 w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-[#21BDCE] hover:bg-[#14717C] rounded-md focus:outline-none focus:bg-gray-600">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdmAddclassNamees;
