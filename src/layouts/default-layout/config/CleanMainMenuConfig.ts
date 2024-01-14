import type { MenuItem } from "@/layouts/default-layout/config/types";

const MainMenuConfig: Array<MenuItem> = [
  {
    pages: [
      {
        heading: "Dashboard",
        route: "/dashboard",
        keenthemesIcon: "home",
        bootstrapIcon: "bi-app-indicator",
      },
      {
        heading: "Attendance",
        route: "/attendance",
        keenthemesIcon: "fingerprint-scanning",
        bootstrapIcon: "bi-app-indicator",
      },
      {
        heading: "Time Off",
        route: "/time-off",
        keenthemesIcon: "calendar",
        bootstrapIcon: "bi-app-indicator",
      },
      {
        heading: "Reimbursement",
        route: "/reimbursement",
        keenthemesIcon: "cheque",
        bootstrapIcon: "bi-app-indicator",
      },
      {
        heading: "Overtime",
        route: "/over-time",
        keenthemesIcon: "timer",
        bootstrapIcon: "bi-app-indicator",
      },
      {
        heading: "Payslip",
        route: "/salary",
        keenthemesIcon: "wallet",
        bootstrapIcon: "bi-app-indicator",
      },
      {
        heading: "Profile",
        route: "/profile",
        keenthemesIcon: "user",
        bootstrapIcon: "bi-app-indicator",
      },
    ],
  },
];

export default MainMenuConfig;
