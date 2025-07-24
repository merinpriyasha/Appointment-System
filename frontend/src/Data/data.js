export const userMenu = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Appointments",
    path: "/appointments",
  },
  {
    name: "About Us",
    path: "/about",
  },
  {
    name: "Contact Us",
    path: "/contact",
  }
];

// admin menu
export const adminMenu = [
  {
    name: "Home",
    path: "/",
  },

  {
    name: "Freelancers",
    path: "/admin/freelancers",
  },
  {
    name: "Users",
    path: "/admin/users",
  },
  {
    name: "About Us",
    path: "/about",
  },
  {
    name: "Contact Us",
    path: "/contact",
  },
];

export const freelancerMenu = (userId) => [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Appointments",
    path: "/freelancer-appointments",
  },
   {
    name: "Apply Freelancer",
    path: "/apply-freelancer",
  },
  {
    name: "Profile",
    path: `/freelancer/profile/${userId}`,
  },
];