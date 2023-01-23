export enum NavigationPath {
  Home = "",
  Admin = "admin",
  AdminRoom = "a/room",
  AdminBooking = "a/booking",
  AdminPerson = "a/person",
  AdminDiscount = "a/discount",
  AdminTypeRoom = "a/typeroom",
  Authorization = "auth",
  AuthorizationReg = "registration",
  AuthorizationLogin = "login",
  AuthorizationLogout = "logout",
}

export interface NavigationLink {
  route: NavigationPath;
  label: string;
}
